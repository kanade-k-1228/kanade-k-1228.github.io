import { useCallback, useEffect, useState } from "react";

const COPY_DEFAULT = "URL をコピー";
const COPY_DONE = "コピーしました";

const shareUrls = (url: string, title: string) => {
  const enc = encodeURIComponent;
  return {
    x: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    hatena: `https://b.hatena.ne.jp/entry/${url.replace(/^https?:\/\//, "")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
  };
};

interface Props {
  open: boolean;
  url: string;
  title: string;
  onClose: () => void;
}

export const ShareModal = ({ open, url, title, onClose }: Props) => {
  const [copyLabel, setCopyLabel] = useState(COPY_DEFAULT);

  useEffect(() => {
    if (!open) {
      setCopyLabel(COPY_DEFAULT);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel(COPY_DONE);
      window.setTimeout(() => setCopyLabel(COPY_DEFAULT), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }, [url]);

  const urls = shareUrls(url, title);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center bg-black/40 p-4 backdrop-blur-sm`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-lg border border-sky-200/60 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
          <h2 id="share-modal-title" className="text-lg font-bold">
            このページを共有
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-zinc-700"
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={urls.x}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-sky-200/60 px-3 py-2 text-sm !no-underline hover:bg-sky-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2H21l-6.51 7.44L22 22h-6.828l-4.79-6.26L4.8 22H2l7.04-8.04L2 2h6.91l4.32 5.71L18.244 2zm-2.39 18h1.91L7.27 4H5.22l10.633 16z" />
            </svg>
            <span className="!text-neutral-900 dark:!text-zinc-100">X (Twitter)</span>
          </a>
          <a
            href={urls.hatena}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-sky-200/60 px-3 py-2 text-sm !no-underline hover:bg-sky-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-9.5 12.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM12 14H8V8h3a2 2 0 0 1 0 4 2 2 0 0 1 1 2zm6.5 2.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM17 14h-2V8h2v6z" />
            </svg>
            <span className="!text-neutral-900 dark:!text-zinc-100">はてブ</span>
          </a>
          <a
            href={urls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-sky-200/60 px-3 py-2 text-sm !no-underline hover:bg-sky-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
            <span className="!text-neutral-900 dark:!text-zinc-100">Facebook</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-2 rounded-md border border-sky-200/60 px-3 py-2 text-left text-sm hover:bg-sky-50 dark:border-zinc-700 dark:hover:bg-zinc-700"
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="text-neutral-900 dark:text-zinc-100">{copyLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
