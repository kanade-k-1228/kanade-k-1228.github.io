# 数理最適化

$$
\newcommand{\D}[2][]{\frac{\mathrm{D} #1}{\mathrm{D} #2}}
\newcommand{\d}[2][]{\frac{\mathrm{d} #1}{\mathrm{d} #2}}
\newcommand{\dd}[2][]{\frac{\mathrm{d}^2 #1}{\mathrm{d} {#2}^2}}
\newcommand{\pd}[2][]{\frac{\partial #1}{\partial #2}}
\newcommand{\pdd}[2][]{\frac{\partial^2 #1}{\partial {#2}^2}}
\newcommand{\pddd}[2][]{\frac{\partial^3 #1}{\partial {#2}^3}}
\newcommand{\Re}{\mathrm{Re}}
\newcommand{\Im}{\mathrm{Im}}
$$

## 線形計画法

## 非線形計画法

$$
\max_{x_i} f(x_i) \quad(g_j(x_i) \leq 0,h_k(x_i)=0)
$$

ラグランジアン

$$
L(x_i,\lambda_j,\mu_k) = f(x_i) - \lambda_jg_j(x_i) - \mu_kh_k(x_i)
$$

KKT 条件

$$
\pd[L]{x_i}=0, \pd[L]{\mu_k}=0 \\
 g_j(x_i) \leq 0 , \lambda_j \geq 0, \lambda_jg_j(x_i)=0
$$

双対問題

$$
l(\lambda_j,\mu_k)=\max_{x_i} L(x_i,\lambda_j,\mu_k)
$$

$$
\min_{\lambda,\mu} l(\lambda_i,\mu_k) \quad (\lambda_j\geq 0)
$$

主問題の解 $x_i$ 双対問題の解 $\lambda_j,\mu_k$ に対して

$$
f(x_i)=l(\lambda_j,\mu_k)
$$
