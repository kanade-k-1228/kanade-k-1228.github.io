// 画像ファイルから EXIF / IPTC / XMP / ICC を剥がす。
// JPEG / PNG はバイト列レベルで segment を抜くだけなので画質劣化ゼロ。
// EXIF Orientation>1 はピクセルが回転して見え得るため `--rotate-non-upright`
// 指定時のみ sharp で再エンコード (画質劣化あり) する。
// 詳細は --help および stripJpeg / stripPng のコメントを参照。
import { promises as fs } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { globby } from "globby";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_PATTERNS = ["article/**/*.{jpg,jpeg,png,webp,tif,tiff}"];

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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

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
      "Usage: pnpm image [--write] [--keep-icc] [--rotate-non-upright] [paths...]",
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
  // EXIF GPS IFD pointer tag 0x8825 を BE/LE 両方のバイト並びで探す。
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

interface StripResult {
  bytesBefore: number;
  bytesAfter: number;
  rotated: boolean;
}

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
  // .rotate() で EXIF orientation をピクセルに焼き込む。
  let pipeline = sharp(orig).rotate();
  if (ext === ".jpg" || ext === ".jpeg") pipeline = pipeline.jpeg({ quality: 95, mozjpeg: true });
  else if (ext === ".png") pipeline = pipeline.png({ compressionLevel: 9 });
  else if (ext === ".webp") pipeline = pipeline.webp({ quality: 95 });
  else if (ext === ".tif" || ext === ".tiff") pipeline = pipeline.tiff();
  if (keepIcc) pipeline = pipeline.keepIccProfile();
  const out = await pipeline.toBuffer();
  await writeAtomic(absPath, out);
  return { bytesBefore: orig.length, bytesAfter: out.length, rotated: true };
};

const writeAtomic = async (absPath: string, data: Buffer): Promise<void> => {
  const tmp = `${absPath}.tmp-strip-${process.pid}`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, absPath);
};

// JPEG segment を歩いてメタデータ系 marker を落とす。pixel data (SOS〜EOI) は
// そのまま copy するので decode / re-encode なし、画質劣化なし。
// 削除: APP1 (EXIF/XMP), APP2 (ICC, default), APP13 (IPTC), COM。
// 保持: SOI, APP0 (JFIF), APP14 (Adobe), DQT, DHT, SOFx, DRI, SOS, EOI。
const stripJpeg = (buf: Buffer, keepIcc: boolean): Buffer => {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) {
    throw new Error("not a JPEG (missing SOI)");
  }
  const out: Buffer[] = [buf.subarray(0, 2)];
  let i = 2;
  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) throw new Error(`expected marker at offset ${i}, got 0x${buf[i].toString(16)}`);
    while (i < buf.length && buf[i] === 0xff) i++;
    if (i >= buf.length) break;
    const marker = buf[i];
    i++;
    // SOS: 残りはエントロピー符号化データ + EOI なのでそのまま copy。
    if (marker === 0xda) {
      out.push(Buffer.from([0xff, 0xda]));
      out.push(buf.subarray(i));
      return Buffer.concat(out);
    }
    // payload を持たない marker (EOI, SOI, RST0..7, TEM)。
    if (marker === 0xd9 || marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      out.push(Buffer.from([0xff, marker]));
      if (marker === 0xd9) return Buffer.concat(out);
      continue;
    }
    // 通常 segment: 長さは 2 バイト BE で、length バイト自身を含む。
    if (i + 2 > buf.length) throw new Error("truncated segment length");
    const segLen = buf.readUInt16BE(i);
    const payloadEnd = i + segLen;
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
  if (marker === 0xe1) return true;
  if (marker === 0xe2) return !keepIcc;
  if (marker === 0xed) return true;
  if (marker === 0xfe) return true;
  return false;
};

// PNG chunk を歩いてメタデータ系 chunk を落とす。IDAT (pixel data) はそのまま
// copy するので decode / re-encode なし、画質劣化なし。
// 削除: tEXt, iTXt, zTXt, eXIf, tIME, iCCP (default)。
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const stripPng = (buf: Buffer, keepIcc: boolean): Buffer => {
  if (buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("not a PNG (bad signature)");
  }
  const out: Buffer[] = [buf.subarray(0, 8)];
  let i = 8;
  while (i + 12 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.subarray(i + 4, i + 8).toString("ascii");
    // chunk = 4 len + 4 type + len data + 4 crc。
    const chunkEnd = i + 12 + len;
    if (chunkEnd > buf.length) throw new Error(`truncated chunk ${type}`);
    if (!shouldDropPngChunk(type, keepIcc)) {
      out.push(buf.subarray(i, chunkEnd));
    }
    i = chunkEnd;
    if (type === "IEND") {
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

const formatDelta = (bytes: number): string => {
  const sign = bytes >= 0 ? "-" : "+";
  const abs = Math.abs(bytes);
  if (abs < 1024) return `${sign}${abs} B`;
  if (abs < 1024 * 1024) return `${sign}${(abs / 1024).toFixed(1)} KB`;
  return `${sign}${(abs / 1024 / 1024).toFixed(2)} MB`;
};
