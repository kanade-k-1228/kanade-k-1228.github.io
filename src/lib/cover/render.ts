import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { type CoverIcon, resolveCoverIcon } from "./icon";

export type CoverInputs = {
  title: string;
  abst?: string;
  date?: string | Date;
  category?: string;
  series?: string;
  icon?: string;
};

const BASE_COVER_PATH = resolve(process.cwd(), "public/cover.png");
let baseCoverCache: Buffer | null = null;
const loadBaseCover = async (): Promise<Buffer> => {
  if (!baseCoverCache) baseCoverCache = await readFile(BASE_COVER_PATH);
  return baseCoverCache;
};

export const renderCoverPng = async (input: CoverInputs): Promise<Buffer> => {
  const icon = await resolveCoverIcon(input.icon);
  const overlaySvg = renderCoverSvg(input, icon);
  const base = await loadBaseCover();
  return await sharp(base)
    .composite([{ input: Buffer.from(overlaySvg, "utf8"), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

export const renderCoverSvg = (input: CoverInputs, icon: CoverIcon | null = null): string => {
  const { title, abst, date, category, series } = input;

  const labelText = [category, series].filter(Boolean).join(" / ").toUpperCase();
  const hasIcon = icon !== null;
  // アイコンを右上に置く場合、タイトル領域は左寄せで幅を狭める
  const titleWidth = hasIcon ? CONTENT_W - ICON_SIZE - 24 : CONTENT_W;
  const titleSize = chooseTitleSize(title, titleWidth);
  const titleLineHeight = Math.round(titleSize * 1.3);
  const { lines: titleLines } = wrap(title, titleSize, titleWidth, 3);
  const { lines: abstLines } = abst ? wrap(abst, 28, CONTENT_W, 2) : { lines: [] as string[] };
  const dateText = formatDate(date);

  const labelY = CONTENT_TOP + 30;
  const titleTop = CONTENT_TOP + 70;
  const titleBlocks = titleLines
    .map((line, i) => {
      const y = titleTop + (i + 1) * titleLineHeight - Math.round(titleLineHeight * 0.25);
      return text(CONTENT_LEFT, y, titleSize, 800, "#701a75", line);
    })
    .join("\n  ");
  const abstTop = titleTop + titleLines.length * titleLineHeight + 24;
  const abstBlocks = abstLines
    .map((line, i) => {
      const y = abstTop + (i + 1) * 40;
      return text(CONTENT_LEFT, y, 28, 400, "#0f172a", line);
    })
    .join("\n  ");

  const dateBlock = dateText
    ? text(CONTENT_RIGHT, labelY, 24, 400, "#0f172a", dateText, 'text-anchor="end"')
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${labelText ? text(CONTENT_LEFT, labelY, 24, 700, "#0c4a6e", labelText, 'letter-spacing="2"') : ""}
  ${dateBlock}
  ${renderIcon(icon)}
  ${titleBlocks}
  ${abstBlocks}
</svg>`;
};

const ICON_SIZE = 96;

const renderIcon = (icon: CoverIcon | null): string => {
  if (!icon) return "";
  const x = CONTENT_RIGHT - ICON_SIZE;
  const y = CONTENT_TOP + 60;
  return `<image x="${x}" y="${y}" width="${ICON_SIZE}" height="${ICON_SIZE}" preserveAspectRatio="xMidYMid meet" href="data:${icon.mime};base64,${icon.base64}"/>`;
};

const W = 1200;
const H = 630;
// 中央の角丸パネル内側に収まるレイアウト矩形。
// 左辺 ~140 / 右辺 ~1080 / 上辺 ~30 / 下辺 ~580 のうち、
// 左下にアバター、右に IC チップがあるため安全領域を狭めに取る。
const CONTENT_LEFT = 180;
const CONTENT_RIGHT = 1050;
const CONTENT_TOP = 60;
const CONTENT_W = CONTENT_RIGHT - CONTENT_LEFT;
const FONT_STACK = "&quot;Noto Sans JP&quot;, &quot;Hiragino Sans&quot;, &quot;Yu Gothic&quot;, sans-serif";

const text = (x: number, y: number, size: number, weight: number, fill: string, content: string, extra = ""): string =>
  `<text x="${x}" y="${y}" font-family="${FONT_STACK}" font-size="${size}" font-weight="${weight}" fill="${fill}"${extra ? ` ${extra}` : ""}>${escapeXml(content)}</text>`;

const isWide = (ch: string): boolean => {
  const code = ch.codePointAt(0) ?? 0;
  return (
    (code >= 0x2e80 && code <= 0x9fff) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xff00 && code <= 0xffef) ||
    (code >= 0x1f300 && code <= 0x1faff) ||
    (code >= 0x30000 && code <= 0x3134f)
  );
};

const measure = (text: string, size: number): number => {
  let w = 0;
  for (const ch of text) w += isWide(ch) ? size : size * 0.55;
  return w;
};

type WrapResult = { lines: string[]; overflowed: boolean };

const wrap = (text: string, size: number, maxWidth: number, maxLines: number): WrapResult => {
  const chars = Array.from(text);
  const lines: string[] = [];
  let cur = "";
  let i = 0;
  while (i < chars.length) {
    const ch = chars[i];
    if (measure(cur + ch, size) > maxWidth) {
      if (cur === "") {
        lines.push(ch);
        i++;
      } else {
        lines.push(cur);
        cur = "";
      }
      if (lines.length >= maxLines) break;
    } else {
      cur += ch;
      i++;
    }
  }
  if (cur && lines.length < maxLines) {
    lines.push(cur);
    cur = "";
  }
  const overflowed = i < chars.length || cur.length > 0;
  if (overflowed && lines.length > 0) {
    let last = lines[lines.length - 1];
    while (last.length > 0 && measure(`${last}…`, size) > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = `${last}…`;
  }
  return { lines, overflowed };
};

const chooseTitleSize = (title: string, maxWidth: number = CONTENT_W, maxLines = 3): number => {
  for (const size of [88, 76, 64, 54, 46]) {
    const { overflowed } = wrap(title, size, maxWidth, maxLines);
    if (!overflowed) return size;
  }
  return 46;
};

const escapeXml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const formatDate = (d?: string | Date): string => {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
