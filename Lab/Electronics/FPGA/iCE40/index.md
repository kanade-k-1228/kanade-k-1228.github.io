---
title: iCE40 で始める FPGA
---

iCE40 は、SiliconBlue（Lattice が買収）が開発した、組み込み向けの FPGA シリーズです。

FPGA の中では安く、構造が単純なので、入門用におすすめです。

## FPGA の内部

FPGA は、内部を書き換えられる IC です。

このような、Programabble Logic Block がたくさん入っています。

PLC は 8 個の Logic Cell からなっており、Logic Cell には Look Up Table(LUT) と、DFF が入っています。

### Look Up Table (LUT)

LUT は任意の組合回路を作ることができる回路です。

例えば、3 入力の組合回路を考えてみましょう。

真理値表は、このように 2^3 = 8 行になります。

| IN  | OUT |
| --- | --- |
| 000 | O_0 |
| 001 | O_1 |
| 010 | O_2 |
| 011 | O_3 |
| 100 | O_4 |
| 101 | O_5 |
| 110 | O_6 |
| 111 | O_7 |

この表の入力をアドレス、出力を値として見れば、1bit x 8 の ROM としてみなせます。

ROM に真理値表の出力値を順番に書き込むことで、任意の組合回路を作ることができます。

これが LUT です。

### D-FlipFlop (DFF)

DFF は、順序回路

### Multiplexer

この中の、台形（マルチプレクサ）と ■ が、組み替えられるスイッチです。

## 開発の流れ

| ステップ        | ツール   | 生成物 |
| --------------- | -------- | ------ |
| HDL             | verilog  | .v     |
| Syntesis        | yosys    | .blif  |
| Place and Route | next pnr | .asc   |
| Package         | icepack  | .bin   |
| Upload          |          |        |

### ハードウェア記述言語 Hardware Description Language (HDL)

まず、論理回路を HDL で記述します。

### 合成 Synthesis

ネットリストという形式に変換します。

### 配置・配線 Place and Route

ネットリストの各素子を、具体的にどの Logic Cell に割り当てるか、そして、どこを経由して Logic Cell 間を接続するかを決めます。

### パッケージ Package

ビットストリーム

### 書き込み Upload

## ああ

- [iCE 40 Family Handbook](https://www.latticesemi.com/~/media/LatticeSemi/Documents/Handbooks/iCE40FamilyHandbook.pdf)
- [iCE 40 DataSheet](https://www.latticesemi.com/~/media/LatticeSemi/Documents/DataSheets/iCE/iCE40LPHXFamilyDataSheet.pdf)
- [iCE 40 Programming and Configuration](https://www.latticesemi.com/view_document?document_id=46502)
- [iCE40 ユーザーガイド](https://www.macnica.co.jp/business/semiconductor/articles/iCE40_UserGuide_rev1.7__2.pdf)
