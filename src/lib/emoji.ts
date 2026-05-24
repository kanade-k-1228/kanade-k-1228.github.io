import { get as lookupUnicodeEmoji } from "node-emoji";

const customSources = import.meta.glob<string>("/src/emoji/*.{png,svg,webp,jpg,jpeg,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const customEmoji = new Map<string, string>();
for (const [filePath, url] of Object.entries(customSources)) {
  const m = filePath.match(/\/([^/]+)\.[^.]+$/);
  if (m) customEmoji.set(m[1], url);
}

export type ResolvedIcon =
  | { type: "image"; src: string; alt: string }
  | { type: "unicode"; char: string; alt: string };

export const resolveIcon = (icon: string | undefined | null): ResolvedIcon | null => {
  if (!icon) return null;
  const name = icon.trim();
  if (!/^[\w+-]+$/.test(name)) return null;
  const custom = customEmoji.get(name);
  if (custom) return { type: "image", src: custom, alt: name };
  const char = lookupUnicodeEmoji(name);
  if (char) return { type: "unicode", char, alt: name };
  return null;
};
