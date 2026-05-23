import type { FC } from "react";
import type { IndexLink, IndexSection } from "../lib/articles/index-tree";

const ItemLink: FC<{ item: IndexLink }> = ({ item }) => {
  const isLink = typeof item.url === "string";
  if (isLink) {
    return (
      <a href={item.url ?? "#"} className="group inline-flex items-baseline gap-1 !no-underline hover:!underline">
        <span
          aria-hidden="true"
          className="text-sky-700/40 transition group-hover:translate-x-0.5 group-hover:text-sky-700 dark:text-sky-300/40 dark:group-hover:text-sky-300"
        >
          ›
        </span>
        <span>{item.label}</span>
      </a>
    );
  }
  return <span className="text-slate-500 dark:text-slate-500">{item.label}</span>;
};

export const IndexList: FC<{ sections: IndexSection[] }> = ({ sections }) => {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => {
        const accent = i % 2 === 0;
        const sectionClass = [
          "rounded-lg border-l-4 bg-white/60 py-3 pl-5 pr-3 shadow-sm dark:bg-slate-800/40 dark:shadow-none",
          accent ? "border-sky-400 dark:border-sky-500/70" : "border-fuchsia-400 dark:border-fuchsia-500/70",
        ].join(" ");
        const titleClass = [
          "mb-4 text-xl font-bold tracking-tight",
          accent ? "text-sky-800 dark:text-sky-200" : "text-fuchsia-800 dark:text-fuchsia-200",
        ].join(" ");

        return (
          <section key={i} className={sectionClass}>
            {section.title && <h2 className={titleClass}>{section.title}</h2>}

            {section.items && section.items.length > 0 && (
              <ul className="mb-4 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {section.items.map((item, j) => (
                  <li key={j} className="leading-snug">
                    <ItemLink item={item} />
                  </li>
                ))}
              </ul>
            )}

            {section.subsections && section.subsections.length > 0 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                {section.subsections.map((sub, k) => (
                  <div key={k}>
                    <h3 className="mb-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-400">
                      {sub.title}
                    </h3>
                    {sub.abst && (
                      <p className="mb-2 text-sm leading-snug text-slate-600 dark:text-slate-400">{sub.abst}</p>
                    )}
                    <ul className="space-y-1">
                      {sub.items.map((item, l) => (
                        <li key={l} className="leading-snug">
                          <ItemLink item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
