import { parse } from "yaml";
import yamlSource from "../../../data/featured.yaml?raw";
import { resolveIcon, type ResolvedIcon } from "../emoji";
import { entryUrl, getPublishedArticles } from "./collections";

export interface FeaturedItem {
  title: string;
  url: string;
  description?: string;
  icon?: ResolvedIcon;
}

export const getFeatured = async (): Promise<FeaturedItem[]> => {
  if (urls.length === 0) return [];
  const articles = await getPublishedArticles();
  const byUrl = new Map(articles.map((a) => [entryUrl(a), a]));
  const items: FeaturedItem[] = [];
  for (const url of urls) {
    const article = byUrl.get(url);
    if (!article) continue;
    items.push({
      url,
      title: article.data.title,
      description: article.data.abst,
      icon: resolveIcon(article.data.icon) ?? undefined,
    });
  }
  return items;
};

const urls = (parse(yamlSource) as string[] | null) ?? [];
