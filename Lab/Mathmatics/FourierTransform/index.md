---
title: フーリエ変換
---

## フーリエ変換チートシート

### フーリエ級数展開

> 周期 $T$
>
> $$
> a_n = \f{2}{T}\int_{0}^{T} f(t)\cos\f{2\pi nt}{T} dt
> $$
>
> $$
> b_n = \f{2}{T}\int_{0}^{T} f(t)\sin\f{2\pi nt}{T} dt
> $$
>
> $$
> f(t) = \f{a_0}{2} + \sum_n \l\{a_n\cos\f{2\pi nt}{T} + b_n\sin\f{2\pi nt}{T}\r\}
> $$

### 複素フーリエ級数展開

> 周期$T$
>
> $$
> c_n = \f{1}{T} \int_0^T \exp\l(-2\pi i\f{nt}{T}\r) dt
> $$
>
> $$
> f(t) = \sum_{n=-\infty}^{+\infty} c_n \exp\l(2\pi i\f{nt}{T}\r)
> $$

### フーリエ変換

> $$
> \F [f(t)] = \f{1}{\sqrt{2\pi}} \intinf f(t)\exp(-ikt) dt
> $$
>
> $$
> \F^{-1} [f(k)] = \f{1}{\sqrt{2\pi}} \intinf \exp(ikx) dk
> $$

### 微分演算子

$$
\begin{CD}
f     @>D>>  Df \\
@V\F VV            @VV \F V \\
\F f @>(ik)>>  \F D f = (ik)\F f
\end{CD}
$$

### 畳み込み

$$
f*g=\intinf f(\tau)g(t-\tau) d\tau
$$

$$
\begin{CD}
f\otimes g     @>*>>  f*g \\
@V\F VV            @VV \F V \\
\F[f]\otimes \F[g] @>\times>>  \F[f*g] = \F[f]\F[g]
\end{CD}
$$

## 関数空間

正規直交系をなす関数集合 $\{f_n\}$

$$
\int f_i f_j dx = \delta_{ij}
$$

を基底として

$$
f = \sum_n c_n f_n
$$

と関数を表す．

## フーリエ級数展開

### パーシバルの関係式

### 波動方程式の解法

### 熱伝達方程式の解法

## フーリエ変換

### ガウス関数

$$
\begin{aligned}
\F[\exp(-\alpha t^2)]
&= \f{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty} \exp(-at^2) \exp(-i\omega t) dt \\
&= \f{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty} \exp\l\{-a\l(t+\f{i\omega}{2\alpha}\r)^2-\f{\omega^2}{4\alpha}\r\} dt \\
&= \f{1}{\sqrt{2\pi}} \exp\l(-\f{\omega^2}{4\alpha}\r) \int_{-\infty}^{\infty} \exp(-a\tau^2) d\tau \\
&= \f{1}{\sqrt{2\pi}} \exp\l(-\f{\omega^2}{4\alpha}\r) \sqrt{\f{\pi}{\alpha}} \\
&= \f{1}{\sqrt{2\alpha}} \exp\l(-\f{\omega^2}{4\alpha}\r)
\end{aligned}
$$

途中でガウス積分の公式

$$
\int_{-\infty}^{\infty} \exp(-ax^2) dx = \sqrt{\f{\pi}{a}}
$$

を用いた。

求めたい積分を $I=\int_{-\infty}^{\infty} \exp(-ax^2) dx$ とする。

$$
\begin{aligned}
I^2
&= \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \exp(-ax^2) \exp(-ay^2) dx dy \\
&= \int_0^{\infty} \int_{-\pi}^{\pi} \exp(-ar^2) r d\theta dr \\
&= 2\pi \int_0^{\infty} r\exp(-ar^2) dr\\
&= 2\pi \l[-\f{1}{2a} \exp(-ar^2)\r]_0^{\infty} \\
&= \f{\pi}{a}
\end{aligned}
$$

よって

$$
I=\sqrt{\f{\pi}{a}}
$$

### 熱伝達方程式の解法
