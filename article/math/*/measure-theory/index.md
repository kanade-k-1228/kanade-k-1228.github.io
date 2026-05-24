---
title: 測度論
icon: balance_scale
abst: ""
---

$$
newcommand{bs}{backslash}
newcommand{cal(R)}{bb(R)}
newcommand{cal(F)}{cal(F)}
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

集合 $S$ とその部分集合族 $Sigma$ の組 $(S,Sigma)$ が可測空間であるとは，

1. 空集合を含む $emptyset in Sigma$
2. 余集合について閉じている $A in Sigma => A^C (= S backslash A) in Sigma$
3. 和集合について閉じている $A_isubsetSigma => union_i^oo A_iinSigma$

$Sigma$ を σ 加法族という．

### 性質

- 全集合と空集合を含む
- 和集合・差集合・余集合・積集合について閉じている

基本的な集合演算について閉じた集合族になっている（逆にこれだけしか要請しないというのはすごい）

### 加法族の入れ方の例

- 最小の加法族
  - $Sigma={S,emptyset}$
- １点 $A subset S$
  - $Sigma={S,A,A^C,emptyset}$

## Borel 集合族

$cal(R) union {oo,-oo}$が生成する加法族を $cal(B)(cal(R))$　という

## 可測関数

$(S_1,Sigma_1),(S_2,Sigma_2)$ を可測空間とする．

写像 $f : S_1-> S_2$ が $Sigma_1/Sigma_2$ 可測であるとは，

$$
forall AinSigma_2 quad f^(-1)(A) in Sigma_1
$$

加法族の引き戻しが加法族であること

※ これは位相空間で開集合を用いて連続を定義したのと同じ

### 実数への写像

### 性質

## 測度空間

可測空間 $(S,Sigma)$ と写像 $mu: Sigma -> [0,oo]$ の組 $(S,Sigma,mu)$ が可測空間であるとは，

1. $mu(emptyset)=0$
2. 互いに素な集合 $A_i subset Sigma$ について $mu(union_i^oo A_i) = sum_i^oo mu(A_i)$ （加算加法性）

$mu$ を測度という

### ルベーグ測度

$(cal(R),cal(B)(cal(R)))$ 上の測度 $mu$ で

$$
mu([a,b))=b-a
$$

なる測度が唯一存在し，ルベーグ測度という

## 積分

$Sigma$ -可測関数 $f:S -> cal(R)$ に対して積分は

$$
integral f dmu = integral f^+ dmu - integral f^- dmu
$$

$integral f dmu in cal(R)$ のとき $f$ を可積分という

### ルベーグ積分

$f:cal(R)-> cal(R)$ を $cal(B)(cal(R))$-可測関数（ボレル可測関数）とする

$$
integral_a^b f(x) d x = integral f1_([a,b]) d x
$$

### 単調収束定理

$Sigma$-可測な関数列 $f_n$ が単調増加（$forall x in S 0 <= f_n(x) <= f_(n+1)(x)$）のとき

$$
integral f(x) dmu(x) = lim_(n-> oo) integral f_n(x)dmu(x)
$$

なる $Sigma$-可測関数 $f(x)$ が存在する

※ 収束先が $Sigma$ -可測関数上にある

### ファトゥの定理

$$
integral liminf_(n->oo) f_n(x) dmu(x) <= liminf_(n->oo) integral f_n(x) dmu(x)
$$

### ルベーグの優収束定理

$forall xin S exists f(x)=lim f_n(x)$

ある可積分関数 $g$ に対し $|f_n(x)|<= g(x)$

$$
integral f(x)dmu(x) = lim_(n->oo) integral f_n(x) dmu(x)
$$

### ディリクレ関数の積分

#### 有理数の測度
