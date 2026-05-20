import { useEffect, useState, type FC, type ReactNode } from "react";
import { news } from "../lib/news";

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

interface Item {
  date: Date;
  title: string;
  body: string;
}

const NewsCard: FC<{ item: Item }> = ({ item }) => (
  <li className="rounded-md border border-sky-200/60 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
    <p className="font-bold">{item.title}</p>
    <p className="mt-1 text-sm text-neutral-900/70 dark:text-zinc-100/70">{renderInlineLinks(item.body)}</p>
  </li>
);

export const NewsBoard: FC = () => {
  // SSR / 初期描画では now=null として全件を past 側に倒し、hydration mismatch を避ける。
  // mount 後に Date.now() を入れて再分割する。
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  if (news.length === 0) return null;

  const future = (n: Item) => now !== null && n.date.getTime() > now;
  const upcoming = news.filter(future).slice().reverse(); // 近い順
  const past = news.filter((n) => !future(n));

  return (
    <>
      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 rounded bg-sky-200 px-3 py-2 text-2xl font-bold leading-tight text-sky-800 dark:bg-sky-950 dark:text-sky-200">
            おしらせ
          </h2>
          <ul className="space-y-3">
            {upcoming.map((item) => (
              <NewsCard key={item.date.toISOString() + item.title} item={item} />
            ))}
          </ul>
        </section>
      )}
      {past.length > 0 && (
        <section className="mb-12">
          <details className="group">
            <summary className="mb-4 flex cursor-pointer list-none items-center gap-2 rounded bg-sky-200 px-3 py-2 text-2xl font-bold leading-tight text-sky-800 marker:hidden dark:bg-sky-950 dark:text-sky-200">
              <span className="inline-block text-[0.5rem] leading-none text-sky-800/60 transition-transform group-open:rotate-90 dark:text-sky-200/60">
                ▶
              </span>
              <span>これまで</span>
            </summary>
            <ul className="space-y-3">
              {past.map((item) => (
                <NewsCard key={item.date.toISOString() + item.title} item={item} />
              ))}
            </ul>
          </details>
        </section>
      )}
    </>
  );
};
