// 記事と colocate された非画像バイナリ (.pdf/.mp4 等) を dev では middleware で配信し、
// build では dist/ に同じパスでコピーする。画像は Astro の asset pipeline、SVG は
// remark-inline-svg が扱うので除外。新しい拡張子は ASSET_EXTS に追加する。
import { createReadStream, promises as fs } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

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

const ASSET_EXTS = new Set([".pdf", ".mp4", ".webm", ".mov", ".zip"]);
const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".zip": "application/zip",
};

const isAssetExt = (ext: string): boolean => ASSET_EXTS.has(ext.toLowerCase());

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
