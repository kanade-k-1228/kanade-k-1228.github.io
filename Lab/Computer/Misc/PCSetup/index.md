---
title: 環境構築まとめ
---

## Windows

インストールとセットアップ

1. インストールメディア作成ツールでブート USB をを作る。
2. BIOS で TPM を有効化。セキュリティのとこにある。
3. BIOS で起動ディスクの優先順位を変更。USB が出てなければ DVD とか iso が読めるやつを選択。
4. USB を挿して電源 ON !
5. プロダクトキーを入力。Microsoft アカウントとの連携を求めてくるが、ネットに接続しなければローカルアカウントを作れる。LAN ケーブルを抜いて。
6. 勧めてくる変な機能を OFF にする。

初期アプリの消去

1. `Get-AppxPackage` でアプリの名前を探す
2. `Get-AppxPackage [AppName] | Remove-AppxPackage`

## Ubuntu (WSL)

1. コンパネの「Windows の機能の有効化または無効化」から Windows Subsystem for Linux をチェック
2. Microsoft Store から Ubuntu をインストール

## Utils

### CapsLock キーバインドの設定

[Github/kanae-k-1228/FcCapsLock](https://github.com/kanade-k-1228/FcCapsLock)

1. レジストリの書き換えスクリプトを実行
2. Win + R → shell:startup
3. F13.exe をスタートアップに追加

## Windows Terminal

1. ssh 接続の設定

## VSCode

```json
{
  "editor.formatOnType": true,
  "editor.formatOnSave": true
}
```

### Git

1. Git をインストール
2. `settings.json` に `"git.path": ["C:\\Program Files\\Git\\bin\\git.exe"],`

### clang-format

1. `sudo apt install clang-format`
2. `which clang-format` でパスを確認
3. [Clang-Format](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
4. `setting.json`
   ```json
   {
     "clang-format.executable": "/usr/bin/clang-format",
     "[cpp]": {
       "editor.defaultFormatter": "xaver.clang-format"
     }
   }
   ```

### ESLint

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Prittier

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Markdown

1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) と [Markdown+Math](https://marketplace.visualstudio.com/items?itemName=goessner.mdmath) をインストール
2. ワークスペースの `.vscode/settings.json` に TeX の設定を書く
   ```json
   {
     "markdown.math.enabled": false,
     "markdown.extension.math.enabled": false,
     "markdown.extension.katex.macros": {
       "\\d": "{\\frac{\\mathrm{d} #1}{\\mathrm{d} #2}}",
       "\\dd": "{\\frac{\\mathrm{d}^2 #1}{\\mathrm{d} {#2}^2}}",
       "\\ddd": "{\\frac{\\mathrm{d}^3 #1}{\\mathrm{d} {#2}^3}}",
       "\\pd": "{\\frac{\\partial #1}{\\partial #2}}",
       "\\pdd": "{\\frac{\\partial^2 #1}{\\partial {#2}^2}}",
       "\\pddd": "{\\frac{\\partial^3 #1}{\\partial {#2}^3}}"
     },
     "mdmath.macros": {
       "\\d": "{\\frac{\\mathrm{d} #1}{\\mathrm{d} #2}}",
       "\\dd": "{\\frac{\\mathrm{d}^2 #1}{\\mathrm{d} {#2}^2}}",
       "\\ddd": "{\\frac{\\mathrm{d}^3 #1}{\\mathrm{d} {#2}^3}}",
       "\\pd": "{\\frac{\\partial #1}{\\partial #2}}",
       "\\pdd": "{\\frac{\\partial^2 #1}{\\partial {#2}^2}}",
       "\\pddd": "{\\frac{\\partial^3 #1}{\\partial {#2}^3}}"
     }
   }
   ```
3. Chrome 拡張 の [MarkdownViewer](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk) を入れる
4. 拡張機能のアイコンから mathjax を有効化
5. Allowed Origins に `file:///` を追加

### drawio

[Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)

## C/Cpp

VSCode 拡張 [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

### OpenGL

```s
$ sudo apt-get update
$ sudo apt-get install libglu1-mesa-dev freeglut3-dev mesa-common-dev
```

## Rust

1. [Rust をインストール](https://www.rust-lang.org/ja/tools/install)
2. VSCode 拡張 [Rust](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)
