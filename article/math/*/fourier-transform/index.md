---
title: フーリエ変換
icon: ocean
abst: ""
---

## フーリエ変換チートシート

### フーリエ級数展開

> 周期 $T$
>
> $$
> a_n = (2)/(T)integral_(0)^(T) f(t)cos(2pi nt)/(T) d t
> $$
>
> $$
> b_n = (2)/(T)integral_(0)^(T) f(t)sin(2pi nt)/(T) d t
> $$
>
> $$
> f(t) = (a_0)/(2) + sum_n l{a_ncos(2pi nt)/(T) + b_nsin(2pi nt)/(T)r}
> $$

### 複素フーリエ級数展開

> 周期$T$
>
> $$
> c_n = (1)/(T) integral_0^T exp lr((-2pi i(nt)/(T)r)) d t
> $$
>
> $$
> f(t) = sum_(n=-oo)^(+oo) c_n exp lr((2pi i(nt)/(T)r))
> $$

### フーリエ変換

> $$
> cal(F) [f(t)] = (1)/(sqrt(2pi)) integral_(-oo)^(+oo) f(t)exp(-ikt) d t
> $$
>
> $$
> cal(F)^(-1) [f(k)] = (1)/(sqrt(2pi)) integral_(-oo)^(+oo) exp(ikx) dk
> $$

### 微分演算子

$$
begin{CD}
f     @>D>>  Df \\
@Vcal(F) VV            @VV cal(F) V \\
cal(F) f @>(ik)>>  cal(F) D f = (ik)cal(F) f
end{CD}
$$

### 畳み込み

$$
f*g=integral_(-oo)^(+oo) f(tau)g(t-tau) dtau
$$

$$
begin{CD}
ftimes.circle g     @>*>>  f*g \\
@Vcal(F) VV            @VV cal(F) V \\
cal(F)[f]times.circle cal(F)[g] @>times>>  cal(F)[f*g] = cal(F)[f]cal(F)[g]
end{CD}
$$

## 関数空間

正規直交系をなす関数集合 ${f_n}$

$$
integral f_i f_j d x = delta_("ij")
$$

を基底として

$$
f = sum_n c_n f_n
$$

と関数を表す．

## フーリエ級数展開

### パーシバルの関係式

### 波動方程式の解法

### 熱伝達方程式の解法

## フーリエ変換

### ガウス関数

$$

cal(F)[exp(-alpha t^2)]
= (1)/(sqrt(2pi))integral_(-oo)^("oo") exp(-at^2) exp(-iomega t) d t \

= (1)/(sqrt(2pi))integral_(-oo)^("oo") exp lr({-al(t+(iomega)/(2alpha)r)^2-(omega^2)/(4alpha)}) d t \

= (1)/(sqrt(2pi)) exp lr((-(omega^2)/(4alpha)r)) integral_(-oo)^("oo") exp(-atau^2) dtau \

= (1)/(sqrt(2pi)) exp lr((-(omega^2)/(4alpha)r)) sqrt((pi)/(alpha)) \

= (1)/(sqrt(2alpha)) exp lr((-(omega^2)/(4alpha)r))


$$

途中でガウス積分の公式

$$
integral_(-oo)^("oo") exp(-ax^2) d x = sqrt((pi)/(a))
$$

を用いた。

求めたい積分を $I=integral_(-oo)^("oo") exp(-ax^2) d x$ とする。

$$

I^2
= integral_(-oo)^("oo") integral_(-oo)^("oo") exp(-ax^2) exp(-ay^2) d x d y \

= integral_0^("oo") integral_(-pi)^("pi") exp(-ar^2) r dtheta d r \

= 2pi integral_0^("oo") rexp(-ar^2) d r\

= 2pi l[-(1)/(2a) exp(-ar^2)r]_0^("oo") \

= (pi)/(a)


$$

よって

$$
I=sqrt((pi)/(a))
$$

### 熱伝達方程式の解法
