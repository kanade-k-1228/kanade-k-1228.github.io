import { useCallback } from "react";

export const Theme = () => {
  const toggle = useCallback(() => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-slate-600 hover:bg-sky-100 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label="ダーク/ライト切替"
    >
      <svg className="h-5 w-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg className="hidden h-5 w-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
};
