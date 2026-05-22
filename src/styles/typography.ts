/**
 * @tailwindcss/typography の DEFAULT / invert 設定。
 * tailwind.config.ts から呼び出される。色は Tailwind 標準パレットから引いている。
 */
import colors from "tailwindcss/colors";

export const typographyConfig = {
  DEFAULT: {
    css: {
      color: colors.neutral[900],
      maxWidth: "none",
      a: { color: colors.sky[700] },
      h1: {
        backgroundColor: colors.fuchsia[200],
        color: colors.fuchsia[800],
        padding: "0.4em 0.6em",
        borderRadius: "0.25rem",
      },
      h2: {
        backgroundColor: colors.sky[200],
        color: colors.sky[800],
        padding: "0.4em 0.6em",
        borderRadius: "0.25rem",
      },
      h3: { color: colors.neutral[900] },
      h4: { color: colors.neutral[900] },
      thead: { backgroundColor: colors.lime[100] },
      "thead th": {
        backgroundColor: colors.lime[100],
        color: colors.neutral[900],
        textAlign: "center",
      },
      "tbody td": {
        backgroundColor: colors.indigo[50],
        textAlign: "center",
      },
      "tbody tr": { borderBottomColor: "rgba(0,0,0,0.15)" },
      table: { borderCollapse: "collapse" },
      "th, td": { border: "1px solid rgba(0,0,0,0.2)", padding: "0.3em" },
      code: {
        backgroundColor: "hsla(210, 13%, 72%, 0.2)",
        padding: "1px 4px",
        borderRadius: "5px",
        fontWeight: "400",
      },
      "code::before": { content: '""' },
      "code::after": { content: '""' },
      blockquote: {
        backgroundColor: colors.white,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: "2px",
        padding: "0.5em 1em",
        fontStyle: "normal",
        fontWeight: "400",
        color: colors.neutral[900],
        quotes: "none",
      },
      "blockquote p:first-of-type::before": { content: "none" },
      "blockquote p:last-of-type::after": { content: "none" },
      pre: { borderRadius: "0.375rem" },
      ".katex-display": { overflowX: "auto", overflowY: "hidden" },
      "figure.inline-svg": { margin: "1em auto", textAlign: "center" },
      "figure.inline-svg svg": {
        display: "inline-block",
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
  invert: {
    css: {
      color: colors.zinc[100],
      a: { color: colors.sky[400] },
      h1: {
        backgroundColor: colors.fuchsia[950],
        color: colors.fuchsia[200],
      },
      h2: {
        backgroundColor: colors.sky[950],
        color: colors.sky[200],
      },
      h3: { color: colors.zinc[50] },
      h4: { color: colors.zinc[50] },
      thead: { backgroundColor: colors.zinc[800] },
      "thead th": {
        backgroundColor: colors.zinc[800],
        color: colors.zinc[100],
      },
      "tbody td": {
        backgroundColor: "transparent",
        color: colors.zinc[100],
      },
      "tbody tr": { borderBottomColor: colors.zinc[700] },
      "th, td": { borderColor: colors.zinc[700] },
      blockquote: {
        backgroundColor: colors.zinc[800],
        border: `1px solid ${colors.zinc[700]}`,
        color: colors.zinc[100],
      },
      code: {
        backgroundColor: colors.zinc[800],
        color: colors.zinc[100],
      },
    },
  },
};
