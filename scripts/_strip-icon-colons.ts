import { promises as fs } from "node:fs";
import { join } from "node:path";

const ROOT = "article";

const walk = async function* (dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && (p.endsWith("index.md") || p.endsWith("index.mdx"))) yield p;
  }
};

let changed = 0;
for await (const path of walk(ROOT)) {
  const src = await fs.readFile(path, "utf8");
  const m = /^icon: *"?:([\w+-]+):"?$/m.exec(src);
  if (!m) continue;
  const next = src.replace(/^icon: *"?:([\w+-]+):"?$/m, `icon: ${m[1]}`);
  if (next === src) continue;
  await fs.writeFile(path, next);
  changed++;
}
console.log(`changed: ${changed}`);
