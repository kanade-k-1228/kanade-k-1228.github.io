---
title: 確率論
---

$$
newcommand{bs}{backslash}
newcommand{cal(R)}{bb(R)}
newcommand{N}{bb(N)}
newcommand{bF}{bb(F)}
newcommand{O}{Omega}
newcommand{cal(F)}{cal(F)}
newcommand{A}{cal(A)}
newcommand{B}{cal(B)}
newcommand{G}{cal(G)}
$$

## 確率空間

測度空間 $(O,cal(F),P)$ が $P(O)=1$ を満たすとき，確率空間という．

### 確率変数

$X:O -> cal(R)$ が確率変数であるとは， $X$ が $cal(F)$ -可測 であること

確率変数の$P$に関する積分を期待値

$$
E[X] = integral X(omega) dP(omega)
$$

また $Aincal(F)$ について

$$
E[X,A] = E[X1_A]
$$

### 確率変数の加法族

$O$ 上の σ 加法族 $A$ が $A subset cal(F)$ となるとき部分 σ 加法族という

確率変数 $X$ が $A$ -可測 とは，任意の $AinB(cal(R))$ に対して $X^(-1)(A) in A$

確率変数に対して

$$
sigma(X) = {X^(-1)(A)|AinB(cal(R))}
$$

### 独立

部分 σ 加法族の列 $A_n$ が独立であるとは

$$
forall n quad forall A_kinA_k quad P(A_1 sect dots.h.c A_n) =  P(A_1)dots.h.c P(A_n)
$$

確立変数 $X_n$ が独立であるとは， $sigma(X_n)$ が独立であること

## マルチンゲール理論

### 条件付期待値

$G$ を部分 σ 加法族とすると

1. $G$ 可測
2. $forall AinG quad E[X,A]=E[Y,A]$

$Y$ を $X$ の $G$ の元での条件付き期待値といい， $E[X|G]$ と書く．

また同様に $Y'$ も上の条件を満たすとき，$Y=Y' a.s.$

### フィルトレーション

部分 σ 加法族の列 $bb(F)=(F_n)_("ninN")$ がフィルトレーションであるとは，

$$
forall n quad F_nsubsetF_(n+1)
$$

確率変数の列を確率過程と呼ぶ．

### マルチンゲール

フィルトレーション $bF$ に対して，確率過程 $X$ が $bF$ -マルチンゲールであるとは

1. $X_nin L^1$
2. $X_n$ は $F_n$-可測
3. $E[X_(n+1)|F_n] = X_n a.s.$
