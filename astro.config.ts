import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { contentAssets } from "./src/lib/content-assets";
import { markdownConfig } from "./src/lib/markdown/config";

export default defineConfig({
  site: "https://kanade-k-1228.github.io",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [mdx(), react(), tailwind({ applyBaseStyles: false }), sitemap(), contentAssets()],
  markdown: markdownConfig,
});
