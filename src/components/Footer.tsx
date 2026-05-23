import { AUTHOR } from "../consts";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-sky-200/60 py-8 text-center text-sm text-slate-700 dark:border-slate-700/70 dark:text-slate-400">
      <div className="mx-auto max-w-4xl px-4">
        <p>
          © {year} {AUTHOR}
        </p>
      </div>
    </footer>
  );
};
