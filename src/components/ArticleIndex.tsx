import type { FC } from "react";
import type { IndexSection } from "../lib/articles/index-tree";
import { IndexList } from "./IndexList";

export const ArticleIndex: FC<{ sections: IndexSection[] }> = ({ sections }) => (
  <section className="mb-12">
    <h2 className="mb-4 rounded bg-sky-100 px-3 py-2 text-2xl leading-tight font-bold text-sky-900 dark:bg-sky-900/40 dark:text-sky-100">
      記事一覧
    </h2>
    <IndexList sections={sections} />
  </section>
);
