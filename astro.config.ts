import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { contentAssets } from "./src/lib/content-assets";
import { markdownConfig } from "./src/lib/markdown/config";

export default defineConfig({
  site: "https://kanade-k-1228.github.io",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), react(), sitemap(), contentAssets()],
  // @ts-expect-error — @tailwindcss/vite ships Vite 7 types; Astro 5 still uses Vite 6
  vite: { plugins: [tailwindcss()] },
  markdown: markdownConfig,
});
