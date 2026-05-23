import { parse } from "yaml";
import { categories } from "./categories";
import { articleId, getPublishedArticles, entryUrl, type ArticleEntry } from "./collections";

export interface IndexLink {
  label: string;
  url?: string;
}

export interface IndexSubsection {
  title: string;
  abst?: string;
  items: IndexLink[];
}

export interface IndexSection {
  title?: string;
  items?: IndexLink[];
  subsections?: IndexSubsection[];
}

interface SeriesEntry {
  name?: string;
  abst?: string;
  items?: string[];
}

const ROOT_KEY = "*";

const seriesSources = import.meta.glob<string>("/article/*/index.yaml", {
  eager: true,
  query: "?raw",
  import: "default",
});

const seriesByCategory = (): Record<string, Record<string, SeriesEntry>> => {
  const out: Record<string, Record<string, SeriesEntry>> = {};
  for (const [filePath, source] of Object.entries(seriesSources)) {
    const m = filePath.match(/^\/article\/([^/]+)\/index\.yaml$/);
    if (!m) continue;
    const parsed = parse(source) as Record<string, SeriesEntry> | null;
    if (parsed) out[m[1]] = parsed;
  }
  return out;
};

const linkOf = (entry: ArticleEntry): IndexLink => ({
  label: entry.data.title,
  url: entryUrl(entry),
});

export const buildIndex = async (): Promise<IndexSection[]> => {
  const articles = await getPublishedArticles();
  const byId = new Map(articles.map((a) => [articleId(a), a]));
  const indices = seriesByCategory();

  const sections: IndexSection[] = [];
  for (const [cat, catName] of Object.entries(categories)) {
    const series = indices[cat] ?? {};
    const directItems: IndexLink[] = [];
    const subBuckets = new Map<string, { abst?: string; items: IndexLink[] }>();

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
      const existing = subBuckets.get(title);
      if (existing) {
        existing.items.push(...links);
        if (!existing.abst && entry.abst) existing.abst = entry.abst;
      } else {
        subBuckets.set(title, { abst: entry.abst, items: links });
      }
    }

    const subsections: IndexSubsection[] = [];
    for (const [title, { abst, items }] of subBuckets) {
      if (items.length > 0) subsections.push({ title, abst, items });
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
