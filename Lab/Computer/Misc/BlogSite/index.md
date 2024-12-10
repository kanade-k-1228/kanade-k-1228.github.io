---
title: GitHubを使ったブログサイトの作り方
date: 2023-07-05
ogp: Lab/Computer/Misc/BlogSite
description: Twitterが終わった今こそ、各々がWebサイトを持っていた昔のインターネットに回帰しよう。
---

自由度が高く保守性も高いブログシステム（このサイト）が無料で簡単に作れちゃいます。

## Pandoc

Pandocはいろんな種類の文書を変換してくれるツールです。
今回は Markdown → HTML の変換をさせます。

### コマンドの使い方

Pandocはaptでインストールできます。

```
sudo apt update
sudo apt -y install pandoc
```

変換コマンドは、以下の通りです。

```
pandoc -f markdown -t html --template=template.html --toc --no-highlight --mathjax test.md >> test.html
```

`-f` で入力フォーマットを、`-t` で出力フォーマットを指定します。
このコマンドでは、入力形式にmarkdownを、出力形式にhtmlを指定しています。

`--template=` でテンプレートのHTMLを渡します。

`--toc` は目次を生成するオプションです。

`--no-highlight`と`--mathjax`については後述します。

最後に、変換するファイル `test.md` を渡してやります。

標準出力に出た変換結果をリダイレクトしてファイル `test.html` に保存します。

本サイトでは、以下のコマンドで変換をしています。

```
find . -name "*index.md" | while read i; do pandoc -f markdown -t html --template=.common/template.html --toc --no-highlight --mathjax "${i}" >> "${i%.md}.html"; done
```

`index.md` という名前のファイルを全て探索し、`index.html` というファイルに変換しています。

### テンプレートと変数

Pandocは、markdownの中身を読み取り、HTMLに変換し、
テンプレート中の `$body$` に流し込みます。

また、メタデータは、Pandoc変数を使ってテンプレートに書き込みます。

Markdown の先頭に `---` で囲まれた yaml でメタデータを書くと、Pandoc変数に代入されます。

以下に例を示します。
Markdownの先頭に、

```yaml
---
title: たいとる
date: 2000-00-00
description: せつめい
---
```

と書き、テンプレート中に、

```html
$if(date)$
<meta name="dcterms.date" content="$date$" />
$endif$ $if(keywords)$
<meta name="keywords" content="$for(keywords)$$keywords$$sep$, $endfor$" />
$endif$ $if(description)$
<meta name="description" content="$description$" />
$endif$
<title>$if(title)$$title$$endif$ | Kanade's Website</title>
```

と書いておくと、`$title$`が、`たいとる` に置換されて書き込まれます。

また、上の例の`$keywords$`のように、if文を使って出力を制御することもできます。
この場合では、`keywords`変数が空なので、
`$if(keywords)$`~`$endif$`で囲まれた部分は出力されません。

詳細はドキュメント：[Pandoc User’s Guide 日本語版](https://pandoc-doc-ja.readthedocs.io/ja/latest/users-guide.html)を見てください。

本サイトのテンプレートは、[https://kanade-k-1228.github.io/.common/template.html](https://kanade-k-1228.github.io/.common/template.html)にあります。

## GitHub

### GitHub Pages

GitHub で静的サイトをホスティングできるサービスです。
単に html ファイルを置いておくだけのサイトなら作れます。
サーバーで処理が必要な機能（コメント、アクセスカウントなど）は、GitHub Pagesだけでは作れません。
（別途自分でサーバー建てればできます。）

1. [User Name].github.io という名前のリポジトリを作る。
2. リポジトリの Settings > Pages > Source を None から Main に変更。Main ブランチ以下が https://[UserName].github.io/ に公開されます。

### GitHub Actions

GitHub Actionsでは、様々な処理をGitHubのサーバー上で行うことができます。

本サイトでは、Pandocによる Markdown → HTML 変換を、GitHub Actioinsで実行しています。

Actionsの設定は、リポジトリの `.github/workflows` 以下に記述します。

本サイトのActioinsの[ソースコード](https://github.com/kanade-k-1228/kanade-k-1228.github.io/blob/main/.github/workflows/main.yml)です。

```yml:
name: Convert and Deploy

# main にプッシュされたときに、以下のコマンドを実行します
on:
  push:
    branches: [main]

jobs:
  convert_via_pandoc:
  # 最新のubuntu環境上で実行します
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
    # pandoc をインストールします
      - name: Install Pandoc
        run: |
          sudo apt-get update
          sudo apt-get -y install pandoc
          pandoc --version
    # RSS を生成します
      - name: Generate RSS
        run: pandoc feed.yml --template .common/template.rss >> feed.rss
    # Markdown を HTML に変換します
      - name: Convert MD to HTML
        # index.md を全て index.html に変換します
        run: find . -name "*index.md" | while read i; do pandoc -f markdown -t html --template=.common/template.html --toc --no-highlight --mathjax "${i}" >> "${i%.md}.html"; done
    # GitHub Pages 上に公開します
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 追加の機能

### RSS

RSSフィードはサイトの更新情報を記述したファイルです。

ユーザはRSSを定期的に読みに行くことで、サイトが更新されたか知ることができます。

それを自動的にやってくれるのが、RSSリーダというソフトウェアで、
好きなサイトのRSSを登録しておくと、定期的に取得しに行って、新着通知とかを出してくれます。

このシステムは、特定のサービスに依存していません。
サーバとネットワークが生きてる限り、RSSのシステムは使えます。
突然、謎のマスクマンが現れ、インターネットを完膚なきまで破壊し尽くさない限り、使えます。

ということで、RSSを書いてみましょう。

#### RSSのフォーマット

RSSはXML形式です。
そこまで難しくないので、ニュースサイトのRSS、たとえば[YahooニュースのRSS](https://news.yahoo.co.jp/rss/topics/science.xml)とかを見れば、だいたいわかると思います。

各RSSタグの意味は[RSS 2.0タグリファレンス](http://www.openspc2.org/RSS/200/index.html)、または[RSS 2.0 at Harvard Law](https://cyber.harvard.edu/rss/rss.html)を見てください。

#### Yamlによる記述

RSSはXML形式で、人間が手書きするには複雑すぎるので、YAML 形式で書き、pandoc で変換します。

```
pandoc feed.yml --template template.rss >> feed.rss
```

参考：[pandoc-rss-template](https://github.com/leosumi/pandoc-rss-template/)

### OGP

Twitterでリンクをツイートしたら、サムネイル画像が出てくる、アレです。

- [参考](https://speakerdeck.com/kubotak/ssgnasaitodeogphua-xiang-wodong-de-sheng-cheng-sitai)

### Twitter カード

Twitterのリンクで大きな画像を表示するには、twitter用のmetaタグを設定する必要があるみたいです。

```
<meta name="twitter:card" content="Twitter card type" />
<meta name="twitter:site" content="@user name” />
<meta name="twitter:domain" content="domain name" />
<meta name="twitter:title" content="title" />
<meta name="twitter:description" content="description" />
<meta name="twitter:image" content="url to image" />
```
cardには4種類あるようです。
- Summary Card
  - 正方形の小さい画像
- Summary Card with Large Image
  - 大きい画像
- Player Card
  - 動画付き
- App Card
  - アプリへのリンク

下2つが作れるのかは未確認。

[Card Validator](https://cards-dev.twitter.com/validator)サ終してて草。

## エンジニア向け機能

### TeX数式の表示

Mathjaxを使って、TeXの数式をきれいに表示します。

#### マクロの設定

#### VSCodeの設定

### コードのハイライト

highlight-js を使って、ページ内のコードに色をつけます。

1. https://highlightjs.org/download/ から、必要な言語をポチポチして、ダウンロードする
2. サイトの[どこか](https://github.com/kanade-k-1228/kanade-k-1228.github.io/tree/main/hljs)にjsとcssをおいておく
3. html中にhljsをロードするjsを書き込む
4. Pandocのデフォルトのハイライタを使わない設定にする `--no-highlight` オプションを与えます。

## 今後追加したい機能

- git にある差分から変更があったファイルだけ調べて変換をすると早くなるよね
- モバイル・デスクトップ両方にいい感じのスタイルを探す
- コメント欄を作る
