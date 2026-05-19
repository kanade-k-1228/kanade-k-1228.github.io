---
title: 現代制御論
---

## 状態方程式表現

## 安定性

## 極配置

## オブザーバ

## H∞制御

### $H^oo$ ノルム

伝達関数 → 実数 なる評価関数

$$
parallel G(s) parallel_oo = max_(0 < omega < oo) |G(jomega)|
$$

```matlab
G = tf([0 0 1],[1 1 10])
[ninf,fpeak] = norm(G,inf)
dB = 20 * log10(ninf)
```

## カルマンフィルタ
