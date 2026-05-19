# kanade-k-1228.github.io

[HomePage](https://kanade-k-1228.github.io)

## 開発

```bash
pnpm i
pnpm dev      # http://localhost:4321
pnpm build    # 静的サイトを dist/ に生成
pnpm check    # astro check で型チェック
pnpm format   # Prettier
```

Node.js 20.18+ / pnpm 11+ を想定。

## 記事を書く

`article/<category>/<series>/<slug>/index.md`
- `<category>` : カテゴリです。
- `<series>` : 一連のシリーズを示します。`*` の場合はカテゴリ直下に配置されます。
- `<slug>` : 記事のIDです

記事を書いたらindexファイルに追加します。

- `article/index.yaml` : カテゴリの一覧表 `Record<category:string, name:string>` 
- `article/<category>/index.yaml` : カテゴリ内記事の一覧 `Record<category:string, {name:string, articles:string[]}>`

コンパイラはこのindexをたどってトップページを作成します。
逆にindexに追加していない記事はトップページに表示されません。

記事の先頭にはyaml形式でプロパティを記述します：

```yaml
---
title: 記事タイトル # 必須
date: 2024-01-15 # 任意 (新着順に効く)
abst: 一行説明 # 任意 (OGP 用)
keywords: [tag1, tag2] # 任意
ogp: ./img/cover.png # 任意 (colocated 画像も可)
toc: true # 既定 true
draft: true # 任意。dev では見える / production では除外
---
```

### 画像

記事のディレクトリ以下に配置します

- ベクタ画像 (`.svg`) : ビルド時に `<figure>` としてインライン化（`lib/markdown/remark-inline-svg.ts`） 
- ラスタ画像 (`.png`/ `.jpg`, `.webp`) : Markdown 内 `![](path)` で参照しAstro が最適化
- その他 : `lib/content-assets.ts` が dist へコピーするので相対パスで参照できる

画像のメタデータ（EXIF GPS 等）を剥がしたい場合:

```bash
pnpm image --write
```

### 数式

`remark-math` + `lib/markdown/rehype-typst.ts`（自前 wrapper）で Typst を SSR コンパイル → SVG。
クライアント JS 不要。

```markdown
インライン: $sum_(i=1)^n i$ または ブロック: $$ integral_0^1 x^2 dif x $$
```

構文は Typst の math syntax（`a/b`, `sum_(i=1)^n`, `dot(x)` 等）。

コンパイル失敗時は赤字で source が表示されるだけで、ページ全体は壊れない。

## ディレクトリ構成

```
article/                  記事本体 (top/[sub/]<slug>/index.md)
data/                     サイト共通データ (YAML)
├── categories.yaml       auto-index のカテゴリ → ラベル
├── featured.yaml         トップページの新着記事 (手書き)
└── news.yaml             トップページのお知らせ
public/                   静的アセット (favicon 等)
scripts/                  ビルド外の運用スクリプト (image 等)
src/
├── components/           React UI コンポーネント
├── content.config.ts     content collection スキーマ
├── lib/                  ロジック
│   ├── articles/         記事ドメイン (collections, categories, featured, index-tree)
│   ├── markdown/         MD パイプライン (config, remark/rehype プラグイン)
│   ├── content-assets.ts colocated 非画像アセットの dev/build 配信
│   ├── format-date.ts    表示用日付フォーマット
│   └── news.ts           data/news.yaml 読み込み
├── pages/                ルーティング
└── styles/               global.css, typography
```
