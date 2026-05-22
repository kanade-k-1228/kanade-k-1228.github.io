import type { FC } from "react";
import type { FeaturedItem } from "../lib/articles/featured";

export const FeaturedList: FC<{ items: FeaturedItem[] }> = ({ items }) => (
  <section className="mb-12">
    <h2 className="mb-4 rounded bg-sky-200 px-3 py-2 text-2xl font-bold leading-tight text-sky-800 dark:bg-sky-950 dark:text-sky-200">
      新着記事
    </h2>
    {items.length === 0 ? (
      <p className="text-neutral-900/60 dark:text-zinc-100/60">
        (<code>data/featured.yaml</code> に手書きで追記)
      </p>
    ) : (
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.url}>
            <a href={item.url} className="font-bold">
              {item.title}
            </a>
            {item.description && (
              <span className="ml-2 text-sm text-neutral-900/70 dark:text-zinc-100/70">{item.description}</span>
            )}
          </li>
        ))}
      </ul>
    )}
  </section>
);
