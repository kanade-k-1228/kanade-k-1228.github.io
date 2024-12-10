---
title: D フリップフロップ回路
date: 2021-12-05
ogp: Lab/Computer/RelayComputer/Day5_DFF
keyword: リレーコンピュータ, 自作CPU, 論理回路, フリップフロップ
description: 1ビットのデータを記憶する回路をリレーで作ります。
---

これは [リレーから始める CPU 自作 Advent Calendar 2021](https://adventar.org/calendars/7052) 5 日目の記事です。 [<<< 4 日目](../Day4_Latch/)

この記事では、論理回路の中でも一番の山場、D フリップフロップ回路（DFF）を解説します。

## DFF の仕事

DFF は信号を記憶する素子です。

![](./img/DFF.dio.svg)

CLK が立ち上がったタイミングの D の状態が記憶されて、Q に出力されます。

![](./img/DFFTimingChart.dio.svg)

## 回路図と動作

![](./img/DFFCircuit.dio.svg)

複雑な回路ですが、ひとつずつ追っていけばわかる、はずです…！

### D=1

![](./img/Case1.dio.svg)

1. D が ON になると、 X が ON になる。
2. CLK が立ち上がると、① の経路は切れるが、② の経路は導通しているので、 X は ON を維持する。このとき、CLK が立ち上がってる間に、D が OFF になったとしても、X は ON を維持する。
3. X と CLK が ON なので、Q が ON になる。
4. CLK が立ち下がると、③ の経路は切れるが、④ の経路は導通しているので、Q は ON を維持する。

### D=0

![](./img/Case0.dio.svg)

1. D が OFF になると、X が OFF になる。
2. CLK が立ち上がると、Q が ON であったとしても、Q が OFF になる。このとき、CLK が立ち上がってる間に、D が ON になったとしても、X は OFF を維持する。
3. X と CLK が ON なので、Q が OFF になる。
4. CLK が立ち下がっても、Q は OFF を維持する。

[>>> 6 日目](../Day6_Counter/)
