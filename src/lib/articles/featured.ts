import { parse } from "yaml";
import yamlSource from "../../../data/featured.yaml?raw";
import { getPublishedArticles } from "./collections";

export interface FeaturedItem {
  title: string;
  url: string;
  description?: string;
}

const urls = (parse(yamlSource) as string[] | null) ?? [];

export const getFeatured = async (): Promise<FeaturedItem[]> => {
  if (urls.length === 0) return [];
  const articles = await getPublishedArticles();
  const byUrl = new Map(articles.map((a) => [`/${a.id}/`, a]));
  const items: FeaturedItem[] = [];
  for (const url of urls) {
    const article = byUrl.get(url);
    if (!article) continue;
    items.push({
      url,
      title: article.data.title,
      description: article.data.description,
    });
  }
  return items;
};
