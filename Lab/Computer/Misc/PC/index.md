---
title: PC 覚書
date: 2021-10-11
---

## プログラマのための PC ハードウェアまとめ

よく PC について聞かれるのでまとめておきました。

> 世の中の自作 PC の情報ってゲーマー向けばっかりよな…

### CPU

- x86-x64
  - パソコンにはARMもRISC-Vもないです
  - でも最近ARM版のWindows出てきたね
- Intel Core
  - 世代
    - 型番の頭が世代を表します
    - 世代によってアーキテクチャやプロセスルールが変わります
  - i3, i5, i7, i9
    - 右に行くほどコア数スレッド数が増えます
    - 型番の百の位が（なんとなく）表しています
  - 末尾の記号
    - Kは特に高性能という意味です。
    - Fは内蔵GPUが無いぞう！という意味です。別途 GPU を買いましょう。
- AMD Ryzen
  - デフォで内蔵 GPU が無い
  - 世代
    - Zen, Zen+, Zen2, Zen3
  - Ryzen 9,7,5,3
    - Intel と同じようにコア数とスレッド数が増えます
  - 末尾の記号
    - X は特に高性能という意味です。
    - G は内蔵 GPU が付きという意味です。

### マザーボード

大きな基板です。いろいろな部品を接続します。

- チップセット
  - マザーボードに載っているチップの名前です
  - 周辺機器の通信を担当します
  - CPU に対応するチップセットを選びましょう
- ATX, Mcro-ATX, Mini-ITX
  - 基板サイズについての規格です

### GPU

### メモリ

- DDR4
  - いま標準の規格
- DIMM, SO-DIMM
  - デスクトップ用が DIMM, ノートパソコン用が SO-DIMM
- 2 枚挿し
  - メモリを複数枚
  - 2 枚ペアで売っていることが多いです
- 電圧
  - 1.2V が標準
  - 1.35V はオーバークロック
- データ転送レート
  - 「DDR4-3200」はデータ転送レートが 3200MHz ということ
- 帯域幅
- レイテンシ
- ECC
  - エラーチェック付
- REG
  - レジスタ付
  - 通信バッファ

### ドライブ

- SSD

- SATA
  - ドライブの通信規格です
- M.2
  - マザーボード上に取り付けるタイプの SSD
  - M.2 PCIe
    - PCIe で通信する M.2 SSD です
    - チップセットを介さずに直接 CPU に接続しているので速い（とされる）
- RAID
  - 複数の SSD を用いて耐障害性を向上したり速度を速くしたりする
  - 個人レベルでは不必要なロマンシステム（楽しい）
  - RAID 0
    - 2 台のドライブに分けて帯域幅を倍にする
    - データがバラバラになる（連続的に並ばなくなる）ので飛んだときの復元が困難
  - RAID 1
    - 2 台のドライブに同じデータを読み書きする
  - RAID 2
    - ハミング符号化する
      - 2bit を 5bit に冗長化する
      - ドライブを 5 台使っても 2 台分の容量しかないが 3 台壊れても大丈夫
    - 耐障害性は高いが符号化の計算が重い
  - RAID 3
    - ハミング符号のかわりにパリティで計算コストを減らす
  - RAID 4
    - ブロック単位でパリティを取る
  - RAID 5
    - パリティブロックを分散
- バックアップ

### 電源

- 効率の認証
- ATX 電源
  - ふつう電源といえばこれ
- SFX 電源
  - 小型なので小さいケース向け

## 部品の選定

### 選定の方針

自作 PC の良いところは予算の中で最適の性能が得られることです。

いまの PC で問題があって買い替えたいと思うんやけど，問題によって

- 開発環境が重い
- コンパイル時間が長い

- 動作が不安定

## GPU

プログラミング用途では基本的にはいりません。CPU 内蔵 GPU で事足ります。ただ，Unity とか VR とか，グラフィックが重いことをしたいのであれば買ってもいいかもしれません。ともかく，後で増設できるのでひとまず無視してください。

## メモリ

メモリは

## SSD / HDD

RAID とはいえ同じ電源系統なので信頼性が

## 電源

最後に今まで選んだ部品の消費電力を足してその値以上の出力の電源モジュールを買います。

## いまの PC

|        |       |       |
| ------ | ----- | ----- |
| CPU    | 10400 | 18000 |
| マザボ | B560  | 8000  |
| メモリ | 16G   | 7000  |
| SSD    | 1T    | 10000 |
| 電源   | 650W  | 6000  |
| ケース |       | 4000  |
| 計     |       | 43000 |
