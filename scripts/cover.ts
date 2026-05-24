import { promises as fs } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { SITE_DESCRIPTION, SITE_TITLE } from "../src/consts";
import { type CoverInputs, renderCoverPng } from "../src/lib/cover/render";
import { findArticleByRoute, type ScannedArticle, scanArticles } from "../src/lib/cover/scan-articles";

const main = async () => {
  const args = parseArgs(process.argv);
  const outRoot = resolve(args.outDir);

  const writeOne = async (route: string, inputs: CoverInputs) => {
    const png = await renderCoverPng(inputs);
    const rel = route === "/" ? "cover.png" : join(route.slice(1), "cover.png");
    const dest = join(outRoot, rel);
    await fs.mkdir(dirname(dest), { recursive: true });
    await fs.writeFile(dest, png);
    console.log(`✓ ${dest}`);
  };

  if (args.slug) {
    const article = await findArticleByRoute(args.slug);
    if (!article) {
      console.error(`No article found for ${args.slug}`);
      process.exit(1);
    }
    if (article.hasManualCover && !args.force) {
      console.log(`Skipped (manual cover): ${args.slug}`);
      return;
    }
    await writeOne(article.route, articleToInputs(article));
    return;
  }

  await writeOne("/", { title: SITE_TITLE, abst: SITE_DESCRIPTION });

  let generated = 0;
  let skipped = 0;
  for await (const article of scanArticles()) {
    if (article.hasManualCover && !args.force) {
      skipped++;
      continue;
    }
    await writeOne(article.route, articleToInputs(article));
    generated++;
  }
  console.log(`\nGenerated ${generated}, skipped ${skipped} with manual cover.`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

type Args = { outDir: string; slug?: string; force: boolean };

const parseArgs = (argv: string[]): Args => {
  const args: Args = { outDir: "dist/cover", force: false };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--out=")) args.outDir = a.slice("--out=".length);
    else if (a.startsWith("--slug=")) args.slug = a.slice("--slug=".length);
    else if (a === "--force") args.force = true;
    else if (a === "--help" || a === "-h") {
      console.log(
        [
          "Usage: pnpm cover [--out=dist/cover] [--slug=/com/foo/bar/] [--force]",
          "",
          "  --out=<dir>     output directory (default: dist/cover)",
          "  --slug=<route>  only generate this route (e.g. /com/relay-computer/day1-introduction/)",
          "  --force         regenerate even when a manual cover is set in frontmatter",
        ].join("\n"),
      );
      process.exit(0);
    } else {
      console.error(`Unknown argument: ${a}`);
      process.exit(1);
    }
  }
  return args;
};

const articleToInputs = (article: ScannedArticle): CoverInputs => ({
  title: article.frontmatter.title,
  abst: article.frontmatter.abst,
  date: article.frontmatter.date,
  category: article.category,
  series: article.series,
  icon: article.frontmatter.icon,
});
