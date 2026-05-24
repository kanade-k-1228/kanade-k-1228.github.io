// `::card[https://...]` leaf directive を OGP リンクカードに展開する。
// 取得結果は `.cache/ogp.json` に永続化 (コミット対象) し、失敗もキャッシュする。
// 再取得したい時は該当エントリをキャッシュから削除する。
import { promises as fs } from "node:fs";
import { dirname } from "node:path";
import type { Element, Root as HastRoot, Text as HastText } from "hast";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import type { LeafDirective } from "mdast-util-directive";
import type { Html, Root } from "mdast";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { LinkCard, type LinkCardData } from "../../components/LinkCard";

export const remarkLinkCard = () => {
  return async (tree: Root, file: VFile): Promise<void> => {
    const targets: Target[] = [];
    visit(tree, "leafDirective", (node, index, parent) => {
      if (typeof index !== "number" || !parent) return;
      if (node.name !== DIRECTIVE_NAME) return;
      const url = extractUrl(node);
      if (!url) {
        file.message(`::${DIRECTIVE_NAME}[...] には有効な http(s) URL を指定してください`, node);
        return;
      }
      targets.push({ index, parent: parent as { children: unknown[] }, url });
    });
    if (targets.length === 0) return;

    const fetched = await Promise.all(targets.map(async (t) => ({ ...t, ogp: await fetchOgp(t.url) })));

    for (const { parent, index, url, ogp } of fetched.sort((a, b) => b.index - a.index)) {
      const html: Html = {
        type: "html",
        value: renderToStaticMarkup(createElement(LinkCard, { url, data: ogp })),
      };
      parent.children[index] = html;
    }
  };
};

interface Target {
  index: number;
  parent: { children: unknown[] };
  url: string;
}

const DIRECTIVE_NAME = "card";
const URL_PATTERN = /^https?:\/\/\S+$/;

const extractUrl = (node: LeafDirective): string | null => {
  // 属性 `{url=...}` がラベルより優先。
  const attr = node.attributes?.url;
  if (typeof attr === "string" && URL_PATTERN.test(attr)) return attr;

  // ラベルは CommonMark autolink で link ノードに変換されることがある。
  if (node.children.length !== 1) return null;
  const child = node.children[0];
  if (child.type === "link" && URL_PATTERN.test(child.url)) return child.url;
  if (child.type === "text") {
    const value = child.value.trim();
    if (URL_PATTERN.test(value)) return value;
  }
  return null;
};

interface CachedOgp extends LinkCardData {
  fetchedAt: string;
}

interface CacheError {
  error: string;
  fetchedAt: string;
}

type CacheEntry = CachedOgp | CacheError;

interface CacheFile {
  version: 1;
  entries: Record<string, CacheEntry>;
}

const CACHE_PATH = ".cache/ogp.json";
const FETCH_TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

let cachePromise: Promise<CacheFile> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

const fetchOgp = async (url: string): Promise<LinkCardData | null> => {
  const cache = await loadCache();
  const cached = cache.entries[url];
  if (cached) return "title" in cached ? cached : null;

  let entry: CacheEntry;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "ja,en;q=0.8",
      },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("html")) throw new Error(`not html: ${ct || "unknown"}`);
    const html = await res.text();
    entry = parseOgp(html, res.url || url);
  } catch (err) {
    entry = {
      error: err instanceof Error ? err.message : String(err),
      fetchedAt: new Date().toISOString(),
    };
  }

  cache.entries[url] = entry;
  await persistCache(cache);
  return "title" in entry ? entry : null;
};

const loadCache = (): Promise<CacheFile> => {
  if (cachePromise) return cachePromise;
  cachePromise = (async () => {
    try {
      const raw = await fs.readFile(CACHE_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (parsed?.version === 1 && parsed.entries && typeof parsed.entries === "object") {
        return parsed as CacheFile;
      }
    } catch {}
    return { version: 1, entries: {} };
  })();
  return cachePromise;
};

const persistCache = (cache: CacheFile): Promise<void> => {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(dirname(CACHE_PATH), { recursive: true });
    await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`);
  });
  return writeQueue;
};

const parseOgp = (html: string, sourceUrl: string): CachedOgp => {
  // HEAD だけ抜く。body の壊れた HTML を hast に流すと例外が出ることがある。
  const headEnd = html.toLowerCase().indexOf("</head>");
  const headHtml = headEnd >= 0 ? `${html.slice(0, headEnd + 7)}</html>` : html;
  const tree = fromHtmlIsomorphic(headHtml, { fragment: false }) as HastRoot;

  const metas: Record<string, string> = {};
  let titleText = "";
  let faviconHref: string | undefined;

  visit(tree, "element", (node: Element) => {
    if (node.tagName === "meta") {
      const property = stringProp(node, "property") ?? stringProp(node, "name");
      const content = stringProp(node, "content");
      if (property && content) {
        const key = property.toLowerCase();
        if (!metas[key]) metas[key] = content;
      }
    } else if (node.tagName === "title" && !titleText) {
      const first = node.children?.[0];
      if (first && first.type === "text") titleText = (first as HastText).value;
    } else if (node.tagName === "link") {
      const rel = node.properties?.rel;
      const href = stringProp(node, "href");
      if (!href || faviconHref) return;
      const rels = Array.isArray(rel) ? rel.map(String) : typeof rel === "string" ? [rel] : [];
      if (rels.some((r) => /(^|\s)(icon|shortcut)($|\s)/i.test(r))) faviconHref = href;
    }
  });

  const resolveUrl = (u: string | undefined): string | undefined => {
    if (!u) return undefined;
    try {
      return new URL(u, sourceUrl).toString();
    } catch {
      return undefined;
    }
  };

  return {
    url: sourceUrl,
    title: metas["og:title"] ?? metas["twitter:title"] ?? titleText.trim() ?? sourceUrl,
    description: metas["og:description"] ?? metas["twitter:description"] ?? metas.description,
    image: resolveUrl(metas["og:image"] ?? metas["twitter:image"]),
    siteName: metas["og:site_name"],
    favicon: resolveUrl(faviconHref) ?? resolveUrl("/favicon.ico"),
    fetchedAt: new Date().toISOString(),
  };
};

const stringProp = (node: Element, name: string): string | undefined => {
  const v = node.properties?.[name];
  return typeof v === "string" ? v : undefined;
};
