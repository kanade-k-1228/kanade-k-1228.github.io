---
title: 測度論
---

$$
\newcommand{\bs}{\backslash}
\newcommand{\R}{\mathbb{R}}
\newcommand{\F}{\mathcal{F}}
$$

## 測度論のお気持ち

- ルベーグ積分
  - リーマン積分を集合論から考える
  - 「無限」を集合論を通じて明確にしたい
  - その中で「測度」という概念が生まれた
  - 現代的な（集合論的な）解析学の基礎となっている
- 何がうれしいか
  - 無限がきちんと定義される
    - 積分と極限を簡単に入れ替えられる

## 可測空間

集合 $S$ とその部分集合族 $\Sigma$ の組 $(S,\Sigma)$ が可測空間であるとは，

1. 空集合を含む $\emptyset \in \Sigma$
2. 余集合について閉じている $A\in\Sigma\Rightarrow A^C(=S\bs A) \in \Sigma$
3. 和集合について閉じている $A_i\subset\Sigma \Rightarrow \cup_i^\infty A_i\in\Sigma$

$\Sigma$ を σ 加法族という．

### 性質

- 全集合と空集合を含む
- 和集合・差集合・余集合・積集合について閉じている

基本的な集合演算について閉じた集合族になっている（逆にこれだけしか要請しないというのはすごい）

### 加法族の入れ方の例

- 最小の加法族
  - $\Sigma=\{S,\emptyset\}$
- １点 $A \subset S$
  - $\Sigma=\{S,A,A^C,\emptyset\}$

## Borel 集合族

$\R \cup \{\infty,-\infty\}$が生成する加法族を $\mathcal{B}(\R)$　という

## 可測関数

$(S_1,\Sigma_1),(S_2,\Sigma_2)$ を可測空間とする．

写像 $f : S_1\rightarrow S_2$ が $\Sigma_1/\Sigma_2$ 可測であるとは，

$$
\forall A\in\Sigma_2 \quad f^{-1}(A) \in \Sigma_1
$$

加法族の引き戻しが加法族であること

※ これは位相空間で開集合を用いて連続を定義したのと同じ

### 実数への写像

### 性質

## 測度空間

可測空間 $(S,\Sigma)$ と写像 $\mu: \Sigma \rightarrow [0,\infty]$ の組 $(S,\Sigma,\mu)$ が可測空間であるとは，

1. $\mu(\emptyset)=0$
2. 互いに素な集合 $A_i \subset \Sigma$ について $\mu(\cup_i^\infty A_i) = \sum_i^\infty \mu(A_i)$ （加算加法性）

$\mu$ を測度という

### ルベーグ測度

$(\R,\mathcal{B}(\R))$ 上の測度 $\mu$ で

$$
\mu([a,b))=b-a
$$

なる測度が唯一存在し，ルベーグ測度という

## 積分

$\Sigma$ -可測関数 $f:S\rightarrow\R$ に対して積分は

$$
\int f d\mu = \int f^+ d\mu - \int f^- d\mu
$$

$\int f d\mu \in \R$ のとき $f$ を可積分という

### ルベーグ積分

$f:\R\rightarrow\R$ を $\mathcal{B}(\R)$-可測関数（ボレル可測関数）とする

$$
\int_a^b f(x) dx = \int f1_{[a,b]} dx
$$

### 単調収束定理

$\Sigma$-可測な関数列 $f_n$ が単調増加（$\forall x \in S 0 \leq f_n(x) \leq f_{n+1}(x)$）のとき

$$
\int f(x) d\mu(x) = \lim_{n\rightarrow \infty} \int f_n(x)d\mu(x)
$$

なる $\Sigma$-可測関数 $f(x)$ が存在する

※ 収束先が $\Sigma$ -可測関数上にある

### ファトゥの定理

$$
\int \liminf_{n\rightarrow\infty} f_n(x) d\mu(x) \leq \liminf_{n\rightarrow\infty} \int f_n(x) d\mu(x)
$$

### ルベーグの優収束定理

$\forall x\in S \exist f(x)=\lim f_n(x)$

ある可積分関数 $g$ に対し $|f_n(x)|\leq g(x)$

$$
\int f(x)d\mu(x) = \lim_{n\rightarrow\infty} \int f_n(x) d\mu(x)
$$

### ディリクレ関数の積分

#### 有理数の測度
