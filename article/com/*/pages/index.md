---
title: 簡単なブログサイトの作り方
icon: memo
date: 2026-05-24
abst: 混沌とした令和のインターネットを生き延びろ！
---

このサイトは Astro で SSG したものを GitHub Pages に置いているだけのシンプルな構成です。それでいて、Typst による数式組版・OGP リンクカード・記事ディレクトリへのアセットコロケート・OG 画像の自動生成といった「自分が欲しい機能」は全部入っています。本記事ではその構成と工夫を紹介します。

## 全体像

```
kanade-k-1228.github.io/
├ article/             # 記事本体（Content Collection）
│  └ <category>/<series>/<slug>/index.md
├ src/
│  ├ components/       # Header / Toc / LinkCard など
│  ├ lib/
│  │  ├ markdown/      # remark / rehype プラグイン
│  │  ├ cover/         # OG 画像レンダラ
│  │  └ articles/      # コレクション操作のヘルパ
│  └ pages/            # ルーティング
├ public/              # favicon などサイト共通の静的資産
├ astro.config.ts
└ .github/workflows/deploy.yml
```

ベースは [Astro](https://astro.build/) で、UI 部品の一部だけ React（`@astrojs/react`）、スタイルは Tailwind CSS v4 です。Markdown は Astro 標準の Content Collection で読み込み、自前の remark / rehype プラグインで拡張しています。

::card[https://astro.build/]

## 記事を書く

記事は `article/<category>/<series>/<slug>/index.md` に置きます。単発記事の場合は `<series>` を `*` にすると URL からスキップされます。

```yaml
---
title: 記事タイトル
icon: memo        # node-emoji 名 or 絵文字
abst: 概要文
date: 2026-05-24
words: [keyword]  # 任意
---
```

スキーマは `src/content.config.ts` で Zod で定義しているので、frontmatter が壊れているとビルド時に怒られます。本文は `##` から書き始めます（`#` を使うと H1 が二重になる）。

書いた記事を一覧に出すには `article/<category>/index.yaml` の `items:` に slug を追加します。**逆に言うと、追加しなければトップに出ない**ので、URL を知っている人だけが読める下書き状態として使えます。

```yaml
"*":
  name: その他
  icon: file_folder
  items:
    - pages
    - claude-farm
```

## アセットは記事と一緒に置く

画像・SVG・PDF・動画などのアセットは原則すべて記事ディレクトリ内に置きます。テキストと図が同じフォルダにある方が編集体験が良い、というだけのことですが、種別ごとに少しずつ仕組みが違います。

| 種別 | 置き場所 | 参照 | 配信 |
|---|---|---|---|
| JPG / PNG / WebP | `./img/*` | `![alt](./img/foo.jpg)` | `astro:assets` が最適化して `/_astro/...` |
| SVG | `./img/*` | `![alt](./img/foo.svg)` | `remark-inline-svg` が HTML へインライン展開 |
| PDF / MP4 / ZIP 等 | `./doc/*` 等 | `[label](./doc/foo.pdf)` | `content-assets` integration が同 URL で配信 |

SVG をインライン展開しているのは、Astro 標準の `astro:assets` パイプラインが draw.io 由来の SVG で `NoImageMetadata` を出して落ちることがあるためです。`src/lib/markdown/remark-inline-svg.ts` で先回りして `<figure class="inline-svg">…</figure>` に展開し、後段の `remark-collect-images` から見えないようにしています。

PDF や MP4 のような「Astro のアセットパイプラインには載らないが配信したい」ファイルは、`src/lib/content-assets.ts` の Astro integration が面倒を見ます。dev では middleware で記事ディレクトリから直接 serve、build では `dist/` の同じパスにコピー。新しい拡張子を扱いたくなったら `ASSET_EXTS` と `MIME` に足すだけです。

## Markdown 拡張

### Typst で数式

数式は LaTeX ではなく [Typst](https://typst.app/) の記法で書きます。

```
インライン: $sum_(i=1)^n i$
ブロック:   $$ integral_0^1 x^2 dif x $$
```

これは `remark-math` で数式ノードを切り出したあと、`src/lib/markdown/rehype-typst.ts` で Typst にコンパイルし、SVG として埋め込んでいます。`@myriaddreamin/rehype-typst` 本家もありますが、1 ブロックの compile 失敗で記事全体が消えてしまう挙動だったので自前ラッパに置き換えています。失敗したブロックだけ赤い `.typst-error` で表示するようにしました。

::card[https://typst.app/]

### リンクカード

URL から OGP を取って LinkCard にする仕組みは、`remark-directive` の leaf block directive で書きます。

```
::card[https://example.com]
```

ビルド時に OGP を fetch し、`.cache/ogp.json` に永続化（コミット対象）します。**失敗もキャッシュ**するので、リンク切れサイトが毎ビルドのたびに足を引っ張ることはありません。逆に「もう一回取り直したい」ときはキャッシュから該当エントリを消します。

## OG 画像（cover）を自動生成

各記事の OG 画像は事前に用意しません。`src/lib/cover-images.ts` の Astro integration が、build 時に全記事を走査して `/cover/<slug>/cover.png` を生成します。dev サーバ上でも同じ URL の middleware が走るので、表示確認はリアルタイムです。

レンダラは `src/lib/cover/render.ts` にあって、タイトル・概要・カテゴリ・アイコン絵文字を流し込んで png を吐きます。記事側で何もしなくても OGP がそれっぽくなるので、SNS に貼る心理的ハードルが下がります。

## TypeScript で書く

設定ファイルもスクリプトも全部 TypeScript です（`astro.config.ts`, `scripts/*.ts`）。CLI スクリプトは `tsx` 経由で動かしています。

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "image": "tsx scripts/image.ts",
    "cover": "tsx scripts/cover.ts"
  }
}
```

`scripts/image.ts` は画像の EXIF（GPS とか）を剥がすやつ、`scripts/cover.ts` はローカルで OG 画像をプレビューするためのものです。

## デプロイ

`main` への push で GitHub Actions が走り、GitHub Pages に流し込まれます。`.github/workflows/deploy.yml` は素直な構成です。

```yaml
- uses: pnpm/action-setup@v4
- uses: actions/setup-node@v4
  with:
    node-version-file: .nvmrc
    cache: pnpm
- run: pnpm install --frozen-lockfile
- run: pnpm build
- uses: actions/upload-pages-artifact@v3
  with: { path: ./dist }
- uses: actions/deploy-pages@v4
```

PR の段階では deploy ジョブはスキップして build のみ走るので、レビューの前段で「ちゃんとビルド通るか」だけは確認できます。Cloudflare Pages でも同じ `dist/` を上げれば動きますが、いまは GitHub Pages 一本です。

## まとめ

- 記事は `article/<cat>/<series>/<slug>/index.md`、アセットは同じディレクトリにまとめて置く
- 数式は Typst、リンクは `::card[...]`、画像 SVG はインライン展開
- OG 画像は build 時に自動生成
- デプロイは GitHub Actions → GitHub Pages

「シンプルなサイトジェネレータ + ちょっとした自前プラグイン」という構成は、ロックインも少なく書き味も自由で気に入っています。
