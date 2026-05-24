---
title: 多様体
icon: globe_with_meridians
abst: ""
---

$$
newcommand{O}{cal(O)}
newcommand{cal(R)}{bb(R)}
$$

- 多様体の基礎（松本幸夫）
- 微分幾何入門（落合卓四郎）

## 位相空間

集合 $X$ に対して，部分集合族 $O subset.eq 2^X$ が以下の性質を満たすとき $(X,O)$ を位相空間という．

- $emptyset, X in O$
- 有限回の $sect$ に閉じている
- 無限回の $union$ に閉じている

$O$ を位相といい，$O$ の元を閉集合という

### ハウスドルフの分離公理

$$
forall p,q in X   (p != q) quad exists s U,V in O   ( p in U, q in V ) quad U sect V = emptyset
$$

を満たすような位相空間 $(X,O)$ をハウスドルフ空間という．

### 連続写像

位相空間 $(X,O_X)$ $(Y,O_Y)$ の写像 $f : X -> Y$ が連続であるとは

$$
VinO_Y => f^(-1)(V) in O_X
$$

### 同相

$f$ が全単射かつ連続なとき同相 $X approx Y$

### 位相の継承

位相空間の部分集合・直積・射影に位相を入れる方法．

## ユークリッド空間

### 距離

$$
d : cal(R)^m times cal(R)^m -> cal(R)
$$

- $d(x,y) >= 0$
- $d(x,y) = d(y,x)$
- $d(x,y) + d(y,z) >= d(x,z)$

### 近傍

$ain cal(R)^m$ の $epsilon.alt > 0$ 近傍

$$
N_(epsilon.alt)(a;cal(R)^m) = { x in cal(R)^m bar d(x,a) < epsilon.alt }
$$

### 開集合

$U subset.eq cal(R)^m$ が開集合であるとは，

$$
forall a in U quad exists s epsilon.alt > 0 quad N_epsilon.alt(a) subset U
$$

#### 性質

- $emptyset,cal(R)^m in U$
- 有限回の $sect$ に閉じている
- 無限回の $union$ に閉じている

### 収束

${x_n}_(n=1)^oo in cal(R)^m$ が収束するとは，

$$
exists s a in cal(R)^m quad forall epsilon.alt > 0 quad exists s n_0 > 0 quad n > n_0 => x_n in N_epsilon.alt(a)
$$

### 開集合

$C subset.eq cal(R)^m$ が閉集合であるとは，

$C$ 内の収束点列が $C$ 内に収束すること．

#### 性質

- $emptyset,cal(R)^m in C$
- 有限回の $union$ に閉じている
- 無限回の $sect$ に閉じている

### 連続性

写像 $f$ が $a$ で連続であるとは，

$$
forall epsilon.alt > 0 quad exists s delta > 0 quad f(N_delta(a)) subset  N_epsilon.alt(f(a))
$$

すなわち，

$$
f^(-1)(N_epsilon.alt(f(a))) supset N_delta(a)
$$

## 多様体

局所的にユークリッド空間 $cal(R)^m$ と同相なハウスドルフ空間を $m$次多様体という．

### 局所座標系

$$
phi.alt_M : U in O_M -> U' in O_(cal(R)^m)
$$

### 多様体上の関数（スカラー場）

$$
f : M -> cal(R)
$$

#### 接空間

$f$ を曲線を点 $p in M$ の接空間 $(x_1,,,x_m)$ 上の関数にする

$$
U_p ->^(phi.alt_p) cal(R)^m -> cal(R)
$$

### 多様体上の曲線

$$
c : cal(R) -> M
$$

#### 局所座標上

曲線を点 $p in M$ での局所座標 $(x_1,,,x_m)$ で表すと $(c_1(t),,,c_m(t))$

### スカラー場の微分

$$
cal(R) ->^(c) M ->^(f) cal(R)
$$

スカラー場を曲線に沿って微分する．

$$
d{t}f(c(t))
$$

点 $p in M$ での微分は

$$
d{t}f(c(t))
$$

### 接空間

## ベクトル場

## 接続

## リーマン多様体

リーマン計量を入れた多様体

### リーマン計量

### レビ-チルダ接続

捩率が 0 となる接続
