---
title: FPGA で VGA 映像出力
keyword: FPGA, VGA,
---

## VGA 信号

| Pin   | Function     |      |
| ----- | ------------ | ---- |
| 1/2/3 | R/G/B Analog | 0.7V |
| 5     | GND          |      |
| 6/7/8 | R/G/B Return |      |
| 10    | GND          |      |
| 13    | H shync      | 5V   |
| 14    | V shync      | 5V   |

各色 2bit の 6bit、64 色表示にします。

アナログ出力なので、出力部分に簡単な DAC を組みます。

## 回路

[VGA コネクタ](https://www.marutsu.co.jp/pc/i/838015/)

## 参考

[Arduino を用いた VGA 映像信号の出力](http://www.net.c.dendai.ac.jp/~anada/)

[VGA 信号のタイミングチャート | 電子技術研究倶楽部](http://ele-tech.net/vga-doc1/)

[FPGA ボードで遊ぼう！- Basys3 で VGA 出力 - - Qiita](https://qiita.com/Kenta11/items/34555852efdf8d8f4b0c)

[TTL のみで作る VGA コントローラ](http://diode.matrix.jp/VGA/index.htm)

[たびろぐテクニカル ラダー式 DAC と VGA](http://yuranos.blog11.fc2.com/blog-entry-116.html)
