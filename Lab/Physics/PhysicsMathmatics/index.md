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
\nabla = \left(\begin{array}{c}
          \frac{d}{dx} \\
          \frac{d}{dy} \\
          \frac{d}{dz} \\
        \end{array}\right)
$$

#### 勾配：スカラー場 → ベクトル場

$$
\mathrm{grad} h
      = \nabla h
      = \left(\begin{array}{c}
        \frac{d}{dx}h \\
        \frac{d}{dy}h \\
        \frac{d}{dz}h \\
      \end{array}\right)
$$

#### 発散：ベクトル場 → スカラー場

$$
\mathrm{div}\boldsymbol{h}
      = \nabla \cdot\boldsymbol{h}
      = \frac{d}{dx}h_x + \frac{d}{dy}h_y + \frac{d}{dz}h_z
$$

#### 回転：ベクトル場 → ベクトル場

$$
\mathrm{rot}\boldsymbol{h}
     = \nabla\times\boldsymbol{h}
     = \left(
					\begin{array}{c}
					\frac{d}{dy}h_z - \frac{d}{dz}h_y \\
					\frac{d}{dz}h_x - \frac{d}{dx}h_z \\
					\frac{d}{dx}h_y - \frac{d}{dy}h_x \\
					\end{array}
				\right)
$$

#### ラプラシアン

$$
\Delta
      = \left(\begin{array}{c}
			    \frac{d^2}{dx^2} \\
			    \frac{d^2}{dy^2} \\
			    \frac{d^2}{dz^2} \\
			\end{array}\right)
$$

#### 二階微分

$\nabla$を２回かけることを考えると，以下のパターンが考えられる．

$$
\begin{aligned}
                                          & \Delta\boldsymbol{h}\\
\nabla\cdot(\nabla h)                     &= \Delta h\\
\nabla\times(\nabla h)                    &= 0\\
\nabla\cdot(\nabla\times\boldsymbol{h})   &= 0\\
(\nabla\nabla)\boldsymbol{h}              &= \nabla^2\boldsymbol{h}\\
\nabla\times(\nabla\times\boldsymbol{h})  &= \nabla(\nabla\cdot\boldsymbol{h})-\nabla^2\boldsymbol{h}\\
\nabla(\nabla\cdot\boldsymbol{h})         &= \nabla\times(\nabla\times\boldsymbol{h})+\nabla^2\boldsymbol{h}
\end{aligned}
$$

### 場の積分

この積分を実際に解くときは，変数変換を行って実数上の積分に変換して解く．

#### 線積分：ベクトル場 → スカラー</h3>

ベクトル場の中の曲線 $C$ に沿ってベクトル場の値を積分する． 経路 $C$ の微小区間 $C$ と，その点でのベクトル場の値の内積を $C$ に渡って足し合わせる．

$$
\int_C \boldsymbol{h} \cdot d \boldsymbol{r}
$$

1. $C$ を $t$ をパラメタとして表す．

   $$
   C : \boldsymbol{r}(t) = \left(\begin{array}{c} r_x(t) \\ r_y(t) \\ r_z(t) \end{array} \right) (t_A \leq t \leq t_B)
   $$

2. 経路の線素 $d\boldsymbol{r}(t)$ を求める．（経路の線素とは，経路上の非常に近い二点間のベクトルです．）

   $$
   \frac{d\boldsymbol{r}(t)}{dt}
       = \lim_{\Delta t \rightarrow 0}\frac{\boldsymbol{r}(t+\Delta t)-\boldsymbol{r}(t)}{\Delta t}
       = \left(\begin{array}{c} \frac{r_x(t)}{dt} \\ \frac{r_y(t)}{dt} \\ \frac{r_z(t)}{dt} \end{array} \right)
       = \nabla \boldsymbol{r}(t)
   $$

3. これをベクトル場と内積します．このときに，経路上のある点でのベクトル場と，その点での線素ベクトルを内積することに注意して，
   $$
   \boldsymbol{h}(\boldsymbol{r}(t))\cdot d\boldsymbol{r}(t)
   $$

これで $t$ の関数になりました．

4. $t$ で積分します．
   $$
   \int\boldsymbol{h}\cdot d\boldsymbol{r}
       = \int_{t_A}^{t_B} \boldsymbol{h}(\boldsymbol{r}(t))\cdot d\boldsymbol{r}(t) dt
   $$

#### 勾配の線積分

スカラー場の勾配の線積分は経路によらず，元のスカラー場の始点と終点の差になる．もともとは各点に対し１つだった情報を３つに増やしていることに起因している．

逆に，線積分が経路によらないベクトル場に対して，あるスカラー場が存在して，ベクトル場をスカラー場の勾配として表すことができる．

#### 面積分：ベクトル場 → スカラー

ベクトル場中の面 $S$ 上のベクトル場の値を積分する．面を微小な平面 $dS$ に分割し， 微小面 $dS$ に垂直で，大きさが微小面の面積となるベクトル $d\boldsymbol{s}$ と，その点でのベクトル場の値の内積を面 $S$ に渡って足し合わせる．

$$
\int_S \boldsymbol{h} \cdot d \boldsymbol{s}
$$

1. $S$ をパラメタ $s,t$ を用いて表す．

   $$
   \boldsymbol{S}(s,t) = \left(\begin{array}{c} S_x(s,t)\\	S_y(s,t)\\ S_z(s,t) \end{array}\right)
   $$

2. 微小面のベクトルを求める．

   $$
   \{(\boldsymbol{S}(s+\Delta s,t)-\boldsymbol{S}(s,t))\times (\boldsymbol{S}(s,t+\Delta t)-\boldsymbol{S}(s,t))\}\\
       \rightarrow \frac{\partial \boldsymbol{S}}{\partial s}ds \times \frac{\partial \boldsymbol{S}}{\partial t}dt
       =d\boldsymbol{s}
   $$

3. これをベクトル場と内積し積分する．
   $$
   \int \int \boldsymbol{h(\boldsymbol{S}(s,t))}\cdot
       \left(\frac{\partial \boldsymbol{S}}{\partial s} \times \frac{\partial \boldsymbol{S}}{\partial t}\right) dsdt
   $$

#### 体積分：スカラー場 → スカラー

スカラー場をある領域 $V$ 内で足し合わせる．

$$
\int_V h(\boldsymbol{r}) d\boldsymbol{r}
$$

$$
\int \int \int h(x,y,z) dxdydz
$$

#### 線積分 ↔ 回転の面積分(ストークスの定理)

$$
\oint_C \boldsymbol{h}\cdot d\boldsymbol{r}
    = \int_S(\nabla\times\boldsymbol{h})\cdot d\boldsymbol{S}
$$

#### 面積分 ↔ 発散の体積分(ガウスの定理)

$$
\int_S\boldsymbol{h}\cdot d\boldsymbol{S}
    = \oint_V\nabla\cdot\boldsymbol{h}dV
$$

閉曲面の面積分は外向きを正とする．

## テンソル解析

## 4 元ベクトル

電場と磁場，電荷と電流は密接な関係があって，それをうまくまとめてやると，マクスウェル方程式は

$$
\Box A = J
$$

という単純な式になる．（こっちのほうが電磁気学のイメージアップに繋がる気がする．簡単そうじゃん．実際には混沌を綺麗にまとめてるだけといえばだけだけど．自然とは綺麗にまとめることが可能な混沌である，というのは物理学の信念な気がする．）

## 波動方程式

時間二階微分 = 伝達速度^2 空間二階微分

一次元のバネ質点系の振動は、行列の固有値問題

この行列は

$$
A=\begin{matrix}
-2 & 1 & 0 & 0 \\
1 & -2 & 1 & 0 \\
0 & 1 & -2 & 1 \\
0 & 0 & 1 & -2
\end{matrix}
$$

対称行列になっている

波動方程式は微分演算子の固有値問題といえる

## グリーン関数

非同次方程式の解 = 同次方程式の解 + 非同次方程式の特解

特解を求めるための

### 例：一次元の波動方程式（定常）

$$
\pdd{u}{t} = c^2 \pdd{u}{x} + f(x,t) \\
u(0,t)=0, u(L,t)=0 \\
\pd{u}{t}=0
$$

定常条件を使って変形すると

$$
\pdd{u}{x}=-\f{f(x)}{c^2}=-F(x)
$$

一般の $F(x)$ について、解くための方法がグリーン関数を使う方法

まず$F(x)$を分解する。

$$
F(x) = \int_0^L F(\xi)\delta(x-\xi)
$$

それぞれの $\delta$ についての

$$
\pdd{u_G}{x}=-\delta(x-\xi)
$$

を解く。この方程式の解がグリーン関数 $u_G$ である。

グリーン関数がわかれば、

$$
u(x) = \int_0^L F(\xi)u_G(x) d\xi
$$

とすれば解が求まる。

$$
\begin{aligned}
F(\xi)\pdd{u_G}{x} &= -F(\xi)\delta(x-\xi) \\
\int_0^L F(\xi)\pdd{u_G}{x} d\xi &= - \int_0^L F(\xi)\delta(x-\xi) d\xi \\
&= -F(x) \\
\pdd{}{x} \l\{\int_0^L F(\xi)u_G(x) d\xi \r\} &= -F(x) \\
\pdd{}{x}u(x) &= -F(x)
\end{aligned}
$$

### グリーン関数を求める

グリーン関数は

$$
\pdd{u_G}{x}=-\delta(x-\xi)
$$

### 例：熱伝導方程式

$$
\pd{T}{t}=\alpha \pdd{T}{x} + q(x,t)
$$
