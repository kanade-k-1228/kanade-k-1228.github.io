import { AUTHOR, SITE_TITLE } from "../../consts";

export type CoverInputs = {
  title: string;
  abst?: string;
  date?: string | Date;
  category?: string;
  series?: string;
};

const W = 1200;
const H = 630;
const PAD_X = 80;
const CONTENT_W = W - PAD_X * 2;
const FONT_STACK = "&quot;Noto Sans JP&quot;, &quot;Hiragino Sans&quot;, &quot;Yu Gothic&quot;, sans-serif";

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

const chooseTitleSize = (title: string, maxLines = 3): number => {
  for (const size of [96, 80, 68, 58, 50]) {
    const { overflowed } = wrap(title, size, CONTENT_W, maxLines);
    if (!overflowed) return size;
  }
  return 50;
};

const escapeXml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatDate = (d?: string | Date): string => {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const text = (
  x: number,
  y: number,
  size: number,
  weight: number,
  fill: string,
  content: string,
  extra = "",
): string =>
  `<text x="${x}" y="${y}" font-family="${FONT_STACK}" font-size="${size}" font-weight="${weight}" fill="${fill}"${extra ? ` ${extra}` : ""}>${escapeXml(content)}</text>`;

export const renderCoverSvg = (input: CoverInputs): string => {
  const { title, abst, date, category, series } = input;

  const labelText = [category, series].filter(Boolean).join(" / ").toUpperCase();
  const titleSize = chooseTitleSize(title);
  const titleLineHeight = Math.round(titleSize * 1.3);
  const { lines: titleLines } = wrap(title, titleSize, CONTENT_W, 3);
  const { lines: abstLines } = abst ? wrap(abst, 30, CONTENT_W, 2) : { lines: [] as string[] };
  const dateText = formatDate(date);

  const labelY = 110;
  const titleTop = 170;
  const titleBlocks = titleLines
    .map((line, i) => {
      const y = titleTop + (i + 1) * titleLineHeight - Math.round(titleLineHeight * 0.25);
      return text(PAD_X, y, titleSize, 800, "#701a75", line);
    })
    .join("\n  ");
  const abstTop = titleTop + titleLines.length * titleLineHeight + 28;
  const abstBlocks = abstLines
    .map((line, i) => {
      const y = abstTop + (i + 1) * 42;
      return text(PAD_X, y, 30, 400, "#334155", line);
    })
    .join("\n  ");

  const dividerY = H - 96;
  const metaY = H - 52;
  const siteText = text(PAD_X, metaY, 28, 700, "#0f172a", SITE_TITLE);
  const authorX = PAD_X + Math.round(measure(SITE_TITLE, 28)) + 28;
  const authorText = text(authorX, metaY, 24, 400, "#475569", `@${AUTHOR}`);
  const dateBlock = dateText
    ? text(W - PAD_X, metaY, 24, 400, "#475569", dateText, 'text-anchor="end"')
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0f9ff"/>
      <stop offset="1" stop-color="#fdf2f8"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="10" fill="#7c3aed"/>
  ${labelText ? text(PAD_X, labelY, 26, 700, "#0c4a6e", labelText, 'letter-spacing="3"') : ""}
  ${titleBlocks}
  ${abstBlocks}
  <line x1="${PAD_X}" y1="${dividerY}" x2="${W - PAD_X}" y2="${dividerY}" stroke="#cbd5e1" stroke-width="2"/>
  ${siteText}
  ${authorText}
  ${dateBlock}
</svg>`;
};
