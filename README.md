# kanade-k-1228.github.io

[HomePage](https://kanade-k-1228.github.io)

## 記事を書く

```
src: /article/<category>/<series>/<slug>/index.md
url: https://kanade-k-1228.github.io/<category>/<series>/<slug>/
```

単発記事の場合は `<series>` を `*` にする。urlの `<series>` はスキップされる。

画像や動画などの各種アセットは記事のディレクトリ内に配置する。
画像は `./img/` 以下に置く。画像のメタデータ（EXIF GPS 等）を剥がしたい場合：

```bash
pnpm image --write
```

記事を書いたら `article/<category>/index.yaml` の `articles:` に `<slug>` を追加する。追加しない場合は下書き状態でトップページには表示されない。パスを知っていたら直接アクセスして読める。

### プロパティ

記事の先頭にはyaml形式でプロパティを記述します：

```yaml
---
title: 記事タイトル
icon: 絵文字
abst: 概要文
date: YYYY-MM-DD
words: [キーワード]
---
```

本文は `##` から始める。`#` は書かない（`title` が H1 になる）

### 数式

Typst 記法で数式を記述できます。

インライン数式：

```
$sum_(i=1)^n i$
```

ブロック数式：

```
$$ integral_0^1 x^2 dif x $$
```

> `remark-math` + `lib/markdown/rehype-typst.ts`（自前 wrapper）で Typst を SSR コンパイルし SVG 画像化して埋め込みます。

### リンクカード

URL の OGP を取得してカード表示します。`remark-directive` の leaf block directive で書きます：

```
::card[https://example.com]
```

ビルド時に OGP を取得し `.cache/ogp.json` にキャッシュします（コミット対象）。失敗もキャッシュされるので再ビルド時に再 fetch しません。再取得したいときは該当エントリを削除してください。

## おしらせ・新着記事

- data/featured.yaml : トップページの新着記事
- news.yaml : トップページのおしらせ

## デプロイ

- PR が main にマージされると自動でデプロイします。
