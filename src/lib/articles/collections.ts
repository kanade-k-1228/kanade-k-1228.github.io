import { type CollectionEntry, getCollection } from "astro:content";

export type ArticleEntry = CollectionEntry<"article">;

export const getPublishedArticles = async (): Promise<ArticleEntry[]> => {
  const entries = await getCollection("article");
  return entries.sort((a, b) => {
    const aDate = a.data.date?.getTime() ?? 0;
    const bDate = b.data.date?.getTime() ?? 0;
    return bDate - aDate;
  });
};

export const entryUrl = (entry: ArticleEntry): string => `/${articleId(entry)}/`;

// `*` は series 無しを示すプレースホルダ。URL からは畳む。
export const articleId = (entry: ArticleEntry): string =>
  entry.id
    .split("/")
    .filter((seg) => seg !== "" && seg !== "*")
    .join("/");
