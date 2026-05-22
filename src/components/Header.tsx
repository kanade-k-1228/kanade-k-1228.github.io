import { useCallback, useState } from "react";
import { SITE_TITLE } from "../consts";
import { Theme } from "./Theme";

const COPY_DEFAULT = "URL をコピー";
const COPY_DONE = "コピーしました";

export const Header = () => {
  const [copyLabel, setCopyLabel] = useState(COPY_DEFAULT);

  const handleTweet = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLabel(COPY_DONE);
      window.setTimeout(() => setCopyLabel(COPY_DEFAULT), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-sky-200/60 bg-sky-50/85 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/85">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <a href="/" className="text-fuchsia-800 !no-underline hover:opacity-80 dark:text-fuchsia-200 font-bold">
          {SITE_TITLE}
        </a>
        <nav className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleTweet}
            aria-label="Share on Twitter"
            title="Twitter で共有"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-sky-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.32 9.32 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25A13.229 13.229 0 0 1 1.671 3.149a4.66 4.66 0 0 0 1.442 6.22 4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995A9.5 9.5 0 0 1 0 18.59a13.194 13.194 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy URL"
            title={copyLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-sky-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <Theme />
        </nav>
      </div>
    </header>
  );
};
