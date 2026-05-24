---
title: 複素解析
icon: ocean
abst: ""
---

$$
newcommand{O}{cal(O)}
newcommand{cal(R)}{bb(R)}
newcommand{cal(C)}{bb(C)}
newcommand{S}{bb(S)}
$$

- 高橋礼司「複素解析」（東京大学出版会）

## 複素数体

### 位相

ユークリッド空間と同じように位相を入れる

- 絶対値から距離が作れる
- 距離を用いて $epsilon.alt$ 近傍 $N_epsilon.alt(z)$ が定義できる
- 開集合が定義できる

#### 粗

$cal(C)$ の部分集合 $D$ が粗であるとは， $D$ の任意の異なる元 $z_1,z_2$ をとったときに十分小さな $epsilon.alt$ をとれば

$$
N_epsilon.alt(z_1) sect N_epsilon.alt(z_2) = emptyset
$$

となること．

#### コンパクト集合

$cal(C)$ の部分集合 $K$ が以下の（同値な）性質を満たすとき，$K$はコンパクトであるという．

- $K$ の任意の点列は収束する部分列を含む
- $K$ は有界な閉集合
- 有限個の開集合で覆われている
- 有限個の閉集合との積が$emptyset$になる

#### 最大値の存在

コンパクト集合上で定義された実数値連続関数はある点で有限な最大値をとる

#### 一点コンパクト化

$cal(C)$ はコンパクトでないが $cal(C)union{oo}$ はコンパクト

#### リーマン球面

$cal(C)union{oo}$ と 球面 $S^2$ には同相写像が作れる

### 級数

級数 $sum u_n$ の収束判定法

- Cauchy

$$
limsup sqrt[n]{u_n} < 1
$$

- D'Alembert

$$
lim_(n->oo) (u_(n+1))/(u_n) < 1
$$

- Raabe

$$
lim_(n->oo) n lr(((u_n)/(u_(n+1))-1)) > 1
$$

べき級数 $sum c_n z^n$ の収束半径は

$$
R = lim_(n->oo)lr(|(c_n)/(c_(n+1))|)
$$

### 代数的構造

- $cal(R)^n$ に積を定義する
- $cal(C) tilde cal(R)^2$：可換・結合・分配・零因子なし
- $H tilde cal(R)^4$：結合・分配・零因子なし
- $O tilde cal(R)^8$：分配・零因子なし

#### Frobenius の定理

F は C または H に同形

#### Bott-Milnor の定理

$cal(R)^n$に積（分配・零因子なし）が存在するのは $n=1,2,3,8$ のみ

## 解析関数

解析学で扱う素性が良い関数

- 微分可能性・正則性
- 冪級数展開可能性

この強い条件がきれいな理論のベースになってる

### 正則関数

複素関数 $f(z)=X(x,y)+iY(x,y)$ が微分可能である条件

$$
(partial X)/(partial x) = (partial Y)/(partial y) quad (partial X)/(partial y) = -(partial Y)/(partial x)
$$

（コーシー・リーマンの関係式）

### 正則関数の特徴

- 正則関数 $f(z)$ を微分すると

$$
f'(z) = (partial X)/(partial x) + i (partial Y)/(partial x) = (partial Y)/(partial y) - i (partial X)/(partial y)
$$

- 正則関数は $macron(z)$ に依らない

$$
(partial f)/(partial macron(z)) = (partial f)/(partial x) (partial x)/(partial macron(z)) + (partial f)/(partial y) (partial y)/(partial macron(z)) = 0
$$

- 等角写像

### 初等関数の拡張

#### 指数関数

$$
e^z = e^(x+iy)
$$

#### 対数関数

$$
e^(log z) = z
$$

$$
log z = log |z| + i arg z = log r + i (theta + 2npi)
$$

多価関数だが，$arg$ の範囲を制限して主値をとる．

#### 三角関数

$$
cos z = (e^("iz")+e^(-iz))/(2) quad
sin z = (e^("iz")-e^(-iz))/(2i)
$$

$$
cos' z = -sin z quad
sin' z =  cos z
$$

$$
cos z = cos x cosh y - i sin x sinh y quad
sin z = sin x cosh y + i cos x sinh y
$$

## 複素積分

経路 $C(t)$ で積分する

### コーシーの積分定理

## 級数展開

## フーリエ変換

---

### 解析関数

### 冪級数で定義される関数

$$ f(z)=a_0+a_1z+a_2z^2... $$

収束半径 $ rho $ の円板上で連続，さらに正則である．この関数を形式的に微分した級数

$$ f'(z)=a_1+a_2z+a_3z^2... $$

も同じ収束半径で正則であるので，再帰的に，何回でも微分可能であることがわかる．

### 解析接続

ある２つの解析関数がある点の近傍で等しければ領域全体で等しい

### 零点

- $f(z)=0$ なる点
- 零関数以外の正則関数の零点集合は粗
- 零点の位数 k : $$ f(z)=(z-z_0)^kg(z) quad ( g(z_0) != 0 ) $$
- 微分すると位数は-1

### 有理型

$f(z)/g(z)$ は分母の零点（極）を除いた領域で解析的となる

## 等角写像

### 正則関数列

- H(D)：D 上の正則関数全体の集合
- H は C 上の無限線形空間 → 多元環

### 広義一様収束

### 距離

## 写像としての正則関数

### ある点近傍

## 楕円関数

### リウビルの基本定理
