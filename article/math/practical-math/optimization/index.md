---
title: optimization
---

# 数理最適化

$$
newcommand{D}[2][]{(upright(D) #1)/(upright(D) #2)}
newcommand{d}[2][]{(upright(d) #1)/(upright(d) #2)}
newcommand{dd}[2][]{(upright(d)^2 #1)/(upright(d) {#2}^2)}
newcommand{pd}[2][]{(partial #1)/(partial #2)}
newcommand{pdd}[2][]{(partial^2 #1)/(partial {#2}^2)}
newcommand{pddd}[2][]{(partial^3 #1)/(partial {#2}^3)}
newcommand{Re}{upright(Re)}
newcommand{Im}{upright(Im)}
$$

## 線形計画法

## 非線形計画法

$$
max_(x_i) f(x_i) quad(g_j(x_i) <= 0,h_k(x_i)=0)
$$

ラグランジアン

$$
L(x_i,lambda_j,mu_k) = f(x_i) - lambda_jg_j(x_i) - mu_kh_k(x_i)
$$

KKT 条件

$$
(partial L)/(partial x_i)=0, (partial L)/(partial mu_k)=0 \\
 g_j(x_i) <= 0 , lambda_j >= 0, lambda_jg_j(x_i)=0
$$

双対問題

$$
l(lambda_j,mu_k)=max_(x_i) L(x_i,lambda_j,mu_k)
$$

$$
min_(lambda,mu) l(lambda_i,mu_k) quad (lambda_j>= 0)
$$

主問題の解 $x_i$ 双対問題の解 $lambda_j,mu_k$ に対して

$$
f(x_i)=l(lambda_j,mu_k)
$$
