// colocate された SVG をインライン化する。Astro の `astro:assets` pipeline は
// 一部の SVG (draw.io export 等) で `NoImageMetadata` で失敗するため、これを回避する。
// Astro 組み込みの `remark-collect-images` より前に走らせる必要がある。
import { promises as fs } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Html, Image, Root } from "mdast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export const remarkInlineSvg = () => {
  return async (tree: Root, file: VFile): Promise<void> => {
    if (typeof file.path !== "string") return;
    const articleDir = dirname(file.path);

    const targets: Array<{
      node: Image;
      parent: { children: unknown[] };
      index: number;
    }> = [];

    visit(tree, "image", (node, index, parent) => {
      if (typeof index !== "number" || !parent) return;
      const url = node.url;
      if (typeof url !== "string") return;
      if (!url.toLowerCase().endsWith(".svg")) return;
      if (URL.canParse(url) || url.startsWith("/") || url.startsWith("data:")) return;
      targets.push({ node, parent: parent as { children: unknown[] }, index });
    });

    const replacements: Replacement[] = [];
    await Promise.all(
      targets.map(async ({ node, parent, index }) => {
        const svgAbs = resolve(articleDir, node.url);
        let raw: string;
        try {
          raw = await fs.readFile(svgAbs, "utf8");
        } catch {
          return;
        }
        if (raw.length === 0) return;
        const html: Html = {
          type: "html",
          value: wrapSvg(raw, typeof node.alt === "string" ? node.alt : ""),
        };
        replacements.push({ parent, index, html });
      }),
    );

    // 高 index から置換することで低 index 側のずれを防ぐ。
    for (const { parent, index, html } of replacements.sort((a, b) => b.index - a.index)) {
      parent.children[index] = html;
    }
  };
};

interface Replacement {
  parent: { children: unknown[] };
  index: number;
  html: Html;
}

const wrapSvg = (svg: string, alt: string): string => {
  let body = svg.replace(/^﻿/, "").replace(/^\s*<\?xml[^?]*\?>\s*/, "");
  if (alt) {
    body = body.replace(/<svg\b([^>]*?)>/, (m, attrs) =>
      /role=/.test(attrs) ? m : `<svg${attrs} role="img" aria-label="${escapeAttr(alt)}">`,
    );
  }
  return `<figure class="inline-svg">${body}</figure>`;
};

const escapeAttr = (s: string): string => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
