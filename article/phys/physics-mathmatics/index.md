---
title: 物理数学
---

物理で使う数学をできるだけ早く使えるようなるためにまとめてあります．

## 線形代数

だいたいのものは微小にしたら線形

### 重要な概念

- 空間・基底・座標系・基底変換
- 固有値・固有空間

## ベクトル解析

### 場の微分

#### ナブラ

$$
nabla = mat(delim: "(", (d)/(d x); (d)/(d y); (d)/(d z))
$$

#### 勾配：スカラー場 → ベクトル場

$$
"grad" h = nabla h = mat(delim: "(", (d)/(d x)h; (d)/(d y)h; (d)/(d z)h)
$$

#### 発散：ベクトル場 → スカラー場

$$
upright(div) bold(h) = nabla dot.op bold(h) = (d)/(d x)h_x + (d)/(d y)h_y + (d)/(d z)h_z
$$

#### 回転：ベクトル場 → ベクトル場

$$
upright(upright("rot")) bold(h) = nabla times bold(h) = mat(delim: "(", (d)/(d y)h_z - (d)/(d z)h_y; (d)/(d z)h_x - (d)/(d x)h_z; (d)/(d x)h_y - (d)/(d y)h_x)
$$

#### ラプラシアン

$$
Delta = mat(delim: "(", (d^2)/(d x^2); (d^2)/(d y^2); (d^2)/(d z^2))
$$

#### 二階微分

$nabla$ を２回かけることを考えると，以下のパターンが考えられる．

$$
Delta bold(h) \
nabla dot.op (nabla h) = Delta h \
nabla times (nabla h) = 0 \
nabla dot.op (nabla times bold(h)) = 0 \
(nabla nabla) bold(h) = nabla^2 bold(h) \
nabla times (nabla times bold(h)) = nabla (nabla dot.op bold(h)) - nabla^2 bold(h) \
nabla (nabla dot.op bold(h)) = nabla times (nabla times bold(h)) + nabla^2 bold(h)
$$

### 場の積分

この積分を実際に解くときは，変数変換を行って実数上の積分に変換して解く．

#### 線積分：ベクトル場 → スカラー

ベクトル場の中の曲線 $C$ に沿ってベクトル場の値を積分する． 経路 $C$ の微小区間 $C$ と，その点でのベクトル場の値の内積を $C$ に渡って足し合わせる．

$$
integral_C bold(h) dot.op d bold(r)
$$

**1. $C$ を $t$ をパラメタとして表す．**

$$
C : bold(r)(t) = mat(delim: "(", r_x(t); r_y(t); r_z(t)) quad (t_A <= t <= t_B)
$$

**2. 経路の線素 $d bold(r)(t)$ を求める．（経路の線素とは，経路上の非常に近い二点間のベクトルです．）**

$$
(d bold(r)(t))/(d t) = lim_(Delta t -> 0) (bold(r)(t+Delta t) - bold(r)(t))/(Delta t) = mat(delim: "(", (r_x(t))/(d t); (r_y(t))/(d t); (r_z(t))/(d t)) = nabla bold(r)(t)
$$

**3. これをベクトル場と内積します．** このときに，経路上のある点でのベクトル場と，その点での線素ベクトルを内積することに注意して，

$$
bold(h)(bold(r)(t)) dot.op d bold(r)(t)
$$

これで $t$ の関数になりました．

**4. $t$ で積分します．**

$$
integral bold(h) dot.op d bold(r) = integral_(t_A)^(t_B) bold(h)(bold(r)(t)) dot.op d bold(r)(t) d t
$$

#### 勾配の線積分

スカラー場の勾配の線積分は経路によらず，元のスカラー場の始点と終点の差になる．もともとは各点に対し１つだった情報を３つに増やしていることに起因している．

逆に，線積分が経路によらないベクトル場に対して，あるスカラー場が存在して，ベクトル場をスカラー場の勾配として表すことができる．

#### 面積分：ベクトル場 → スカラー

ベクトル場中の面 $S$ 上のベクトル場の値を積分する．面を微小な平面 $dS$ に分割し， 微小面 $dS$ に垂直で，大きさが微小面の面積となるベクトル $d bold(s)$ と，その点でのベクトル場の値の内積を面 $S$ に渡って足し合わせる．

$$
integral_S bold(h) dot.op d bold(s)
$$

**1. $S$ をパラメタ $s, t$ を用いて表す．**

$$
bold(S)(s,t) = mat(delim: "(", S_x(s,t); S_y(s,t); S_z(s,t))
$$

**2. 微小面のベクトルを求める．**

$$
(bold(S)(s+Delta s, t) - bold(S)(s,t)) times (bold(S)(s, t+Delta t) - bold(S)(s,t)) -> (partial bold(S))/(partial s) d s times (partial bold(S))/(partial t) d t = d bold(s)
$$

**3. これをベクトル場と内積し積分する．**

$$
integral integral bold(h(bold(S)(s,t))) dot.op lr(((partial bold(S))/(partial s) times (partial bold(S))/(partial t))) d s d t
$$

#### 体積分：スカラー場 → スカラー

スカラー場をある領域 $V$ 内で足し合わせる．

$$
integral_V h(bold(r)) d bold(r)
$$

$$
integral integral integral h(x,y,z) d x d y d z
$$

#### 線積分 ↔ 回転の面積分(ストークスの定理)

$$
integral.cont_C bold(h) dot.op d bold(r) = integral_S (nabla times bold(h)) dot.op d bold(S)
$$

#### 面積分 ↔ 発散の体積分(ガウスの定理)

$$
integral_S bold(h) dot.op d bold(S) = integral.cont_V nabla dot.op bold(h) d V
$$

閉曲面の面積分は外向きを正とする．

## テンソル解析

## 4 元ベクトル

電場と磁場，電荷と電流は密接な関係があって，それをうまくまとめてやると，マクスウェル方程式は

$$
square.stroked A = J
$$

という単純な式になる．（こっちのほうが電磁気学のイメージアップに繋がる気がする．簡単そうじゃん．実際には混沌を綺麗にまとめてるだけといえばだけだけど．自然とは綺麗にまとめることが可能な混沌である，というのは物理学の信念な気がする．）

## 波動方程式

時間二階微分 = 伝達速度^2 空間二階微分

一次元のバネ質点系の振動は、行列の固有値問題

この行列は

$$
A = mat(-2, 1, 0, 0; 1, -2, 1, 0; 0, 1, -2, 1; 0, 0, 1, -2)
$$

対称行列になっている

波動方程式は微分演算子の固有値問題といえる

## グリーン関数

非同次方程式の解 = 同次方程式の解 + 非同次方程式の特解

特解を求めるための

### 例：一次元の波動方程式（定常）

$$
(partial^2 u)/(partial t^2) = c^2 (partial^2 u)/(partial x^2) + f(x,t) \
u(0,t)=0, u(L,t)=0 \
(partial u)/(partial t)=0
$$

定常条件を使って変形すると

$$
(partial^2 u)/(partial x^2) = -(f(x))/(c^2) = -F(x)
$$

一般の $F(x)$ について、解くための方法がグリーン関数を使う方法

まず $F(x)$ を分解する。

$$
F(x) = integral_0^L F(xi) delta(x-xi)
$$

それぞれの $delta$ についての

$$
(partial^2 u_G)/(partial x^2) = -delta(x-xi)
$$

を解く。この方程式の解がグリーン関数 $u_G$ である。

グリーン関数がわかれば、

$$
u(x) = integral_0^L F(xi) u_G(x) d xi
$$

とすれば解が求まる。

$$
F(xi) (partial^2 u_G)/(partial x^2) = -F(xi) delta(x-xi) \
integral_0^L F(xi) (partial^2 u_G)/(partial x^2) d xi = - integral_0^L F(xi) delta(x-xi) d xi \
= -F(x) \
(partial^2)/(partial x^2) lr({ integral_0^L F(xi) u_G(x) d xi }) = -F(x) \
(partial^2)/(partial x^2) u(x) = -F(x)
$$

### グリーン関数を求める

グリーン関数は

$$
(partial^2 u_G)/(partial x^2) = -delta(x-xi)
$$

### 例：熱伝導方程式

$$
(partial T)/(partial t) = alpha (partial^2 T)/(partial x^2) + q(x,t)
$$
