import { useEffect, useState, type FC, type ReactNode } from "react";
import type { NewsItem } from "../lib/news";

export type { NewsItem };

const todayLocal = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Markdown 風の [label](url) を <a> 要素に展開する。
const renderInlineLinks = (s: string): ReactNode[] => {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(
      <a key={key++} href={m[2]}>
        {m[1]}
      </a>,
    );
    last = re.lastIndex;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
};

const NewsCard: FC<{ item: NewsItem }> = ({ item }) => (
  <li className="rounded-md border border-sky-200/60 bg-white p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-800 dark:shadow-none">
    <p className="font-bold">{item.title}</p>
    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{renderInlineLinks(item.body)}</p>
  </li>
);

export const NewsBoard: FC<{ items: NewsItem[] }> = ({ items }) => {
  // SSR / 初期描画では today=null として全件を past 側に倒し、hydration mismatch を避ける。
  // mount 後に今日の yyyy-mm-dd を入れて再分割する。
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayLocal()), []);

  if (items.length === 0) return null;

  // yyyy-mm-dd 同士の辞書順比較で前後関係が決まる。
  const future = (n: NewsItem) => today !== null && n.date > today;
  const upcoming = items.filter(future).slice().reverse(); // 近い順
  const past = items.filter((n) => !future(n));

  return (
    <>
      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 rounded bg-sky-100 px-3 py-2 text-2xl leading-tight font-bold text-sky-900 dark:bg-sky-900/40 dark:text-sky-100">
            おしらせ
          </h2>
          <ul className="space-y-3">
            {upcoming.map((item) => (
              <NewsCard key={item.date + item.title} item={item} />
            ))}
          </ul>
        </section>
      )}
      {past.length > 0 && (
        <section className="mb-12">
          <details className="group">
            <summary className="mb-4 flex cursor-pointer list-none items-center gap-2 rounded bg-sky-100 px-3 py-2 text-2xl leading-tight font-bold text-sky-900 marker:hidden dark:bg-sky-900/40 dark:text-sky-100">
              <span className="inline-block text-[0.5rem] leading-none text-sky-900/60 transition-transform group-open:rotate-90 dark:text-sky-100/60">
                ▶
              </span>
              <span>これまで</span>
            </summary>
            <ul className="space-y-3">
              {past.map((item) => (
                <NewsCard key={item.date + item.title} item={item} />
              ))}
            </ul>
          </details>
        </section>
      )}
    </>
  );
};
