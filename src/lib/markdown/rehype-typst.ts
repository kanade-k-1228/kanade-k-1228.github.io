// `@myriaddreamin/typst-ts-node-compiler` を直接ラップしている。upstream の
// `@myriaddreamin/rehype-typst` (v0.7.0-rc2) は 1 ブロックの compile 失敗で記事本文
// 全体を消してしまうため使えない。compile 失敗時は赤い `.typst-error` で表示する。
import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import type { Element, ElementContent, Parents, Root } from "hast";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toText } from "hast-util-to-text";
import { visitParents } from "unist-util-visit-parents";

export const rehypeTypstSafe = () => {
  return async (tree: Root): Promise<void> => {
    const matches: VisitorMatch[] = [];
    visitParents(tree, "element", (element, ancestors) => {
      matches.push({ element, parents: ancestors as Parents[] });
    });

    for (const { element, parents } of matches) {
      const classes = Array.isArray(element.properties?.className) ? element.properties.className : [];
      const languageMath = classes.includes("language-math");
      const mathDisplay = classes.includes("math-display");
      const mathInline = classes.includes("math-inline");
      if (!languageMath && !mathDisplay && !mathInline) continue;

      let scope: Element = element;
      let parent: Parents | undefined = parents[parents.length - 1];
      let displayMode = mathDisplay;

      if (element.tagName === "code" && languageMath && parent?.type === "element" && parent.tagName === "pre") {
        scope = parent;
        parent = parents[parents.length - 2];
        displayMode = true;
      }
      if (!parent || !("children" in parent)) continue;

      const source = toText(scope, { whitespace: "pre" }).trim();
      const rendered = tryRender(source, displayMode);

      const replacement: ElementContent[] =
        "error" in rendered ? [fallbackElement(source, displayMode)] : embedTypstSvg(rendered, displayMode);

      const idx = parent.children.indexOf(scope);
      if (idx === -1) continue;
      parent.children.splice(idx, 1, ...replacement);
    }
  };
};

interface VisitorMatch {
  element: Element;
  parents: Parents[];
}

interface RenderResult {
  svg: string;
  baselinePosition?: number;
}

const embedTypstSvg = (rendered: RenderResult, displayMode: boolean): ElementContent[] => {
  const root = fromHtmlIsomorphic(rendered.svg, { fragment: true }) as Root;
  const svgEl = root.children[0] as Element;
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
  // display:inline-block / block は styles/markdown.css 側で
  // .typst-inline / .typst-display に設定（Tailwind preflight の `svg { display: block }` を上書きする必要あり）。
  svgEl.properties.style = `vertical-align:-${shiftEm}em;`;
  const cls = Array.isArray(svgEl.properties.className) ? svgEl.properties.className : [];
  cls.push(displayMode ? "typst-display" : "typst-inline");
  svgEl.properties.className = cls;
  return root.children as ElementContent[];
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

// compile が失敗したら "unknown variable: X" を捕まえて、既知シンボル辞書で
// トークン分割（`alphabeta` → `alpha beta`）してリトライする。
const tryRender = (code: string, displayMode: boolean): RenderResult | { error: string } => {
  let source = preprocessSource(code);
  for (let attempt = 0; attempt < 40; attempt++) {
    const result = compileOnce(source, displayMode);
    if (!("error" in result)) return result;
    const m = /unknown variable:\s*([\p{L}\p{N}_]+)/u.exec(result.error);
    if (!m) return result;
    const id = m[1];
    const split = splitIdentifier(id);
    if (!split) return result;
    // Typst は letter run (Greek/Japanese を含む) をトークン化するので、`\p{L}` 境界で置換する。
    const re = new RegExp(`(?<!\\p{L})${id}(?!\\p{L})`, "gu");
    const next = source.replace(re, split);
    if (next === source) return result;
    source = next;
  }
  return { error: "typst auto-fix exceeded retry budget" };
};

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

let compilerSingleton: NodeCompiler | undefined;
const compiler = (): NodeCompiler => {
  if (!compilerSingleton) compilerSingleton = NodeCompiler.create();
  return compilerSingleton;
};

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

// LaTeX 由来の残骸 (`\newcommand{…}` や `begin{aligned}…end{aligned}` など) の保険。
// `.alt` 直後に letter が来るユーザの typo (`epsilon.altchi`) も補正する。
const preprocessSource = (source: string): string => {
  let s = source;
  s = s.replace(/^[ \t]*newcommand.*$/gm, "");
  s = s.replace(/begin\s*\{(\w+)\}[\s\S]*?end\s*\{\1\}/g, "");
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

// auto-fix で個別の文字に分解してはいけない、ネイティブ Typst の識別子。
const KNOWN_SYMBOLS: ReadonlySet<string> = new Set([
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
  "RR",
  "NN",
  "ZZ",
  "QQ",
  "CC",
  "HH",
  "SS",
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
  // `oo` (infinity の Typst ショートカット) は 2 文字なので splitter から保護する。
  "oo",
]);
