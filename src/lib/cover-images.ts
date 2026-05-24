// 出力 URL の prefix は Meta.tsx の `resolveOgImage` フォールバックと一致させる。
import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { type CoverInputs, renderCoverPng } from "./cover/render";
import { findArticleByRoute, type ScannedArticle, scanArticles } from "./cover/scan-articles";

export const coverImages = (): AstroIntegration => ({
  name: "cover-images",
  hooks: {
    "astro:server:setup": ({ server }) => {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, "http://internal");
        const route = matchOgRoute(url.pathname);
        if (route === null) return next();

        (async () => {
          const inputs = await resolveInputs(route);
          if (inputs === "no-article") {
            res.statusCode = 404;
            res.end(`No article for ${route}`);
            return;
          }
          const png = await renderCoverPng(inputs);
          res.setHeader("Content-Type", "image/png");
          res.setHeader("Cache-Control", "no-cache");
          res.end(png);
        })().catch((err) => {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(`cover-images error: ${err instanceof Error ? err.message : String(err)}`);
        });
      });
    },

    "astro:build:done": async ({ dir, logger }) => {
      const distDir = fileURLToPath(dir);
      const write = async (route: string, inputs: CoverInputs) => {
        const png = await renderCoverPng(inputs);
        const rel = route === "/" ? FILE_NAME : join(route.slice(1), FILE_NAME);
        const dest = join(distDir, URL_PREFIX.slice(1), rel);
        await fs.mkdir(dirname(dest), { recursive: true });
        await fs.writeFile(dest, png);
      };

      let generated = 0;

      try {
        await write("/", { title: SITE_TITLE, abst: SITE_DESCRIPTION });
        generated++;
      } catch (err) {
        logger.warn(`failed to render site default cover: ${err instanceof Error ? err.message : err}`);
      }

      for await (const article of scanArticles()) {
        try {
          await write(article.route, articleToInputs(article));
          generated++;
        } catch (err) {
          logger.warn(`failed to render cover for ${article.route}: ${err instanceof Error ? err.message : err}`);
        }
      }
      logger.info(`Generated ${generated} cover image(s)`);
    },
  },
});

const URL_PREFIX = "/cover";
const FILE_NAME = "cover.png";

const matchOgRoute = (pathname: string): string | null => {
  if (!pathname.startsWith(`${URL_PREFIX}/`)) return null;
  if (!pathname.endsWith(`/${FILE_NAME}`)) return null;
  return pathname.slice(URL_PREFIX.length, pathname.length - FILE_NAME.length);
};

const resolveInputs = async (route: string): Promise<CoverInputs | "no-article"> => {
  if (route === "/") return { title: SITE_TITLE, abst: SITE_DESCRIPTION };
  const article = await findArticleByRoute(route);
  if (!article) return "no-article";
  return articleToInputs(article);
};

const articleToInputs = (article: ScannedArticle): CoverInputs => ({
  title: article.frontmatter.title,
  abst: article.frontmatter.abst,
  date: article.frontmatter.date,
  category: article.category,
  series: article.series,
  icon: article.frontmatter.icon,
});
