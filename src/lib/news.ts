import { parse } from "yaml";
import src from "../../data/news.yaml?raw";

type NewsYaml = Record<string, { title: string; body: string }>;

export interface NewsItem {
  date: string;
  title: string;
  body: string;
}

const raw = parse(src) as NewsYaml | null;

export const news: NewsItem[] = Object.entries(raw ?? {})
  .map(([key, { title, body }]) => ({ date: String(key), title, body }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
