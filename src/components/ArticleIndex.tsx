import type { FC } from "react";
import type { IndexSection } from "../lib/articles/index-tree";
import { IndexList } from "./IndexList";

export const ArticleIndex: FC<{ sections: IndexSection[] }> = ({ sections }) => (
  <section className="mb-12">
    <h2 className="mb-4 rounded bg-sky-200 px-3 py-2 text-2xl font-bold leading-tight text-sky-800 dark:bg-sky-950 dark:text-sky-200">
      記事一覧
    </h2>
    <IndexList sections={sections} />
  </section>
);
