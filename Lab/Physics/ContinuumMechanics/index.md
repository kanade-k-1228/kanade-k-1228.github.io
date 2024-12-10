---
title: 連続体力学
---

[Book](https://ocw.kyoto-u.ac.jp/course/9/)

## 登場人物

- $v$ 速度
- $\sigma$ 応力（面積力）
- $K$ 体積力

## 連続体上の微分

連続体中の点を指定するには、初期状態での位置か、変位後の位置のどちらかを与えればいい（連続体の変位がわかれば変換できる）。連続体上の場は、初期位置をインデックスとして$F(t,x_0)$、または現在位置をインデックスとして$f(t,x)$と表現される。

$$
F(t,x_0)=f(t,x(x_0,t))
$$

$$
\f{d}{dt}F=\l(\pd{}{t}+\d{x_i}{t}\pd{}{x_i}\right)f
$$

$$
D_t:=\p_t+v_i\p_i
$$

## 保存則

### 質量保存則

$$
\begin{aligned}
\p_t\rho&+\p_i(\rho v_i)&=0\\
D_t\rho&+\rho\p_iv_i&=0
\end{aligned}
$$

### 運動量保存則（運動方程式）

$$
D_tv_i=\frac{1}{\rho}\p_j\sigma_{ji}+K_i
$$

### エネルギー保存則

検査体積について、dt (運動エネルギー + 内部エネルギー) = 体積力による仕事率 + 面積力による仕事率 - 熱流束

$$
\d{}{t}\int_V \l(\f{1}{2}\rho v^2 + \rho\epsilon\r) dV = \int_V \l(\rho K \cdot v\r) dV + \int_S ((\sigma\cdot n)\cdot v) dS - \int_S (q \cdot n) dS
$$

$$
\begin{aligned}
D_t \l(\f{1}{2}\rho v^2\r)&=v_j\p_i\sigma_{ij}+\rho K_iv_i \\
D_t \l(\rho\epsilon\r) &= \sigma_{ij}\p_i v_j - \p_i q_i \\
D_t \l(\frac{1}{2}\rho v^2 + \rho\epsilon\r)&=\p_i(\sigma_{ij} v_i - q_i)+\rho K_iv_i \\
\end{aligned}
$$
