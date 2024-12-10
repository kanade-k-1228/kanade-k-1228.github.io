---
title: 多様体
---

$$
\newcommand{\O}{\mathcal{O}}
\newcommand{\R}{\mathbb{R}}
$$

- 多様体の基礎（松本幸夫）
- 微分幾何入門（落合卓四郎）

## 位相空間

集合 $X$ に対して，部分集合族 $\O \subseteq 2^X$ が以下の性質を満たすとき $(X,\O)$ を位相空間という．

- $\emptyset, X \in \O$
- 有限回の $\cap$ に閉じている
- 無限回の $\cup$ に閉じている

$\O$ を位相といい，$\O$ の元を閉集合という

### ハウスドルフの分離公理

$$
\forall p,q \in X \, (p \neq q) \quad \exists U,V \in \O \, ( p \in U, q \in V ) \quad U \cap V = \emptyset
$$

を満たすような位相空間 $(X,\O)$ をハウスドルフ空間という．

### 連続写像

位相空間 $(X,\O_X)$ $(Y,\O_Y)$ の写像 $f : X \rightarrow Y$ が連続であるとは

$$
V\in\O_Y \Rightarrow f^{-1}(V) \in \O_X
$$

### 同相

$f$ が全単射かつ連続なとき同相 $X \approx Y$

### 位相の継承

位相空間の部分集合・直積・射影に位相を入れる方法．

## ユークリッド空間

### 距離

$$
d : \R^m \times \R^m \rightarrow \R
$$

- $d(x,y) \geq 0$
- $d(x,y) = d(y,x)$
- $d(x,y) + d(y,z) \geq d(x,z)$

### 近傍

$a\in \R^m$ の $\varepsilon > 0$ 近傍

$$
N_\varepsilon(a;\R^m) = \left\{ x\in \R^m \middle| d(x,a) < \varepsilon \right\}
$$

### 開集合

$U \subseteq \R^m$ が開集合であるとは，

$$
\forall a \in U \quad \exists \varepsilon > 0 \quad N_\varepsilon(a) \subset U
$$

#### 性質

- $\emptyset,\R^m \in U$
- 有限回の $\cap$ に閉じている
- 無限回の $\cup$ に閉じている

### 収束

$\{x_n\}_{n=1}^\infty \in \R^m$ が収束するとは，

$$
\exists a \in \R^m \quad \forall \varepsilon > 0 \quad \exists n_0 > 0 \quad n > n_0 \Rightarrow x_n \in N_\varepsilon(a)
$$

### 開集合

$C \subseteq \R^m$ が閉集合であるとは，

$C$ 内の収束点列が $C$ 内に収束すること．

#### 性質

- $\emptyset,\R^m \in C$
- 有限回の $\cup$ に閉じている
- 無限回の $\cap$ に閉じている

### 連続性

写像 $f$ が $a$ で連続であるとは，

$$
\forall \varepsilon > 0 \quad \exists \delta > 0 \quad f(N_\delta(a)) \subset  N_\varepsilon(f(a))
$$

すなわち，

$$
f^{-1}(N_\varepsilon(f(a))) \supset N_\delta(a)
$$

## 多様体

局所的にユークリッド空間 $\R^m$ と同相なハウスドルフ空間を $m$次多様体という．

### 局所座標系

$$
\varphi_M : U \in \O_M \rightarrow U' \in \O_{\R^m}
$$

### 多様体上の関数（スカラー場）

$$
f : M \rightarrow \R
$$

#### 接空間

$f$ を曲線を点 $p \in M$ の接空間 $(x_1,,,x_m)$ 上の関数にする

$$
U_p \xrightarrow{\varphi_p} \R^m \rightarrow \R
$$

### 多様体上の曲線

$$
c : \R \rightarrow M
$$

#### 局所座標上

曲線を点 $p \in M$ での局所座標 $(x_1,,,x_m)$ で表すと $(c_1(t),,,c_m(t))$

### スカラー場の微分

$$
\R \xrightarrow{c} M \xrightarrow{f} \R
$$

スカラー場を曲線に沿って微分する．

$$
\d{t}f(c(t))
$$

点 $p \in M$ での微分は

$$
\d{t}f(c(t))
$$

### 接空間

## ベクトル場

## 接続

## リーマン多様体

リーマン計量を入れた多様体

### リーマン計量

### レビ-チルダ接続

捩率が 0 となる接続
