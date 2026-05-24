---
title: グリーン関数
icon: green_book
abst: ""
---

## 線形微分方程式

線形微分演算子 $L$ について、微分方程式

$$
L[y(x)]=f(x)
$$

を線形微分方程式という。特に$f(x)=0$のとき、同次微分方程式という。

逆演算子 $L^(-1)$ が求まれば、$y(x)=L^(-1)[f(x)]$だが、一般に逆演算子を求めるのは難しい。

#### 演算子

$L$は関数を引数に取り関数を返す関数（演算子）。フーリエ変換・ラプラス変換と同じタイプ。

線形演算子は、線形性

1. $L[cy(x)]=cL[y(x)] quad (cin cal(R))$
2. $L[y_1(x)+y_2(x)]=L[y_1(x)]+L[y_1(x)]$

を満たす。

線形微分演算子は一般に

$$
L=a_n(x)(dif^n )/(dif x^n)+a_(n-1)(x)(dif^n-1 )/(dif x^n-1)+...+a_1(x)(dif )/(dif x)+a_0(x)
$$

と書ける。

#### 関数空間

関数空間は線形空間になっている。

内積を

$$
lr(angle.l f, g angle.r)=integral_(-oo)^("oo")f(x)g(x)d x
$$

とする。

微分演算子は

$$

lr(angle.l (dif )/(dif x)f, g angle.r)
= integral_(-oo)^("oo")(dif )/(dif x)f(x)g(x)d x \

= [f(x)g(x)]_(-oo)^("oo") - integral_(-oo)^("oo")(dif )/(dif x)f(x)g(x)d x \

= -lr(angle.l f, (dif )/(dif x)g angle.r)


$$

ただし、 $f(x),g(x)$ は $plus.minus oo$ で $0$ になるものだけを扱う。

### 解の任意性

非同次方程式$L[y(x)]=f(x)$の解に、同次方程式$L[y_0(x)]=0$の解を加えても、線形性から、

$$
L[y(x)+cy_0(x)]=f(x) quad (cin cal(R))
$$

を満たす。つまり、線形微分方程式の解は無数にあることになる。

### 同次線形微分方程式

同次形の線形微分方程式は一般に

$$
a_n(x)(dif^n y)/(dif x^n)+a_(n-1)(x)(dif^n-1 y)/(dif x^n-1)+...+a_1(x)(dif y)/(dif x)+a_0(x)y
$$

### グリーン関数

非同次微分方程式

$$
L[y(x)]=f(x)
$$

を解きたい。

逆演算子 $L^(-1)$ を求めて、

$$
y(x)=L^(-1)[f(x)]
$$

としたいが、一般に逆演算子を求めるのは難しい。

そのため、 $f(x)$ をスライスする。

$$
f(x) =integral_(-oo)^("oo") f(xi)delta(x-xi) dxi = f(x) * delta(x)
$$

$f(x)$ のかわりに、デルタ関数 $delta(x-xi)$ について、

$$
G(x;xi)=L^(-1)[delta(x-xi)]
$$

を解く。この解 $G(x;xi)$ のことをグリーン関数という。

グリーン関数を$f(x)$で加重積分してもとの$f(x)$を戻してやると、解が得られる

$$

y(x) = L^(-1)[f(x)] \

= L^(-1)l[integral_(-oo)^("oo") f(xi)delta(x-xi) dxir] \

= integral_(-oo)^("oo") f(xi) L^(-1)[delta(x-xi)] dxi \

= integral_(-oo)^("oo") f(xi) G(x,xi) dxi


$$

### グリーン関数の求め方

フーリエ変換を使って求める。グリーン関数の逆フーリエ変換式

$$
G(x)=(1)/(2pi)integral_(-oo)^("oo")G(k)exp(ikx)dk
$$

デルタ関数の逆フーリエ変換式

$$
delta(x)=(1)/(2pi)integral_(-oo)^("oo")exp(ikx)dk
$$

これをグリーン関数の式

$$
L[G(x)]=delta(x)
$$

に代入して、

$$
Ll[(1)/(2pi)integral_(-oo)^("oo")G(k)exp(ikx)dkr]=(1)/(2pi)integral_(-oo)^("oo")exp(ikx)dk
$$

$L$ は $x$ に対して作用するので、

$$
integral_(-oo)^("oo")G(k)L[exp(ikx)]dk=integral_(-oo)^("oo")exp(ikx)dk
$$

$L$ は $exp(ikx)$ に作用すると、

$$
(dif^n )/(dif x^n) -> (ik)^n
$$

と数に変換される。

$$
L -> L(k)
$$

とおくと、

$$
integral_(-oo)^("oo")G(k)L(k)exp(ikx)dk=integral_(-oo)^("oo")exp(ikx)dk
$$

両辺の被積分関数を比較して、

$$
L(k)G(k)=1
$$

$k$空間のグリーン関数$G(k)$が求まったので、$x$空間に戻すと、

$$
G(x)=(1)/(2pi)integral_(-oo)^("oo")(1)/(L(k))exp(ikx)dk
$$

半円形の経路で複素積分して求める。円弧の部分は $0$ になる。$L(k)=0$ なる点 $k_0$ を探して留数定理で求める。

$$
upright(Res)(k_0)=l[(k-k_0)(1)/(L(k))exp(ikx)r]_(k=k_0)
$$

$$
G(x) = 2 pi i sum_(L(k)=0)  upright(Res)(k)
$$

### 多変数関数

$$
L[u(bold(r))]=f(bold(r))
$$

のグリーン関数は、

$$
L[G(bold(r);bold(r'))]=delta^3(bold(r)-bold(r'))
$$

## ラプラス方程式

$$
nabla^2 phi = 0
$$

$$
L=nabla^2
$$

### 直交座標

### 円筒座標

ベッセル関数

### 球座標

球面調和関数

## ポアソン方程式

$$
nabla^2 phi = f
$$

### グリーン関数

$$
L = nabla^2
$$

$$
L[G(bold(r))]=delta^3(bold(r)-bold(r'))
$$

逆フーリエ変換

$$
delta^3(bold(r)) = (1)/((2pi)^2) integral.triple_(-oo)^("oo") exp(ibold(k)dot.c bold(r))d^3bold(k)
$$

## ヘルムホルツ方程式

$$
nabla^2 u + alpha^2 u = 0
$$

### グリーン関数

$$
L = nabla^2 + alpha^2
$$

$$
L(k) = -k^2 + alpha^2
$$

$$
G(k)=(1)/(alpha^2-k^2)
$$

$$
G(x) = (1)/(2pi)integral_(-oo)^("oo") (1)/(alpha^2-k^2) exp(ikx) dk
$$

この特異点$k=plus.minus alpha$は実軸上にあるので、積分経路上から除かないといけない。

$$
integral_(-oo)^("oo") (1)/(k^2-(alpha+iepsilon.alt)^2) exp(ikx) dk
$$

$$
G(x)=-(i)/(2pi)exp(plus.minus ialpha x)
$$

## 拡散方程式

$$
(partial )/(partial t) phi = Dnabla^2 phi
$$

$$
L = D nabla^2 - (partial )/(partial t)
$$

### グリーン関数

$$

G(x,t;xi,tau)
=L^(-1)[delta(x-xi)delta(t-tau)] \

=-(1)/(2pi sqrt(pi D (t-tau)))exp lr((-((x-xi)^2)/(4D(t-tau))r))


$$

## 波動方程式

$$
(partial^2 )/(partial t^2)u = c^2nabla^2 u
$$

$$
L = c^2nabla^2 - (partial^2 )/(partial t^2)
$$

### グリーン関数

$$

G(x,t;xi,tau)
=L^(-1)[delta(x-xi)delta(t-tau)] \

=-(1)/(2pi sqrt(pi D (t-tau)))exp lr((-((x-xi)^2)/(4D(t-tau))r))


$$

## ラプラス方程式

$$
nabla^2 phi = 0
$$

## ポアソン方程式

$$
nabla^2 phi = rho
$$
