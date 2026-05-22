---
title: PicoRV32で自作マイコン
---

RISC-V を使って ArduinoUno と同程度のマイコンを作ります。

リポジトリは→ [kanade-k-1228/mysoc](https://github.com/kanade-k-1228/mysoc)

## スペック

### FPGA

[千石電商 | TinyFPGA BX](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-5C6J)

### CPU

CPU として [PicoRV32](https://github.com/YosysHQ/picorv32) を使用します。

ハードウェアのサイズを小さくすること、周波数を高くすることを目標にした、RISC-Vの実装です。
