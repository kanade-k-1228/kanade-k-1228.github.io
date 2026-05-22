/**
 * Astro の markdown パイプライン設定。astro.config.ts から参照する。
 *
 * 設計メモ:
 * - remark-inline-svg は Astro の組み込み remark-collect-images より前に走らせる
 *   必要がある(colocated SVG が asset pipeline に渡る前にインライン化したい)。
 *   ユーザ指定プラグインは Astro 5 のデフォルトより前に実行されるので、現状の
 *   配置でその順序を満たしている。
 * - rehype-typst-safe は Typst で数式をビルド時に SVG にコンパイルする自前
 *   wrapper。compile 失敗時にもページ全体が壊れないようにフォールバックする。
 */
import type { AstroUserConfig } from "astro";
import remarkMath from "remark-math";
import { remarkInlineSvg } from "./remark-inline-svg";
import { rehypeTypstSafe } from "./rehype-typst";

export const markdownConfig: AstroUserConfig["markdown"] = {
  remarkPlugins: [remarkInlineSvg, remarkMath],
  rehypePlugins: [rehypeTypstSafe],
  shikiConfig: {
    themes: { light: "github-light", dark: "github-dark" },
    wrap: true,
  },
};
