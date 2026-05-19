import { useCallback, useState } from "react";
import { SITE_TITLE } from "../consts";
import { ShareModal } from "./ShareModal";
import { Theme } from "./Theme";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [shareInfo, setShareInfo] = useState({ url: "", title: "" });

  const handleOpen = useCallback(() => {
    setShareInfo({ url: window.location.href, title: document.title });
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-sky-200/60 bg-sky-50/85 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/85">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <a href="/" className="text-fuchsia-800 !no-underline hover:opacity-80 dark:text-fuchsia-200 font-bold">
            {SITE_TITLE}
          </a>
          <nav className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleOpen}
              aria-label="Share this page"
              title="共有"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-zinc-800"
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
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <Theme />
          </nav>
        </div>
      </header>

      <ShareModal open={open} url={shareInfo.url} title={shareInfo.title} onClose={handleClose} />
    </>
  );
};
