import { parse } from "yaml";
import src from "../../data/news.yaml?raw";

type NewsYaml = Record<string, { title: string; body: string }>;

interface News {
  date: Date;
  title: string;
  body: string;
}

const raw = parse(src) as NewsYaml | null;

export const news: News[] = Object.entries(raw ?? {})
  .map(([key, { title, body }]) => ({ date: new Date(String(key)), title, body }))
  .sort((a, b) => b.date.getTime() - a.date.getTime());
