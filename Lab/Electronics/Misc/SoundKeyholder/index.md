---
title: 音の鳴るキーホルダを作る
---

## 音声再生 SOC

[【lite 版】本当は教えたくない、音の鳴るキーホルダーの作り方](https://note.com/valima/n/n40c644e86af9)
← こちらで紹介されてる方法

[アリエク](https://ja.aliexpress.com/item/32835136417.html)

[データシート](https://chfile.cn.gcimg.net/gcwthird/day_20170221/5358076adbu975347f683o29115f3276.pdf)

音声再生 IC。音声データを渡し、EPROM に書き込んでもらうみたい。

後から書き換えられないのが難点。

## マイコン

Flash 容量が大きめのやつがいいな。

- 再生時間 t [sec]
- サンプリング周波数 f [Hz]
- サンプリングビット s [bit]

$$
t \times f \times s
$$

ATMEGA328P: 32kB = sec x 44100 Hz x 8 bit

## FPGA + Flash

たのしそう。

## 制作

- [電池ケース](https://akizukidenshi.com/catalog/g/gP-12891/)
- [押しボタン](https://akizukidenshi.com/catalog/g/gP-09824/)
