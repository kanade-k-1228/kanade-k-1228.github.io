import type { FC } from "react";
import type { ResolvedIcon } from "../lib/emoji";

export interface ArticleCardProps {
  url: string;
  title: string;
  description?: string;
  icon?: ResolvedIcon;
}

export const ArticleCard: FC<ArticleCardProps> = ({ url, title, description, icon }) => (
  <a
    href={url}
    className="group flex items-center gap-3 rounded-md border border-sky-200/70 bg-white/80 px-3 py-1.5 !no-underline transition-colors hover:border-sky-400 hover:bg-sky-50/60 dark:border-sky-700/40 dark:bg-slate-800/60 dark:hover:border-sky-500 dark:hover:bg-sky-900/20"
  >
    {icon && <ArticleIcon icon={icon} className="shrink-0 text-3xl leading-none" imgClass="h-9 w-9" />}
    <div className="min-w-0 flex-1">
      <p className="line-clamp-1 font-bold text-sky-900 group-hover:text-sky-700 dark:text-sky-100 dark:group-hover:text-sky-300">
        {title}
      </p>
      {description && (
        <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400">{description}</p>
      )}
    </div>
  </a>
);

export const ArticleIcon: FC<{ icon: ResolvedIcon; className?: string; imgClass?: string }> = ({
  icon,
  className,
  imgClass,
}) => {
  if (icon.type === "unicode") {
    return (
      <span className={className} aria-label={icon.alt} role="img">
        {icon.char}
      </span>
    );
  }
  return <img src={icon.src} alt={icon.alt} loading="lazy" className={imgClass} />;
};
