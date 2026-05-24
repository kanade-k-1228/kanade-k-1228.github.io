import { parse } from "yaml";
import src from "../../data/news.yaml?raw";

export interface NewsItem {
  date: string;
  title: string;
  body: string;
}

export const news: NewsItem[] = Object.entries((parse(src) as NewsYaml | null) ?? {})
  .map(([key, { title, body }]) => ({ date: String(key), title, body }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

type NewsYaml = Record<string, { title: string; body: string }>;
