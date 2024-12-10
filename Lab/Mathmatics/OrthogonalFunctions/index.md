---
title: 直交関数系
---

## 関数空間

### 内積

$$
\inner{f}{g}=\int_a^b f(x) g(x) dx
$$

### 重み関数

$$
\inner{f}{g}=\int_a^b w(x) f(x) g(x) dx
$$

### 固有値

$$
Au=\lambda u
$$

### 対称演算子

$$
\inner{Au}{v}=\inner{u}{Av}
$$

> 対称演算子の固有ベクトルは直交系をなす

$$
Au_i=\lambda_i u_i
$$

$$
\inner{Au_i}{u_j}-\inner{u_i}{Au_j} = (\lambda_i-\lambda_j)\inner{u_i}{u_j} = 0
$$

## Sturm Liouville 演算子

$$
A=\d{}{x}\l(p(x)\d{}{x}\r)-q(x)
$$

> Sturm Liouville 演算子は対称か？

$$
vAu-uAv=\d{}{x}p(u'v-uv')
$$

$$
\inner{Au}{v}-\inner{u}{Av} = \int_a^b (vAu-uAv) dx = [p(u'v-uv')]_a^b
$$

同次境界条件 $[u'v-uv']_{x=a,b}=0$ を満たすとき、$A$ は対称な演算子となる。

### 重み付き

$$
Au(x)=-\lambda w(x) u(x)
$$

$$
\d{}{x}\l(p(x)\d{}{x}u(x)\r)-q(x)u(x)+\lambda w(x)u(x) = 0
$$

Sturm Liouville 演算子の固有値から、さまざまな直交関数系を作ることができる。

|                        | $p(x)$  | $q(x)$ | $w(x)$     |
| ---------------------- | ------- | ------ | ---------- |
| 三角関数               | $1$     | $0$    | $1$        |
| ルジャンドル関数       | $1-x^2$ | $0$    | $1$        |
| ベッセル・ノイマン関数 | $x$     | $-x$   | $\f{1}{x}$ |
| チェビシェフ多項式     |         |        |            |
| ゲーゲンバウアー多項式 |         |        |            |
| エルミート多項式       |         |        |            |
| ラゲール多項式         |         |        |            |

## 三角関数

$p(x)=$

## チェビシェフ多項式

### 第一種

区間$[-1,1]$

重み

$$
w(x)=\f{1}{\sqrt{1-x^2}}
$$

$$
T_n(\cos t) = \cos(n t)
$$

### 第二種

## ゲーゲンバウアー多項式

区間 $[-1,1]$

重み

$$
w(x)=(1-x^2)^{\alpha-\f{1}{2}}
$$

$$
C_n(x)=\f{(-2)^n}{n!}\f{\Gamma(n+\alpha)\Gamma(n+2\alpha)}{\Gamma(\alpha)\Gamma(2n+2\alpha)}\f{1}{w(x)}\dn{}{x}{n}[w(x)(1-x^2)^n]
$$

$\alpha=\f{1}{2}$ のときルジャンドル多項式

$\alpha=1$ のとき第二種チェビシェフ多項式
