import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { contentAssets } from "./src/lib/content-assets";
import { coverImages } from "./src/lib/cover-images";
import { markdownConfig } from "./src/lib/markdown/config";

export default defineConfig({
  site: "https://kanade-k-1228.github.io",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [mdx(), react(), sitemap(), contentAssets(), coverImages()],
  vite: { plugins: [tailwindcss()] },
  markdown: markdownConfig,
});
