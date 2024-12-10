---
title: 確率論
---

$$
\newcommand{\bs}{\backslash}
\newcommand{\R}{\mathbb{R}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\bF}{\mathbb{F}}
\newcommand{\O}{\Omega}
\newcommand{\F}{\mathcal{F}}
\newcommand{\A}{\mathcal{A}}
\newcommand{\B}{\mathcal{B}}
\newcommand{\G}{\mathcal{G}}
$$

## 確率空間

測度空間 $(\O,\F,P)$ が $P(\O)=1$ を満たすとき，確率空間という．

### 確率変数

$X:\O\rightarrow\R$ が確率変数であるとは， $X$ が $\F$ -可測 であること

確率変数の$P$に関する積分を期待値

$$
E[X] = \int X(\omega) dP(\omega)
$$

また $A\in\F$ について

$$
E[X,A] = E[X1_A]
$$

### 確率変数の加法族

$\O$ 上の σ 加法族 $\A$ が $\A \subset \F$ となるとき部分 σ 加法族という

確率変数 $X$ が $\A$ -可測 とは，任意の $A\in\B(\R)$ に対して $X^{-1}(A) \in \A$

確率変数に対して

$$
\sigma(X) = \{X^{-1}(A)|A\in\B(\R)\}
$$

### 独立

部分 σ 加法族の列 $\A_n$ が独立であるとは

$$
\forall n \quad \forall A_k\in\A_k \quad P(A_1 \cap \cdots A_n) =  P(A_1)\cdots P(A_n)
$$

確立変数 $X_n$ が独立であるとは， $\sigma(X_n)$ が独立であること

## マルチンゲール理論

### 条件付期待値

$\G$ を部分 σ 加法族とすると

1. $\G$ 可測
2. $\forall \A\in\G \quad E[X,A]=E[Y,A]$

$Y$ を $X$ の $\G$ の元での条件付き期待値といい， $E[X|\G]$ と書く．

また同様に $Y'$ も上の条件を満たすとき，$Y=Y' a.s.$

### フィルトレーション

部分 σ 加法族の列 $\mathbb{F}=(\F_n)_{n\in\N}$ がフィルトレーションであるとは，

$$
\forall n \quad \F_n\subset\F_{n+1}
$$

確率変数の列を確率過程と呼ぶ．

### マルチンゲール

フィルトレーション $\bF$ に対して，確率過程 $X$ が $\bF$ -マルチンゲールであるとは

1. $X_n\in L^1$
2. $X_n$ は $\F_n$-可測
3. $E[X_{n+1}|\F_n] = X_n a.s.$
