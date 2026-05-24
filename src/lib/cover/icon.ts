import { promises as fs } from "node:fs";
import { dirname, resolve } from "node:path";
import { get as lookupUnicodeEmoji } from "node-emoji";

export type CoverIcon = { mime: string; base64: string };

const EMOJI_DIR = resolve("src", "emoji");
const TWEMOJI_CACHE_DIR = resolve(".cache", "twemoji");
const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg";
const FETCH_TIMEOUT_MS = 10_000;

const EXTENSIONS = ["svg", "png", "webp", "jpg", "jpeg", "gif"] as const;
const MIME_OF: Record<(typeof EXTENSIONS)[number], string> = {
  svg: "image/svg+xml",
  png: "image/png",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
};

export const resolveCoverIcon = async (icon: string | undefined | null): Promise<CoverIcon | null> => {
  if (!icon) return null;
  const name = icon.trim();
  if (!/^[\w+-]+$/.test(name)) return null;

  for (const ext of EXTENSIONS) {
    try {
      const data = await fs.readFile(resolve(EMOJI_DIR, `${name}.${ext}`));
      return { mime: MIME_OF[ext], base64: data.toString("base64") };
    } catch {}
  }

  const char = lookupUnicodeEmoji(name);
  if (!char) return null;
  return await loadTwemoji(char);
};

const loadTwemoji = async (char: string): Promise<CoverIcon | null> => {
  const cp = toTwemojiCodepoint(char);
  const cacheFile = resolve(TWEMOJI_CACHE_DIR, `${cp}.svg`);

  try {
    const data = await fs.readFile(cacheFile);
    return { mime: "image/svg+xml", base64: data.toString("base64") };
  } catch {}

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(`${TWEMOJI_BASE}/${cp}.svg`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const svg = await res.text();
    await fs.mkdir(dirname(cacheFile), { recursive: true });
    await fs.writeFile(cacheFile, svg);
    return { mime: "image/svg+xml", base64: Buffer.from(svg, "utf8").toString("base64") };
  } catch {
    return null;
  }
};

const toTwemojiCodepoint = (s: string): string => {
  const parts: string[] = [];
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined) parts.push(cp.toString(16));
  }
  // Twemoji strips the U+FE0F emoji-presentation variation selector from filenames.
  return parts.filter((p) => p !== "fe0f").join("-");
};
