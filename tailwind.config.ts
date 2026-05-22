import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss/types/config";
import { typographyConfig } from "./src/styles/typography";

const config: Config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        // Loaded from Google Fonts in BaseLayout.astro.
        sans: ['"Noto Sans JP"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"Roboto Mono"', "SFMono-Regular", "Consolas", "Menlo", "monospace"],
      },
      typography: () => typographyConfig,
    },
  },
  plugins: [typography],
};

export default config;
