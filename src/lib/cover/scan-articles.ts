import { promises as fs } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { parse as parseYaml } from "yaml";

const ARTICLE_ROOT = resolve("article");

export type ArticleFrontmatter = {
  title: string;
  date?: string | Date;
  abst?: string;
  words?: string[];
  cover?: string;
};

export type ScannedArticle = {
  filePath: string;
  route: string;
  frontmatter: ArticleFrontmatter;
  hasManualCover: boolean;
  category: string;
  series?: string;
  slug: string;
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

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

const parseFrontmatter = (raw: string): ArticleFrontmatter | null => {
  const m = FRONTMATTER_RE.exec(raw);
  if (!m) return null;
  try {
    return (parseYaml(m[1]) as ArticleFrontmatter) ?? null;
  } catch {
    return null;
  }
};

const deriveLocation = (rel: string): { route: string; category: string; series?: string; slug: string } | null => {
  const parts = rel.split(sep);
  if (parts.length !== 4) return null;
  if (parts[3] !== "index.md" && parts[3] !== "index.mdx") return null;
  const [category, series, slug] = parts;
  const route = series === "*" ? `/${category}/${slug}/` : `/${category}/${series}/${slug}/`;
  return { route, category, series: series === "*" ? undefined : series, slug };
};

export const scanArticles = async function* (): AsyncGenerator<ScannedArticle> {
  for await (const filePath of walk(ARTICLE_ROOT)) {
    if (!filePath.endsWith("index.md") && !filePath.endsWith("index.mdx")) continue;
    const rel = relative(ARTICLE_ROOT, filePath);
    const loc = deriveLocation(rel);
    if (!loc) continue;
    const raw = await fs.readFile(filePath, "utf8");
    const frontmatter = parseFrontmatter(raw);
    if (!frontmatter?.title) continue;
    const coverValue = frontmatter.cover;
    const hasManualCover = coverValue != null && String(coverValue).trim() !== "";
    yield {
      filePath,
      route: loc.route,
      frontmatter,
      hasManualCover,
      category: loc.category,
      series: loc.series,
      slug: loc.slug,
    };
  }
};

export const findArticleByRoute = async (route: string): Promise<ScannedArticle | null> => {
  const target = route.endsWith("/") ? route : `${route}/`;
  for await (const article of scanArticles()) {
    if (article.route === target) return article;
  }
  return null;
};
