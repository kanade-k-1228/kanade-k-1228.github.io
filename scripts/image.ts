/**
 * 画像ファイルから EXIF / IPTC / XMP / ICC などの全メタデータを剥がす。
 * 位置情報(GPS)を含む撮影地点や撮影時刻、機種情報などが消える。
 *
 * 既定では **バイト列レベルで segment を抜くだけ** なので画質は完全に保たれる
 * (JPEG / PNG)。EXIF Orientation が 1 以外の画像はピクセルが回転して見え得る
 * ため skip(`--rotate-non-upright` で sharp 経由の再エンコード+回転焼き込み)。
 *
 * 使い方:
 *   pnpm strip-image-metadata                            # dry-run プレビュー
 *   pnpm strip-image-metadata --write                    # 実書き込み(ロスレス)
 *   pnpm strip-image-metadata --write --rotate-non-upright
 *   pnpm strip-image-metadata --write src/content/blog/2023-05-03-ontake/img/*.JPG
 *
 *   --write                 実書き込み(指定しないとプレビューのみ)
 *   --keep-icc              カラープロファイルを残す
 *   --rotate-non-upright    Orientation>1 の画像を sharp で再エンコードして剥がす
 *                           (該当画像のみ画質劣化; quality=95)
 *   --help
 *
 * 仕様:
 *  - JPEG: APP1(EXIF/XMP), APP2(ICC, デフォルト strip), APP13(IPTC), COM を削除。
 *          圧縮データは触らないので画質劣化ゼロ。
 *  - PNG : tEXt/iTXt/zTXt/eXIf/tIME チャンクを削除。iCCP は `--keep-icc` で残せる。
 *          IDAT は触らないので画質劣化ゼロ。
 *  - WebP/TIFF: ロスレスの実装は未対応 → skip + 警告(ファイル数次第で将来対応)。
 *  - 既にメタデータを持たない画像は no-op で skip(冪等)。
 *  - 一時ファイル経由のアトミック上書き(失敗時に元ファイルが壊れない)。
 */
import { promises as fs } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const DEFAULT_PATTERNS = ["article/**/*.{jpg,jpeg,png,webp,tif,tiff}"];

interface CliArgs {
  write: boolean;
  keepIcc: boolean;
  rotateNonUpright: boolean;
  patterns: string[];
}

const parseArgs = (argv: string[]): CliArgs => {
  const out: CliArgs = { write: false, keepIcc: false, rotateNonUpright: false, patterns: [] };
  for (const a of argv) {
    if (a === "--write") out.write = true;
    else if (a === "--keep-icc") out.keepIcc = true;
    else if (a === "--rotate-non-upright") out.rotateNonUpright = true;
    else if (a === "--help" || a === "-h") {
      printHelp();
      process.exit(0);
    } else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      process.exit(1);
    } else {
      out.patterns.push(a);
    }
  }
  return out;
};

const printHelp = (): void => {
  console.log(
    [
      "Usage: pnpm strip-image-metadata [--write] [--keep-icc] [--rotate-non-upright] [paths...]",
      "",
      "  --write                 Actually overwrite files (default: dry-run preview).",
      "  --keep-icc              Preserve ICC color profiles (default: strip).",
      "  --rotate-non-upright    Re-encode (lossy) images with EXIF Orientation>1 so they",
      "                          stay right-side up after stripping. Default skips them.",
      "",
      "Default scope when no paths given:",
      ...DEFAULT_PATTERNS.map((p) => `  ${p}`),
    ].join("\n"),
  );
};

/* ------------------------------------------------------- inspection helpers */

interface MetaSummary {
  exif: boolean;
  iptc: boolean;
  xmp: boolean;
  icc: boolean;
  gps: boolean;
  orientation: number;
}

const summarise = (meta: sharp.Metadata): MetaSummary => {
  const exifBuf = meta.exif instanceof Buffer ? meta.exif : undefined;
  const iptcBuf = meta.iptc instanceof Buffer ? meta.iptc : undefined;
  const xmpBuf = meta.xmp instanceof Buffer ? meta.xmp : undefined;
  const iccBuf = meta.icc instanceof Buffer ? meta.icc : undefined;
  // EXIF GPS IFD pointer tag is 0x8825 — appears as bytes [0x88,0x25] (BE TIFF)
  // or [0x25,0x88] (LE TIFF) inside the EXIF block.
  const hasGps =
    exifBuf !== undefined &&
    (exifBuf.indexOf(Buffer.from([0x88, 0x25])) !== -1 || exifBuf.indexOf(Buffer.from([0x25, 0x88])) !== -1);
  return {
    exif: exifBuf !== undefined && exifBuf.length > 0,
    iptc: iptcBuf !== undefined && iptcBuf.length > 0,
    xmp: xmpBuf !== undefined && xmpBuf.length > 0,
    icc: iccBuf !== undefined && iccBuf.length > 0,
    gps: hasGps,
    orientation: meta.orientation ?? 0,
  };
};

const summaryLabel = (s: MetaSummary): string => {
  const tags: string[] = [];
  if (s.gps) tags.push("GPS");
  if (s.exif) tags.push("EXIF");
  if (s.iptc) tags.push("IPTC");
  if (s.xmp) tags.push("XMP");
  if (s.icc) tags.push("ICC");
  return tags.length > 0 ? tags.join("+") : "(none)";
};

/* ----------------------------------------------------------- JPEG stripping */

/**
 * Walk JPEG segments and drop metadata-bearing markers. Pixel data (between
 * SOS and EOI) is copied verbatim — no decode, no re-encode, no quality loss.
 *
 * Strips: APP1 (EXIF/XMP), APP2 (ICC by default), APP13 (IPTC/Photoshop),
 *         COM (comments).
 * Keeps : SOI, APP0 (JFIF), APP14 (Adobe color), DQT, DHT, SOFx, DRI, SOS, EOI.
 */
const stripJpeg = (buf: Buffer, keepIcc: boolean): Buffer => {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error("not a JPEG (missing SOI)");
  }
  const out: Buffer[] = [buf.subarray(0, 2)]; // SOI
  let i = 2;
  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) throw new Error(`expected marker at offset ${i}, got 0x${buf[i].toString(16)}`);
    // Skip any FF padding.
    while (i < buf.length && buf[i] === 0xff) i++;
    if (i >= buf.length) break;
    const marker = buf[i];
    i++;
    // Start of Scan: copy the rest of the file verbatim (entropy-coded data + EOI).
    if (marker === 0xda) {
      out.push(Buffer.from([0xff, 0xda]));
      out.push(buf.subarray(i));
      return Buffer.concat(out);
    }
    // End of Image (EOI), or markers without payload (SOI, RST0..7, TEM).
    if (marker === 0xd9 || marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      out.push(Buffer.from([0xff, marker]));
      if (marker === 0xd9) return Buffer.concat(out);
      continue;
    }
    // Standard segment: 2-byte big-endian length (INCLUDES the length bytes).
    if (i + 2 > buf.length) throw new Error("truncated segment length");
    const segLen = buf.readUInt16BE(i);
    const payloadEnd = i + segLen; // includes length bytes but not marker
    if (payloadEnd > buf.length) throw new Error("truncated segment payload");
    const drop = shouldDropJpegMarker(marker, keepIcc);
    if (!drop) {
      out.push(Buffer.from([0xff, marker]));
      out.push(buf.subarray(i, payloadEnd));
    }
    i = payloadEnd;
  }
  return Buffer.concat(out);
};

const shouldDropJpegMarker = (marker: number, keepIcc: boolean): boolean => {
  if (marker === 0xe1) return true; // APP1: EXIF + XMP
  if (marker === 0xe2) return !keepIcc; // APP2: ICC, FlashPix
  if (marker === 0xed) return true; // APP13: IPTC / Photoshop
  if (marker === 0xfe) return true; // COM
  return false;
};

/* ------------------------------------------------------------ PNG stripping */

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/**
 * Walk PNG chunks and drop metadata-bearing chunks. IDAT (pixel data) is
 * copied verbatim — no decode, no re-encode, no quality loss.
 *
 * Strips: tEXt, iTXt, zTXt (textual), eXIf, tIME, iCCP (by default).
 * Keeps : IHDR, IDAT, IEND, PLTE, IDAT, tRNS, bKGD, pHYs, sBIT, sRGB, gAMA, cHRM.
 */
const stripPng = (buf: Buffer, keepIcc: boolean): Buffer => {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("not a PNG (bad signature)");
  }
  const out: Buffer[] = [buf.subarray(0, 8)];
  let i = 8;
  while (i + 12 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.subarray(i + 4, i + 8).toString("ascii");
    const chunkEnd = i + 12 + len; // 4 len + 4 type + len data + 4 crc
    if (chunkEnd > buf.length) throw new Error(`truncated chunk ${type}`);
    if (!shouldDropPngChunk(type, keepIcc)) {
      out.push(buf.subarray(i, chunkEnd));
    }
    i = chunkEnd;
    if (type === "IEND") {
      // copy any trailing bytes (uncommon but possible)
      if (i < buf.length) out.push(buf.subarray(i));
      break;
    }
  }
  return Buffer.concat(out);
};

const shouldDropPngChunk = (type: string, keepIcc: boolean): boolean => {
  if (type === "tEXt" || type === "iTXt" || type === "zTXt") return true;
  if (type === "eXIf") return true;
  if (type === "tIME") return true;
  if (type === "iCCP") return !keepIcc;
  return false;
};

/* -------------------------------------------------------- write/dispatchers */

interface StripResult {
  bytesBefore: number;
  bytesAfter: number;
  rotated: boolean;
}

const writeAtomic = async (absPath: string, data: Buffer): Promise<void> => {
  const tmp = `${absPath}.tmp-strip-${process.pid}`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, absPath);
};

const stripLossless = async (absPath: string, ext: string, keepIcc: boolean): Promise<StripResult> => {
  const orig = await fs.readFile(absPath);
  const stripped =
    ext === ".jpg" || ext === ".jpeg" ? stripJpeg(orig, keepIcc) : ext === ".png" ? stripPng(orig, keepIcc) : null;
  if (stripped === null) throw new Error(`lossless not supported for ${ext}`);
  await writeAtomic(absPath, stripped);
  return { bytesBefore: orig.length, bytesAfter: stripped.length, rotated: false };
};

const stripWithRotate = async (absPath: string, ext: string, keepIcc: boolean): Promise<StripResult> => {
  const orig = await fs.readFile(absPath);
  let pipeline = sharp(orig).rotate(); // bake EXIF orientation into pixels
  if (ext === ".jpg" || ext === ".jpeg") pipeline = pipeline.jpeg({ quality: 95, mozjpeg: true });
  else if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 95 });
  else if (ext === ".tif" || ext === ".tiff") pipeline = pipeline.tiff();
  if (keepIcc) pipeline = pipeline.keepIccProfile();
  const out = await pipeline.toBuffer();
  await writeAtomic(absPath, out);
  return { bytesBefore: orig.length, bytesAfter: out.length, rotated: true };
};

/* --------------------------------------------------------------- entrypoint */

const main = async (): Promise<void> => {
  const args = parseArgs(process.argv.slice(2));
  const patterns = args.patterns.length > 0 ? args.patterns : DEFAULT_PATTERNS;
  const files = await globby(patterns, { cwd: ROOT, caseSensitiveMatch: false });

  if (files.length === 0) {
    console.log("No matching image files found.");
    return;
  }

  let stripped = 0;
  let skippedClean = 0;
  let skippedRotation = 0;
  let skippedFormat = 0;
  const failures: string[] = [];
  let totalSavedBytes = 0;

  for (const rel of files) {
    const abs = join(ROOT, rel);
    const ext = extname(rel).toLowerCase();
    try {
      const meta = await sharp(abs).metadata();
      const sum = summarise(meta);
      const interesting = sum.exif || sum.iptc || sum.xmp || (!args.keepIcc && sum.icc);
      if (!interesting) {
        skippedClean++;
        continue;
      }
      const label = summaryLabel(sum);
      const lossyOnly = ext === ".webp" || ext === ".tif" || ext === ".tiff";
      const needsRotation = sum.orientation > 1;

      if (lossyOnly) {
        if (!args.rotateNonUpright) {
          skippedFormat++;
          console.log(
            `[skip ${ext.slice(1).toUpperCase()}] ${rel}  metadata=${label}  (use --rotate-non-upright to re-encode)`,
          );
          continue;
        }
      }

      if (needsRotation && !args.rotateNonUpright) {
        skippedRotation++;
        console.log(
          `[skip rotation] ${rel}  metadata=${label}  orientation=${sum.orientation}  (use --rotate-non-upright)`,
        );
        continue;
      }

      if (!args.write) {
        const mode = needsRotation || lossyOnly ? "reencode" : "lossless";
        console.log(`[dry-run ${mode}] ${rel}  metadata=${label}`);
        stripped++;
        continue;
      }

      const result =
        needsRotation || lossyOnly
          ? await stripWithRotate(abs, ext, args.keepIcc)
          : await stripLossless(abs, ext, args.keepIcc);
      totalSavedBytes += result.bytesBefore - result.bytesAfter;
      const tag = result.rotated ? "reencode" : "lossless";
      console.log(
        `[${tag}] ${rel}  removed=${label}  size=${result.bytesBefore}→${result.bytesAfter} (${formatDelta(result.bytesBefore - result.bytesAfter)})`,
      );
      stripped++;
    } catch (e: unknown) {
      failures.push(`${rel}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log("");
  console.log(`${args.write ? "Stripped" : "Would strip"}: ${stripped}`);
  console.log(`Skipped (already clean): ${skippedClean}`);
  if (skippedRotation > 0) {
    console.log(`Skipped (orientation>1, would rotate visually): ${skippedRotation}`);
  }
  if (skippedFormat > 0) {
    console.log(`Skipped (WebP/TIFF lossless not implemented): ${skippedFormat}`);
  }
  if (failures.length > 0) {
    console.log(`Failures: ${failures.length}`);
    for (const f of failures) console.error(`  ${f}`);
  }
  if (args.write && stripped > 0) {
    console.log(`Total size delta: ${formatDelta(totalSavedBytes)}`);
  }
  if (!args.write && stripped > 0) {
    console.log("");
    console.log("Re-run with --write to actually overwrite files.");
  }
};

const formatDelta = (bytes: number): string => {
  const sign = bytes >= 0 ? "-" : "+";
  const abs = Math.abs(bytes);
  if (abs < 1024) return `${sign}${abs} B`;
  if (abs < 1024 * 1024) return `${sign}${(abs / 1024).toFixed(1)} KB`;
  return `${sign}${(abs / 1024 / 1024).toFixed(2)} MB`;
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
