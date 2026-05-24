// remark-inline-svg は Astro 組み込みの remark-collect-images より前に走らせる
// 必要がある (colocated SVG を asset pipeline に渡す前にインライン化したい)。
// ユーザ指定プラグインは Astro 5 のデフォルトより前に実行されるので、この順で OK。
// remark-link-card は remark-directive が生成した `::card[url]` を拾う。
import type { AstroUserConfig } from "astro";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import { rehypeTypstSafe } from "./rehype-typst";
import { remarkInlineSvg } from "./remark-inline-svg";
import { remarkLinkCard } from "./remark-link-card";

export const markdownConfig: AstroUserConfig["markdown"] = {
  remarkPlugins: [remarkInlineSvg, remarkDirective, remarkLinkCard, remarkMath],
  rehypePlugins: [rehypeTypstSafe],
  shikiConfig: {
    themes: { light: "github-light", dark: "github-dark" },
    wrap: true,
  },
};
