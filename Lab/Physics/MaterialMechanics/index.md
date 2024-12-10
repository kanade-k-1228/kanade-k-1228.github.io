---
title: 材料力学
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
ds = \rho ( -d \theta )
$$

$$
dx = \cos \theta ds
$$

$$
\theta = \tan^{-1} \frac{dv}{dx}
$$

$$
\frac{d\theta}{dx} = \frac{1}{1+\left(\frac{dx}{dv}\right)^2}
$$

$\theta<<1$ のとき

$$
\frac{1}{\rho}=-\frac{d^2v}{dx^2}
$$

### 曲げ応力

$$
\frac{1}{\rho}=\frac{M}{EI}
$$

### たわみの基礎式

$$
\begin{aligned}
    \frac{d^2v}{dx^2} &= -\frac{M}{EI} \\
    \theta &= \frac{dv}{dx} = -\int\frac{M}{EI}dx+C \\
    v &= -\int\int\frac{M}{EI}dxdx+C_1x+C_2
\end{aligned}
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
\frac{d^2v}{dx^2}=-\frac{M}{EI}=-\frac{1}{EI}(M_A+Pv+F_Ax)
$$

$\alpha=\sqrt{P/EI}$ とすると，解は

$$
\begin{aligned}
v(x) &= c_1 \sin\alpha x + c_2 \cos\alpha x - \frac{M_A}{P} - \frac{F_A}{P}x \\
\dot{v}(x) &= \alpha c_1 \cos \alpha x - \alpha c_2 \sin \alpha x - \frac{F_A}{P} \\
\ddot{v}(x) &= -\alpha^2( c_1 \sin \alpha x + c_2 \cos \alpha x)
\end{aligned}
$$

### 境界条件

|        | 回転 | 横  | $v$      | $\dot{v}$ | $\ddot{v}=M$ | $F$ |
| :----: | :--: | :-: | -------- | --------- | ------------ | --- |
| 自由端 |  ○   |  ○  | $\neq 0$ | $\neq 0$  |              |     |
| 回転端 |  ○   |  ×  | $= 0$    | $\neq 0$  |              |     |
|   -    |  ×   |  ○  | $\neq 0$ | $= 0$     |              |     |
| 固定端 |  ×   |  ×  | $= 0$    | $= 0$     |              |     |

### 回転-回転

A 回転端 $v(0)=0,F_A=M_A=0$

B 回転端 $v(L)=0,F_B=M_B=0$

$n$ をパラメタとして，

$$
v=c_1\sin\frac{n\pi}{L}x
$$

荷重は

$$
P=\alpha^2 EI=\frac{n^2\pi^2}{L^2}EI
$$

$n=1$ のときの $P$ が限界荷重

$$
\begin{aligned}
P_{CR} &= \frac{\pi^2}{L^2}EI \\
v_{CR} &= c_1\sin\frac{\pi}{L}
\end{aligned}
$$

$c_1$ が残るので限界時の変位はわからん ← 見た目ではわからん

### 固定-自由

A 固定端 $v(0)=\dot{v}(0)=0,F_A=0$

B 自由端 $v(L)=\delta,F_B=M_B=0$

モーメントの釣り合いから $M_A=-\delta P$

$$
\begin{aligned}
v &= -\delta \cos \alpha x + \delta \\
\dot{v} &= \delta \alpha \sin \alpha x \\
\ddot{v} &= \delta\alpha^2\cos\alpha x
\end{aligned}
$$

$\cos\alpha L=0$ より $\alpha L = \pi/2 \quad \mathrm{mod}\,\pi$

$$
P_{CR}=\frac{\pi^2}{4L^2}EI
$$

自由回転より弱い

### 固定-回転

### 固定-固定
