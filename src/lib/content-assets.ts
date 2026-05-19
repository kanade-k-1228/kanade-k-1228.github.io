/**
 * Astro integration: serve and emit non-image binary assets that live
 * colocated with markdown articles under `article/<slug>/...`.
 *
 * Markdown links like `[label](./doc/foo.pdf)` resolve in the browser
 * against the article URL (`/computer/foo/`), so the browser fetches
 * `/computer/foo/doc/foo.pdf`. This integration makes that path actually serve
 * the file:
 *
 *   - dev: a middleware streams the colocated file from article/
 *   - build: every matching asset is copied into dist/ at the same path
 *
 * Images (jpg/png/gif/webp) are handled by Astro's asset pipeline, and SVGs
 * are inlined by `remark-inline-svg`, so they are intentionally excluded
 * here. Add new extensions to ASSET_EXTS if you start linking other binary
 * formats (e.g. .stl, .step, .tar.gz).
 */
import type { AstroIntegration } from "astro";
import { promises as fs, createReadStream } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ASSET_EXTS = new Set([".pdf", ".mp4", ".webm", ".mov", ".zip"]);
const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".zip": "application/zip",
};

const isAssetExt = (ext: string): boolean => ASSET_EXTS.has(ext.toLowerCase());

export const contentAssets = (): AstroIntegration => {
  const articleRoot = resolve("article");

  return {
    name: "content-assets",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const url = new URL(req.url, "http://internal");
          const rest = url.pathname.replace(/^\/+/, "");
          if (!rest) return next();
          const ext = extname(rest).toLowerCase();
          if (!isAssetExt(ext)) return next();
          const filePath = join(articleRoot, decodeURIComponent(rest));
          fs.stat(filePath).then(
            (stat) => {
              if (!stat.isFile()) return next();
              res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
              res.setHeader("Content-Length", String(stat.size));
              createReadStream(filePath).pipe(res);
            },
            () => next(),
          );
        });
      },

      "astro:build:done": async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        let copied = 0;
        for await (const filePath of walk(articleRoot)) {
          if (!isAssetExt(extname(filePath))) continue;
          const rel = relative(articleRoot, filePath);
          const dest = join(distDir, rel);
          await fs.mkdir(dirname(dest), { recursive: true });
          await fs.copyFile(filePath, dest);
          copied++;
        }
        logger.info(`Copied ${copied} colocated content asset(s) to dist`);
      },
    },
  };
};

const walk = async function* (dir: string): AsyncGenerator<string> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(abs);
    else if (entry.isFile()) yield abs;
  }
};
