/**
 * Rehype plugin: render `$...$` / `$$...$$` math nodes (produced by remark-math)
 * as Typst-compiled SVG. Wraps `@myriaddreamin/typst-ts-node-compiler` directly
 * so we can control error handling — upstream `@myriaddreamin/rehype-typst`
 * (v0.7.0-rc2) wipes the entire article body when a single math block fails
 * to compile.
 *
 * On compile failure, the math source is rendered as a red `<span class=
 * "typst-error">` so it's visible but doesn't break the rest of the page.
 * Math source is expected to be pure Typst — content was migrated by
 * scripts/migrate-math.ts.
 *
 * Detects elements with one of these classes (set by remark-math /
 * markdown-remark): `math-inline`, `math-display`, `language-math`.
 */
import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toText } from "hast-util-to-text";
import type { ElementContent, Root } from "hast";
import { visitParents } from "unist-util-visit-parents";

// Math sources are pure Typst — no LaTeX-compat preamble needed. Content was
// migrated by scripts/migrate-math.ts.
const inlineMathTemplate = (code: string): string => `
#set page(height: auto, width: auto, margin: 0pt)
#let s = state("t", (:))
#let pin(t) = context {
  let width = measure(line(length: here().position().y)).width
  s.update(it => it.insert(t, width) + it)
}
#show math.equation: it => {
  box(it, inset: (top: 0.5em, bottom: 0.5em))
}
$pin("l1")${code}$
#context [
  #metadata(s.final().at("l1")) <label>
]
`;

const displayMathTemplate = (code: string): string => `
#set page(height: auto, width: auto, margin: 0pt)
$ ${code} $
`;

// Known Typst math identifiers — multi-letter names that should NOT be split
// into letters by the auto-fix. These are all native Typst, not LaTeX shims.
const KNOWN_SYMBOLS: ReadonlySet<string> = new Set([
  // Greek lowercase
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "iota",
  "kappa",
  "lambda",
  "mu",
  "nu",
  "xi",
  "omicron",
  "pi",
  "rho",
  "sigma",
  "tau",
  "upsilon",
  "phi",
  "chi",
  "psi",
  "omega",
  // Greek uppercase
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  // Math functions (operator names — Typst built-ins)
  "sin",
  "cos",
  "tan",
  "sec",
  "csc",
  "cot",
  "sinh",
  "cosh",
  "tanh",
  "asin",
  "acos",
  "atan",
  "log",
  "ln",
  "exp",
  "lim",
  "sup",
  "inf",
  "min",
  "max",
  "det",
  "dim",
  "gcd",
  "lcm",
  "mod",
  "arg",
  "ker",
  "Im",
  "Re",
  "tr",
  "sgn",
  "Tr",
  "Var",
  "Cov",
  "Pr",
  // Symbols / set-relations
  "ell",
  "partial",
  "nabla",
  "infinity",
  "emptyset",
  "nothing",
  "in",
  "subset",
  "supset",
  "cup",
  "cap",
  "forall",
  "exists",
  "mapsto",
  "times",
  "div",
  "sim",
  "cong",
  "propto",
  "perp",
  "parallel",
  "prec",
  "succ",
  "approx",
  "equiv",
  "dif",
  "planck",
  "compose",
  // Number sets
  "RR",
  "NN",
  "ZZ",
  "QQ",
  "CC",
  "HH",
  "SS",
  // Style/accent functions
  "cal",
  "frak",
  "bb",
  "mono",
  "bold",
  "upright",
  "italic",
  "sans",
  "hat",
  "tilde",
  "bar",
  "dot",
  "ddot",
  "vec",
  "underline",
  "overline",
  "macron",
  "breve",
  "check",
  "grave",
  "acute",
  "circle",
  "arrow",
  // Big operators / structures
  "sum",
  "prod",
  "integral",
  "iint",
  "iiint",
  "lr",
  "space",
  "quad",
  "sqrt",
  "root",
  "mat",
  "cases",
  "attach",
  "abs",
  "norm",
  "floor",
  "ceil",
  "text",
  "op",
  "square",
  // Typst's `oo` shortcut for infinity (two-letter, otherwise the splitter
  // breaks it). `and`/`or` are keywords so don't need protection.
  "oo",
]);

// Minimal safety net for LaTeX detritus that scripts/migrate-math.ts can't
// reasonably rewrite into pure Typst (e.g. a stray `\newcommand{…}` or
// `begin{aligned}…end{aligned}` block left over from a copy-paste).
const preprocessSource = (source: string): string => {
  let s = source;
  s = s.replace(/^[ \t]*newcommand.*$/gm, "");
  s = s.replace(/begin\s*\{(\w+)\}[\s\S]*?end\s*\{\1\}/g, "");
  // Insert a space after `.alt` when followed directly by another letter — a
  // common typo where the user merged the next token (`epsilon.altchi`).
  s = s.replace(/\.alt(\p{L})/gu, ".alt $1");
  return s;
};

const splitIdentifier = (name: string): string | null => {
  if (name.length <= 1 || KNOWN_SYMBOLS.has(name)) return null;
  const parts: string[] = [];
  let i = 0;
  while (i < name.length) {
    let matched = "";
    for (let j = Math.min(name.length, i + 12); j > i + 1; j--) {
      const slice = name.slice(i, j);
      if (KNOWN_SYMBOLS.has(slice)) {
        matched = slice;
        break;
      }
    }
    if (matched) {
      parts.push(matched);
      i += matched.length;
    } else {
      parts.push(name[i]);
      i++;
    }
  }
  if (parts.length <= 1) return null;
  return parts.join(" ");
};

let compilerSingleton: NodeCompiler | undefined;

const compiler = (): NodeCompiler => {
  if (!compilerSingleton) compilerSingleton = NodeCompiler.create();
  return compilerSingleton;
};

interface RenderResult {
  svg: string;
  baselinePosition?: number;
}

const compileOnce = (code: string, displayMode: boolean): RenderResult | { error: string } => {
  const $typst = compiler();
  const mainFileContent = displayMode ? displayMathTemplate(code) : inlineMathTemplate(code);
  const docRes = $typst.compile({ mainFileContent });
  if (!docRes.result) {
    const taken = docRes.takeDiagnostics();
    const diags = taken ? $typst.fetchDiagnostics(taken) : [];
    const message = diags.map((d) => (d as { message?: string }).message ?? String(d)).join("; ");
    return { error: message || "typst compile failed" };
  }
  const doc = docRes.result;
  const svg = $typst.svg(doc);
  const out: RenderResult = { svg };
  if (!displayMode) {
    try {
      const q = $typst.query(doc, { selector: "<label>" });
      const v = (q[0] as { value: string }).value;
      out.baselinePosition = parseFloat(v.slice(0, -2));
    } catch {
      /* best-effort baseline */
    }
  }
  $typst.evictCache(10);
  return out;
};

const tryRender = (code: string, displayMode: boolean): RenderResult | { error: string } => {
  let source = preprocessSource(code);
  // Iteratively recover from "unknown variable: X" errors by splitting multi-letter
  // identifiers using a Typst-known-name dictionary. Bounded retries to avoid loops.
  for (let attempt = 0; attempt < 40; attempt++) {
    const result = compileOnce(source, displayMode);
    if (!("error" in result)) return result;
    const m = /unknown variable:\s*([\p{L}\p{N}_]+)/u.exec(result.error);
    if (!m) return result;
    const id = m[1];
    const split = splitIdentifier(id);
    if (!split) return result;
    // Use Unicode letter boundaries: Typst tokenizes letter runs (including Greek/Japanese).
    const re = new RegExp(`(?<!\\p{L})${id}(?!\\p{L})`, "gu");
    const next = source.replace(re, split);
    if (next === source) return result;
    source = next;
  }
  return { error: "typst auto-fix exceeded retry budget" };
};

const fallbackElement = (value: string, displayMode: boolean): ElementContent => ({
  type: "element",
  tagName: displayMode ? "div" : "span",
  properties: {
    className: ["typst-error"],
    style: "color:#cc0000;font-family:monospace;",
    title: "Typst compile failed — needs migration to Typst math syntax",
  },
  children: [{ type: "text", value }],
});

interface VisitorMatch {
  element: import("hast").Element;
  parents: import("hast").Parents[];
}

export const rehypeTypstSafe = () => {
  return async (tree: Root): Promise<void> => {
    const matches: VisitorMatch[] = [];
    visitParents(tree, "element", (element, ancestors) => {
      matches.push({ element, parents: ancestors as import("hast").Parents[] });
    });

    for (const { element, parents } of matches) {
      const classes = Array.isArray(element.properties?.className) ? element.properties.className : [];
      const languageMath = classes.includes("language-math");
      const mathDisplay = classes.includes("math-display");
      const mathInline = classes.includes("math-inline");
      if (!languageMath && !mathDisplay && !mathInline) continue;

      let scope: import("hast").Element = element;
      let parent: import("hast").Parents | undefined = parents[parents.length - 1];
      let displayMode = mathDisplay;

      // ```math fenced code blocks come wrapped in <pre><code>
      if (element.tagName === "code" && languageMath && parent?.type === "element" && parent.tagName === "pre") {
        scope = parent;
        parent = parents[parents.length - 2];
        displayMode = true;
      }
      if (!parent || !("children" in parent)) continue;

      const source = toText(scope, { whitespace: "pre" }).trim();
      const rendered = tryRender(source, displayMode);

      let replacement: ElementContent[];
      if ("error" in rendered) {
        replacement = [fallbackElement(source, displayMode)];
      } else {
        const root = fromHtmlIsomorphic(rendered.svg, { fragment: true }) as Root;
        const svgEl = root.children[0] as import("hast").Element;
        const defaultEm = 11;
        const heightStr = (svgEl.properties?.dataHeight ?? "0") as string;
        const widthStr = (svgEl.properties?.dataWidth ?? "0") as string;
        const height = parseFloat(heightStr);
        const width = parseFloat(widthStr);
        const baseline = rendered.baselinePosition ?? height;
        const shift = height - baseline;
        const shiftEm = shift / defaultEm;
        if (!svgEl.properties) svgEl.properties = {};
        svgEl.properties.height = `${height / defaultEm}em`;
        svgEl.properties.width = `${width / defaultEm}em`;
        // display:inline-block / block is set via CSS in styles/markdown.css
        // using .typst-inline / .typst-display classes (with enough specificity
        // to override Tailwind preflight's `svg { display: block }`).
        svgEl.properties.style = `vertical-align:-${shiftEm}em;`;
        const cls = Array.isArray(svgEl.properties.className) ? svgEl.properties.className : [];
        if (!displayMode) cls.push("typst-inline");
        else cls.push("typst-display");
        svgEl.properties.className = cls;
        replacement = root.children as ElementContent[];
      }

      const idx = parent.children.indexOf(scope);
      if (idx === -1) continue;
      parent.children.splice(idx, 1, ...replacement);
    }
  };
};
