import { parse } from "yaml";
import yamlSource from "../../data/news.yaml?raw";

interface NewsItem {
  date: Date;
  title: string;
  body: string;
  status: "upcoming" | "past";
}

interface RawEntry {
  title: string;
  body: string;
}

const toDate = (key: unknown): Date => {
  if (key instanceof Date) return key;
  return new Date(String(key));
};

const raw = parse(yamlSource) as Record<string, RawEntry> | null;
const today = new Date();
today.setHours(0, 0, 0, 0);

export const news: NewsItem[] = Object.entries(raw ?? {})
  .map(([key, entry]) => {
    const date = toDate(key);
    return {
      date,
      title: entry.title,
      body: entry.body,
      status: date.getTime() >= today.getTime() ? ("upcoming" as const) : ("past" as const),
    };
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());
