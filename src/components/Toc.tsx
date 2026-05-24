import type { MarkdownHeading } from "astro";
import { type FC, useEffect, useRef } from "react";

const MIN_DEPTH = 2;
const MAX_DEPTH = 3;

export const Toc: FC<{
  headings: MarkdownHeading[];
  minDepth?: number;
  maxDepth?: number;
}> = ({ headings, minDepth = MIN_DEPTH, maxDepth = MAX_DEPTH }) => {
  const navRef = useRef<HTMLElement>(null);
  const visible = headings.filter((h) => h.depth >= minDepth && h.depth <= maxDepth);

  useEffect(() => {
    if (visible.length === 0) return;
    const root = navRef.current;
    if (!root) return;
    return observeActiveHeading(root);
  }, [visible.length]);

  if (visible.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label="目次"
      data-toc
      className="rounded-md border border-sky-200/60 bg-white/85 px-3 py-2 text-sm shadow-sm backdrop-blur dark:border-slate-700/70 dark:bg-slate-800/85 dark:shadow-none"
    >
      <ul className="space-y-1">
        {visible.map((h) => (
          <li key={h.slug} className="leading-snug" style={{ paddingLeft: `${(h.depth - minDepth) * 10}px` }}>
            <a
              href={`#${h.slug}`}
              data-toc-link={h.slug}
              className="toc-link block border-l-2 border-transparent py-0.5 pl-2 text-slate-700 !no-underline transition-colors hover:!text-sky-700 dark:text-slate-300 dark:hover:!text-sky-200"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const observeActiveHeading = (root: HTMLElement): (() => void) | undefined => {
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("a[data-toc-link]"));
  if (links.length === 0) return;

  const slugs = Array.from(new Set(links.map((a) => a.dataset.tocLink!).filter(Boolean)));
  const els = slugs.map((slug) => document.getElementById(slug)).filter((el): el is HTMLElement => el !== null);
  if (els.length === 0) return;

  const visibility = new Map<string, number>();
  let activeSlug: string | null = null;

  const setActive = (slug: string | null) => {
    if (slug === activeSlug) return;
    activeSlug = slug;
    document.querySelectorAll<HTMLAnchorElement>("a[data-toc-link]").forEach((a) => {
      a.classList.toggle("is-active", a.dataset.tocLink === slug);
    });
    if (slug) scrollActiveIntoView(slug);
  };

  const pickActive = () => {
    let bestSlug: string | null = null;
    let bestTop = Number.POSITIVE_INFINITY;
    visibility.forEach((ratio, slug) => {
      if (ratio <= 0) return;
      const el = document.getElementById(slug);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < bestTop) {
        bestTop = top;
        bestSlug = slug;
      }
    });
    if (bestSlug) {
      setActive(bestSlug);
      return;
    }
    // どの見出しも viewport 内になければ、直近に通過したものをアクティブにする。
    let passed: string | null = null;
    for (const h of els) {
      if (h.getBoundingClientRect().top - 100 <= 0) {
        passed = h.id;
      } else {
        break;
      }
    }
    setActive(passed ?? els[0].id);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
      }
      pickActive();
    },
    {
      rootMargin: "-80px 0px -60% 0px",
      threshold: [0, 1],
    },
  );

  els.forEach((h) => observer.observe(h));
  pickActive();

  return () => observer.disconnect();
};

const scrollActiveIntoView = (slug: string) => {
  document.querySelectorAll<HTMLElement>("[data-toc]").forEach((toc) => {
    const link = toc.querySelector<HTMLElement>(`a[data-toc-link="${slug}"]`);
    if (!link) return;
    const scroller = toc.parentElement?.classList.contains("overflow-y-auto") ? toc.parentElement : null;
    if (!scroller) return;
    const linkTop = link.offsetTop;
    const linkBottom = linkTop + link.offsetHeight;
    const viewTop = scroller.scrollTop;
    const viewBottom = viewTop + scroller.clientHeight;
    if (linkTop < viewTop) {
      scroller.scrollTop = linkTop - 8;
    } else if (linkBottom > viewBottom) {
      scroller.scrollTop = linkBottom - scroller.clientHeight + 8;
    }
  });
};
