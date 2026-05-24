import type { FC } from "react";
import type { SeriesChapter, SeriesContext } from "../lib/articles/index-tree";
import { ArticleIcon } from "./ArticleCard";

export const SeriesNav: FC<{ series: SeriesContext }> = ({ series }) => (
  <nav
    aria-label={`シリーズ: ${series.name}`}
    className="mb-4 rounded-lg border border-emerald-200/70 bg-emerald-50/50 px-3 py-2 dark:border-emerald-700/40 dark:bg-emerald-900/15"
  >
    <div className="mb-1 flex items-center justify-between gap-2 text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-300">
      <span>シリーズ</span>
      <span className="tabular-nums text-slate-500 dark:text-slate-400">
        {series.currentIndex + 1} / {series.chapters.length}
      </span>
    </div>
    <div className="mb-1.5 flex items-center gap-1.5">
      {series.icon && <ArticleIcon icon={series.icon} className="shrink-0 text-lg leading-none" imgClass="h-5 w-5" />}
      <span className="text-sm leading-snug font-bold text-emerald-900 dark:text-emerald-100">{series.name}</span>
    </div>
    {series.abst && (
      <p className="mb-2 text-xs leading-snug text-slate-600 dark:text-slate-400">{series.abst}</p>
    )}
    <ol className="space-y-0.5 text-sm">
      {series.chapters.map((ch, i) => (
        <ChapterItem key={i} index={i} chapter={ch} />
      ))}
    </ol>
  </nav>
);

export const SeriesPrevNext: FC<{ series: SeriesContext }> = ({ series }) => {
  const prev = series.currentIndex > 0 ? series.chapters[series.currentIndex - 1] : null;
  const next = series.currentIndex < series.chapters.length - 1 ? series.chapters[series.currentIndex + 1] : null;
  if (!prev && !next) return null;

  return (
    <nav aria-label="シリーズ内ナビゲーション" className="mt-5 flex flex-col gap-2 sm:flex-row">
      {prev ? (
        <a href={prev.url} className={prevNextClass}>
          <div className="text-xs text-slate-500 dark:text-slate-400">‹ 前の章</div>
          <div className="mt-1 font-bold text-emerald-800 group-hover:text-emerald-900 dark:text-emerald-200 dark:group-hover:text-emerald-100">
            {prev.label}
          </div>
        </a>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <a href={next.url} className={`${prevNextClass} text-right`}>
          <div className="text-xs text-slate-500 dark:text-slate-400">次の章 ›</div>
          <div className="mt-1 font-bold text-emerald-800 group-hover:text-emerald-900 dark:text-emerald-200 dark:group-hover:text-emerald-100">
            {next.label}
          </div>
        </a>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
};

const ChapterItem: FC<{ index: number; chapter: SeriesChapter }> = ({ index, chapter }) => {
  const num = (
    <span className="w-6 shrink-0 text-right text-xs text-slate-500 tabular-nums dark:text-slate-500">
      {index + 1}.
    </span>
  );
  if (chapter.isCurrent) {
    return (
      <li aria-current="page" className="flex items-baseline gap-2">
        {num}
        <span className="flex-1 border-l-2 border-emerald-500 pl-2 font-bold text-emerald-900 dark:border-emerald-400 dark:text-emerald-100">
          {chapter.label}
        </span>
      </li>
    );
  }
  return (
    <li className="flex items-baseline gap-2">
      {num}
      <a
        href={chapter.url}
        className="flex-1 border-l-2 border-transparent pl-2 text-slate-700 !no-underline transition-colors hover:!text-emerald-700 dark:text-slate-300 dark:hover:!text-emerald-300"
      >
        {chapter.label}
      </a>
    </li>
  );
};

const prevNextClass =
  "group block flex-1 rounded-md border border-emerald-200/70 bg-white/60 px-3 py-2 !no-underline transition-colors hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-emerald-700/40 dark:bg-slate-800/40 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/15";
