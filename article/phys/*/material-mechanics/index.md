---
title: 材料力学
icon: gem
abst: ""
---

## 引張・圧縮

### ポアソン比

## せん断

## 曲げ

### オイラーベルヌーイの仮定

## ねじり

## たわみ

### 幾何条件

![](./tawami.drawio.svg)

$$
d s = rho ( -d theta )
$$

$$
d x = cos theta d s
$$

$$
theta = tan^(-1) (d v)/(d x)
$$

$$
(dtheta)/(d x) = (1)/(1+lr(((d x)/(d v)))^2)
$$

$theta<<1$ のとき

$$
(1)/(rho)=-(d^2v)/(d x^2)
$$

### 曲げ応力

$$
(1)/(rho)=(M)/(EI)
$$

### たわみの基礎式

$$

    (d^2v)/(d x^2) = -(M)/(EI) \

    theta = (d v)/(d x) = -integral(M)/(EI)d x+C \

    v = -integralintegral(M)/(EI)dxdx+C_1x+C_2


$$

## 座屈

- 圧縮荷重 $P$
- せん断力荷重 $F_A,F_B$
- モーメント $M_A,M_B$

曲げモーメント

$$
M(x)=M_A+Pv(x)+F_Ax
$$

たわみの式

$$
(d^2v)/(d x^2)=-(M)/(EI)=-(1)/(EI)(M_A+Pv+F_Ax)
$$

$alpha=sqrt(P/EI)$ とすると，解は

$$

v(x) = c_1 sinalpha x + c_2 cosalpha x - (M_A)/(P) - (F_A)/(P)x \

dot(v)(x) = alpha c_1 cos alpha x - alpha c_2 sin alpha x - (F_A)/(P) \

dot.double(v)(x) = -alpha^2( c_1 sin alpha x + c_2 cos alpha x)


$$

### 境界条件

|        | 回転 | 横  | $v$    | $dot(v)$ | $dot.double(v)=M$ | $F$ |
| :----: | :--: | :-: | ------ | -------- | ----------------- | --- |
| 自由端 |  ○   |  ○  | $!= 0$ | $!= 0$   |                   |     |
| 回転端 |  ○   |  ×  | $= 0$  | $!= 0$   |                   |     |
|   -    |  ×   |  ○  | $!= 0$ | $= 0$    |                   |     |
| 固定端 |  ×   |  ×  | $= 0$  | $= 0$    |                   |     |

### 回転-回転

A 回転端 $v(0)=0,F_A=M_A=0$

B 回転端 $v(L)=0,F_B=M_B=0$

$n$ をパラメタとして，

$$
v=c_1sin(npi)/(L)x
$$

荷重は

$$
P=alpha^2 EI=(n^2pi^2)/(L^2)EI
$$

$n=1$ のときの $P$ が限界荷重

$$

P_("CR") = (pi^2)/(L^2)EI \

v_("CR") = c_1sin(pi)/(L)


$$

$c_1$ が残るので限界時の変位はわからん ← 見た目ではわからん

### 固定-自由

A 固定端 $v(0)=dot(v)(0)=0,F_A=0$

B 自由端 $v(L)=delta,F_B=M_B=0$

モーメントの釣り合いから $M_A=-delta P$

$$

v = -delta cos alpha x + delta \

dot(v) = delta alpha sin alpha x \

dot.double(v) = deltaalpha^2cosalpha x


$$

$cosalpha L=0$ より $alpha L = pi/2 quad upright(mod) pi$

$$
P_("CR")=(pi^2)/(4L^2)EI
$$

自由回転より弱い

### 固定-回転

### 固定-固定
