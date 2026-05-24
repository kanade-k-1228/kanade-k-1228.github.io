import type { FC } from "react";
import type { FeaturedItem } from "../lib/articles/featured";
import { ArticleCard } from "./ArticleCard";

export const FeaturedList: FC<{ items: FeaturedItem[] }> = ({ items }) => (
  <section className="mb-8">
    <h2 className="mb-2 rounded bg-sky-100 px-3 py-1.5 text-2xl leading-tight font-bold text-sky-900 dark:bg-sky-900/40 dark:text-sky-100">
      新着記事
    </h2>
    {items.length === 0 ? (
      <p className="text-slate-700 dark:text-slate-400">
        (<code>data/featured.yaml</code> に手書きで追記)
      </p>
    ) : (
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.url}>
            <ArticleCard url={item.url} title={item.title} description={item.description} icon={item.icon} />
          </li>
        ))}
      </ul>
    )}
  </section>
);
