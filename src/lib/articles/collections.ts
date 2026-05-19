import { getCollection, type CollectionEntry } from "astro:content";

export type ArticleEntry = CollectionEntry<"article">;

const includeDrafts = import.meta.env.DEV;

export const articleId = (entry: ArticleEntry): string => entry.id.replace(/\/+/g, "/");

export const getPublishedArticles = async (): Promise<ArticleEntry[]> => {
  const entries = await getCollection("article", ({ data }) => includeDrafts || !data.draft);
  return entries.sort((a, b) => {
    const aDate = a.data.date?.getTime() ?? 0;
    const bDate = b.data.date?.getTime() ?? 0;
    return bDate - aDate;
  });
};

export const entryUrl = (entry: ArticleEntry): string => `/${articleId(entry)}/`;
