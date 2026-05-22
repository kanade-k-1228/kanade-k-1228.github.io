/**
 * Remark plugin: inline local SVG images into the HTML output.
 *
 * Markdown `![alt](./img/foo.svg)` referring to a colocated SVG file is
 * replaced with an HTML node containing the raw SVG source. This sidesteps
 * Astro's `astro:assets` pipeline, which can fail on third-party SVGs
 * (notably draw.io exports) with `NoImageMetadata`, while keeping the
 * editorial convenience of colocating assets with the article.
 *
 * Runs as a remark plugin BEFORE Astro's `remark-collect-images` so that
 * collected `localImagePaths` no longer references the inlined SVG.
 */
import { promises as fs } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Html, Image, Root } from "mdast";
import type { VFile } from "vfile";
import { visit } from "unist-util-visit";

interface Replacement {
  parent: { children: unknown[] };
  index: number;
  html: Html;
}

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
      // skip remote / public-absolute / data URIs
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
          return; // missing files are handled by migrate-time broken-image comments
        }
        if (raw.length === 0) return;
        const html: Html = {
          type: "html",
          value: wrapSvg(raw, typeof node.alt === "string" ? node.alt : ""),
        };
        replacements.push({ parent, index, html });
      }),
    );

    // Replace from highest index to lowest to keep earlier indices stable.
    for (const { parent, index, html } of replacements.sort((a, b) => b.index - a.index)) {
      parent.children[index] = html;
    }
  };
};

/** Wrap the raw SVG in a centered figure; preserves alt as accessible label. */
const wrapSvg = (svg: string, alt: string): string => {
  // Strip BOM / XML prolog so the SVG embeds cleanly inline.
  let body = svg.replace(/^﻿/, "").replace(/^\s*<\?xml[^?]*\?>\s*/, "");
  // Ensure the root <svg> has role/aria-label for a11y.
  if (alt) {
    body = body.replace(/<svg\b([^>]*?)>/, (m, attrs) =>
      /role=/.test(attrs) ? m : `<svg${attrs} role="img" aria-label="${escapeAttr(alt)}">`,
    );
  }
  return `<figure class="inline-svg">${body}</figure>`;
};

const escapeAttr = (s: string): string => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
