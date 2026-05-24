import type { FC } from "react";
import type { IndexLink, IndexSection, IndexSubsection } from "../lib/articles/index-tree";
import { ArticleCard } from "./ArticleCard";

export const ArticleIndex: FC<{ sections: IndexSection[] }> = ({ sections }) => (
  <section className="mb-8">
    <h2 className="mb-2 rounded bg-sky-100 px-3 py-1.5 text-2xl leading-tight font-bold text-sky-900 dark:bg-sky-900/40 dark:text-sky-100">
      記事一覧
    </h2>
    <div className="space-y-5">
      {sections.map((section, i) => (
        <SectionBlock key={i} section={section} />
      ))}
    </div>
  </section>
);

const SectionBlock: FC<{ section: IndexSection }> = ({ section }) => (
  <section>
    {section.title && (
      <h3 className="mb-2 border-b border-sky-200/70 pb-0.5 text-lg font-bold tracking-tight text-sky-900 dark:border-sky-700/40 dark:text-sky-100">
        {section.title}
      </h3>
    )}

    {section.items && section.items.length > 0 && (
      <ul className="mb-2 space-y-1.5">
        {section.items.map((item, j) => (
          <li key={j}>
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    )}

    {section.subsections && section.subsections.length > 0 && (
      <div className="space-y-2">
        {section.subsections.map((sub, k) => (
          <SeriesCard key={k} sub={sub} />
        ))}
      </div>
    )}
  </section>
);

const SeriesCard: FC<{ sub: IndexSubsection }> = ({ sub }) => (
  <article className="rounded-md border border-sky-200/70 bg-white/80 px-3 py-2 dark:border-sky-700/40 dark:bg-slate-800/60">
    <h4 className="mb-1 text-sm font-bold tracking-wide text-sky-800 dark:text-sky-200">{sub.title}</h4>
    {sub.abst && <p className="mb-1.5 text-sm leading-snug text-slate-600 dark:text-slate-400">{sub.abst}</p>}
    <ol className="space-y-0.5 text-sm">
      {sub.items.map((item, l) => (
        <li key={l} className="flex items-baseline gap-2 leading-snug">
          <span className="w-6 shrink-0 text-right text-xs text-slate-400 tabular-nums dark:text-slate-500">
            {l + 1}.
          </span>
          <SeriesItemLink item={item} />
        </li>
      ))}
    </ol>
  </article>
);

const ItemCard: FC<{ item: IndexLink }> = ({ item }) => {
  if (typeof item.url !== "string") {
    return <span className="text-slate-500 dark:text-slate-500">{item.label}</span>;
  }
  return <ArticleCard url={item.url} title={item.label} description={item.abst} icon={item.icon} />;
};

const SeriesItemLink: FC<{ item: IndexLink }> = ({ item }) => {
  if (typeof item.url !== "string") {
    return <span className="text-slate-500 dark:text-slate-500">{item.label}</span>;
  }
  return (
    <a
      href={item.url}
      className="flex-1 text-slate-700 !no-underline hover:!text-sky-700 hover:!underline dark:text-slate-300 dark:hover:!text-sky-300"
    >
      {item.label}
    </a>
  );
};
