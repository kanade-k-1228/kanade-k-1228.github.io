import { parse } from "yaml";
import categoriesSource from "../../../article/index.yaml?raw";
import { resolveIcon, type ResolvedIcon } from "../emoji";
import { type ArticleEntry, articleId, entryUrl, getPublishedArticles } from "./collections";

export interface IndexLink {
  label: string;
  url?: string;
  abst?: string;
  icon?: ResolvedIcon;
}

export interface IndexSubsection {
  title: string;
  abst?: string;
  icon?: ResolvedIcon;
  items: IndexLink[];
}

export interface IndexSection {
  title?: string;
  items?: IndexLink[];
  subsections?: IndexSubsection[];
}

export interface SeriesChapter {
  label: string;
  url: string;
  isCurrent: boolean;
}

export interface SeriesContext {
  categoryId: string;
  categoryName: string;
  seriesKey: string;
  name: string;
  abst?: string;
  icon?: ResolvedIcon;
  chapters: SeriesChapter[];
  currentIndex: number;
}

export const buildIndex = async (): Promise<IndexSection[]> => {
  const articles = await getPublishedArticles();
  const byId = new Map(articles.map((a) => [articleId(a), a]));
  const indices = seriesByCategory();

  const sections: IndexSection[] = [];
  for (const [cat, catName] of Object.entries(categories)) {
    const series = indices[cat] ?? {};
    const directItems: IndexLink[] = [];
    const subBuckets = new Map<string, { abst?: string; icon?: ResolvedIcon; items: IndexLink[] }>();

    for (const [seriesKey, entry] of Object.entries(series)) {
      const slugs = entry.items ?? [];
      const lookupKey =
        seriesKey === ROOT_KEY ? (slug: string) => `${cat}/${slug}` : (slug: string) => `${cat}/${seriesKey}/${slug}`;
      const links = slugs
        .map((slug) => byId.get(lookupKey(slug)))
        .filter((a): a is ArticleEntry => a !== undefined)
        .map(linkOf);

      if (seriesKey === ROOT_KEY) {
        directItems.push(...links);
        continue;
      }
      const title = entry.name ?? seriesKey;
      const icon = resolveIcon(entry.icon) ?? undefined;
      const existing = subBuckets.get(title);
      if (existing) {
        existing.items.push(...links);
        if (!existing.abst && entry.abst) existing.abst = entry.abst;
        if (!existing.icon && icon) existing.icon = icon;
      } else {
        subBuckets.set(title, { abst: entry.abst, icon, items: links });
      }
    }

    const subsections: IndexSubsection[] = [];
    for (const [title, { abst, icon, items }] of subBuckets) {
      if (items.length > 0) subsections.push({ title, abst, icon, items });
    }

    if (directItems.length === 0 && subsections.length === 0) continue;
    sections.push({
      title: catName,
      items: directItems.length > 0 ? directItems : undefined,
      subsections: subsections.length > 0 ? subsections : undefined,
    });
  }

  return sections;
};

export const getSeriesForArticle = async (entry: ArticleEntry): Promise<SeriesContext | null> => {
  const id = articleId(entry);
  const parts = id.split("/");
  if (parts.length < 2) return null;

  const cat = parts[0];
  const categoryName = categories[cat];
  if (!categoryName) return null;

  const series = seriesByCategory()[cat];
  if (!series) return null;

  let foundKey: string | null = null;
  let foundSeries: SeriesEntry | null = null;
  let currentSlug: string | null = null;

  if (parts.length >= 3) {
    const candidateKey = parts[1];
    const candidateSlug = parts.slice(2).join("/");
    const s = series[candidateKey];
    if (s && (s.items ?? []).includes(candidateSlug)) {
      foundKey = candidateKey;
      foundSeries = s;
      currentSlug = candidateSlug;
    }
  }

  if (!foundSeries || foundKey === null || foundKey === ROOT_KEY || currentSlug === null) return null;

  const slugs = foundSeries.items ?? [];
  if (slugs.length < 2) return null;

  const seriesKey = foundKey;
  const articles = await getPublishedArticles();
  const byId = new Map(articles.map((a) => [articleId(a), a]));
  const lookupKey = seriesKey === ROOT_KEY ? (s: string) => `${cat}/${s}` : (s: string) => `${cat}/${seriesKey}/${s}`;

  let currentIndex = -1;
  const chapters: SeriesChapter[] = [];
  for (const slug of slugs) {
    const article = byId.get(lookupKey(slug));
    if (!article) continue;
    const isCurrent = slug === currentSlug;
    if (isCurrent) currentIndex = chapters.length;
    chapters.push({
      label: article.data.title,
      url: entryUrl(article),
      isCurrent,
    });
  }

  if (chapters.length < 2 || currentIndex < 0) return null;

  return {
    categoryId: cat,
    categoryName,
    seriesKey,
    name: foundSeries.name ?? seriesKey,
    abst: foundSeries.abst,
    icon: resolveIcon(foundSeries.icon) ?? undefined,
    chapters,
    currentIndex,
  };
};

// article/index.yaml の記述順がそのままカテゴリ表示順になる。
const categories: Record<string, string> = (parse(categoriesSource) as Record<string, string> | null) ?? {};

interface SeriesEntry {
  name?: string;
  abst?: string;
  icon: string;
  items?: string[];
}

const ROOT_KEY = "*";

const seriesSources = import.meta.glob<string>("/article/*/index.yaml", {
  eager: true,
  query: "?raw",
  import: "default",
});

let seriesCache: Record<string, Record<string, SeriesEntry>> | null = null;
const seriesByCategory = (): Record<string, Record<string, SeriesEntry>> => {
  if (seriesCache) return seriesCache;
  const out: Record<string, Record<string, SeriesEntry>> = {};
  for (const [filePath, source] of Object.entries(seriesSources)) {
    const m = filePath.match(/^\/article\/([^/]+)\/index\.yaml$/);
    if (!m) continue;
    const parsed = parse(source) as Record<string, Partial<SeriesEntry>> | null;
    if (!parsed) continue;
    const validated: Record<string, SeriesEntry> = {};
    for (const [key, entry] of Object.entries(parsed)) {
      if (typeof entry?.icon !== "string" || entry.icon.trim() === "") {
        throw new Error(`Series "${m[1]}/${key}" in ${filePath} is missing required "icon" field`);
      }
      validated[key] = entry as SeriesEntry;
    }
    out[m[1]] = validated;
  }
  seriesCache = out;
  return out;
};

const linkOf = (entry: ArticleEntry): IndexLink => ({
  label: entry.data.title,
  url: entryUrl(entry),
  abst: entry.data.abst,
  icon: resolveIcon(entry.data.icon) ?? undefined,
});
