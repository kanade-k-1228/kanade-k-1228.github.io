---
title: 解析学
---

## 極限

平面上のあらゆる方向から近づける．

$$
\forall \varepsilon \gt 0 , \exists \delta \gt 0 \\
0 \lt |\boldsymbol{x}-\boldsymbol{a}|\lt\delta \\
\Rightarrow |f(\boldsymbol{x})-c|\lt\varepsilon
$$

例:

$$
f(x,y)=\frac{2xy}{x^2+y^2}\rightarrow???((x,y)\rightarrow(0,0))\\
(x,y)=(t\cos\theta,t\sin\theta)\\
f(x,y)=\frac{2t^2\sin\theta\cos\theta}{t^2(\sin^2\theta+\cos^2\theta)}=\sin(2\theta)\\
f\rightarrow\sin(2\theta)
$$

$\theta$に依存するため極限値は存在しない．

## 連続

$$
f(\boldsymbol{x})\rightarrow f(\boldsymbol{a})\\(\boldsymbol{x}\rightarrow\boldsymbol{a})
$$

### 二変数の中間値の定理

$$
\exists \boldsymbol{C}\in(\boldsymbol{A}と\boldsymbol{B}をつなぐ曲線)\\
f(\boldsymbol{A})\lt f(\boldsymbol{C})\lt f(\boldsymbol{A})
$$

## 偏微分

## 全微分

## 連鎖律

### 連鎖律１

$f(\boldsymbol{x})\)は\(U\subset \mathbb{R}^2$ 上の関数で，$\boldsymbol{x}=\boldsymbol{a}$ で全微分可能．
$x(t),y(t)$ は $I\subset \mathbb{R}$ 上の関数で，$(x(t),y(t))\in U(\forall t\in I)$，$t=c$ で微分可能．
このとき\(z(t)=f(x(t),y(t))\)は\(t=c\)で微分可能で，\[z'(c)=f_x(\boldsymbol{a})x'(c)+f_y(\boldsymbol{a})y'(c)\]
\(f(\boldsymbol{x})\)は\(U\)上で\(C^2\)級．
\(x(t),y(t),z(t)\)は\(I\)上で\(C^1\)級．
\[\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}\]

#### 証明

### 連鎖律２

\(x(s,t),y(s,t)\)は\(V\subset \mathbb{R}^2\)上の関数で，\((x(s,t),y(s,t))\in U(\forall (s,t)\in V)\)，\((s,t)=\boldsymbol{c}\)で全微分可能．
\(\boldsymbol{a}=(x(\boldsymbol{c}),y(\boldsymbol{c})\)．
このとき，\(V\)上の関数\(z=f(x(s,t),y(s,t))\)は\((s,t)=\boldsymbol{c}\)で微分可能で，

$$
z_s(\boldsymbol{c})=f_x(\boldsymbol{a})x_s(\boldsymbol{c})+f_y(\boldsymbol{a})y_s(\boldsymbol{c}) \\
z_t(\boldsymbol{c})=f_x(\boldsymbol{a})x_t(\boldsymbol{c})+f_y(\boldsymbol{a})y_t(\boldsymbol{c})
$$

\(f(\boldsymbol{x}),x(s,t),y(s,t)\)が\(C^1\)級ならば，\(z(s,t)\)も\(C^1\)級．
\[\frac{\partial z}{\partial s}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}\\
\frac{\partial z}{\partial t}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial t}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial t}\]

ヤコビ行列\(J\)を用いて，
\[J=\begin{pmatrix}
\frac{\partial x}{\partial s} & \frac{\partial x}{\partial t} \\
\frac{\partial y}{\partial s} & \frac{\partial y}{\partial t}
\end{pmatrix}\]
\[\left(\frac{\partial z}{\partial s},\frac{\partial z}{\partial t}\right)= \left(\frac{\partial z}{\partial x},\frac{\partial z}{\partial y}\right)J\]

ヤコビ行列の行列式をヤコビアンという．
\[\frac{\partial (x,y)}{\partial (s,t)}=\det J=\frac{\partial x}{\partial s}\frac{\partial y}{\partial t}-\frac{\partial x}{\partial t}\frac{\partial y}{\partial s}\]

座標変換で面積がヤコビアン倍される．

## 一般の写像

\(\boldsymbol{x}=\{x_1,x_2,,,x_n\},\boldsymbol{a}=\{a_1,a_2,,,a_n\}\in\mathbb{R}^n\)

\(U\subset\mathbb{R}^n\)を定義域とし，\(\mathbb{R}^m\)に値を持つ写像\(F:U\rightarrow\mathbb{R}^m\)は，\(F=(f_1,f_2,,,f_n)\)と書ける．ただし，\(f_i:U\rightarrow\mathbb{R}\)は n 変数関数．\[F が連続関数\Longleftrightarrow f_1,f_2,,,f_n が連続関数\]

### 偏微分

\[\frac{\partial F}{\partial x_j}=\left(\frac{\partial f_1}{\partial x_j},\frac{\partial f_2}{\partial x_j},,,\frac{\partial f_n}{\partial x_j}\right)\]

### 合成写像

\[V\rightarrow U\rightarrow\mathbb{R}^m\]

### 連鎖律

\[\frac{\partial z_i}{\partial t_j}=\frac{\partial z_i}{\partial x_1}\frac{\partial x_1}{\partial t_j}+,,,+\frac{\partial z_i}{\partial x_n}\frac{\partial x_n}{\partial t_j}\]

## 高次偏導関数

2 変数関数\(f(\boldsymbol{x})=f(x,y)\)の\(x\)に関する偏導関数\(f_x(\boldsymbol{x})\)が存在し，

## テイラーの定理

\[f(x,y)=\sum*{\substack{0 \geq m \geq M\\0 \geq n \geq N}}a*{m,n}x^my^n \\
\frac{\partial ^{i+j}}{\partial x^i \partial y^j}f(x,y)=\sum*{\substack{0 \geq m \geq M\\0 \geq n \geq N}}a*{m,n}m(m-1)...(m-i+1)n(n-1)...(n-j+1)x^{m-i}y^{n-j} \\
a*{i,j}=\frac{1}{i!j!}\frac{\partial ^{i+j}}{\partial x^i \partial y^j}f(0,0) \]
\[f(x,y)=\sum*{\substack{0 \geq m \geq M\\0 \geq n \geq N}}a*{m,n}(x-a)^m(y-b)^n \\
a*{i,j}=\frac{1}{i!j!}\frac{\partial ^{i+j}}{\partial x^i \partial y^j}f(a,b) \]

## 極大・極小

\(f(\boldsymbol{x})\)が\(\boldsymbol{x}=\boldsymbol{a}\)で極大・極小とは，\[\exists\delta\gt 0,0\lt |\boldsymbol{x}-\boldsymbol{a}|\lt\delta\\
\Rightarrow f(\boldsymbol{x})\lt\gt f(\boldsymbol{a})\]

以下，\(f(\boldsymbol{x})\)は\(\boldsymbol{a}\)の近くで定義された\(C^2\)関数，\(\boldsymbol{a}=(a,b)\)は\(f\)の停留点(\(f_x(\boldsymbol{x})=f_y(\boldsymbol{a})=0\))とする．

もし，\(f\)が\(\boldsymbol{a}\)で極小ならば，任意の方向で 2 階微分が正でなくてはいけない．

\(x=a+mt,y=b+nt\)として，\[\frac{d^2f}{dt}(0)=\left(m\frac{\partial}{\partial x}+n\frac{\partial}{\partial y}\right)^2f(\boldsymbol{a})=m^2f*{xx}(\boldsymbol{a})+2mnf*{xy}(\boldsymbol{a})+n^2f\_{yy}(\boldsymbol{a})\gt 0\]が全ての\((m,n)\not =(0,0)\)で成り立つ．

その必要十分条件は，\[f*{xx}(\boldsymbol{a})\gt 0,f*{yy}(\boldsymbol{a})\gt 0\\
\{f*{xy}(\boldsymbol{a})\}^2-f*{xx}(\boldsymbol{a})f\_{yy}(\boldsymbol{a})\lt 0\]

逆に，\(\{f*{xy}(\boldsymbol{a})\}^2-f*{xx}(\boldsymbol{a})f\_{yy}(\boldsymbol{a})\lt 0\)のとき，方向二階微分は正にも負にもなりうる．このとき\(\boldsymbol{a}\)は\(f(\boldsymbol{x})\)の峠点・鞍点という．

### ヘッシアン

\(C^2\)関数\(f(\boldsymbol{x})\)のヘッシアン

\[H(\boldsymbol{x}):=det\begin{pmatrix}
f*{xx} & f*{xy} \\
f*{yx} & f*{yy}
\end{pmatrix}=f*{xx}f*{yy}-\{f\_{xy}\}^2\]

## 曲線

### パラメタ曲線

\(f(t),g(t)\):\(I\in\mathbb{R}\)上の連続関数．

\(C=\left\{\left(\begin{array}{c}f(t)\\g(t)\end{array}\right)\in\mathbb{R}^2\middle|t\in I\right\}\in\mathbb{R}^2\)を\(t\)をパラメタとする曲線という．

※\(C\)は写像\(\left(\begin{array}{c}f\\g\end{array}\right):I\rightarrow\mathbb{R}^2\)の像

同じ曲線でもパラメタの取り方は様々．

### 微分可能な曲線

\(C\)は微分可能／\(C^1\)級の曲線である\(:=\)\(f(t),g(t)\)どちらも微分可能／\(C^1\)級

例：\(I\)上の関数\(f(x)\)のグラフは，\(C=\left\{\left(\begin{array}{c}x\\f(x)\end{array}\right)\middle|x\in I\right\}\)と\(x\)をパラメタとする曲線であり，\(f(x)\)が微分可能／\(C^1\)級\(\Longleftrightarrow\)\(C\)は微分可能／\(C^1\)級．

### 定理

\(\left(\begin{array}{c}x\\y\end{array}\right)=\left(\begin{array}{c}f(t)\\g(t)\end{array}\right)(t\in I)\)を\(C^1\)級の曲線とする．\(f'(a)\not=0(a\in I)\)ならば，\(t=a\)の近くで\(y\)は\(x\)の関数であり，\(\frac{dy}{dx}=\frac{g'(t)}{f'(t)}=\frac{\frac{dy}{dt}}{\frac{dx}{dt}}\)

#### 証明

\(f'(t)\gt 0\)の場合．

よって\(f(x)\)は単調増加なので，逆関数\(t=h(x)\)が存在する．

\(y=g(t)=g(h(x))\)と，\(x\)の\(C^1\)関数

\[\frac{dy}{dx}=\frac{dy}{dt}\frac{dt}{dx}=\frac{g'(t)}{f'(t)}\]

### 接線

曲線\(C:\left(\begin{array}{c}x\\y\end{array}\right)=\left(\begin{array}{c}f(t)\\g(t)\end{array}\right)(t\in I)\)は\(C^1\)級で\(a\in I,\left(\begin{array}{c}f(t)\\g(t)\end{array}\right)\not=\left(\begin{array}{c}0\\0\end{array}\right)\)とする．

このとき，点\(\left(\begin{array}{c}f(a)\\g(a)\end{array}\right)\)で\(C\)は接線を持ち，その式は，\[\left(\begin{array}{c}x\\y\end{array}\right)=k\left(\begin{array}{c}f'(a)\\g'(a)\end{array}\right)+\left(\begin{array}{c}f(a)\\g(a)\end{array}\right)(k\in\mathbb{R})\]または，\(k\)を消去して，\[f'(a)(y-g(a))=g'(a)(x-f(a))\]

### 例：サイクロイド

\[\boldsymbol{P}=\left(\begin{array}{c}t-\sin t\\1-\cos t\end{array}\right)=\left(\begin{array}{c}f(t)\\g(t)\end{array}\right)\]

\(f(t),g(t)\)が\(C^{\infty}\)級なので，\(C^{\infty}\)級の曲線．

\(f'(t)=1-\cos t\)なので，\(t\not=2\pi k(k\in\mathbb{Z})\)なら\(f'(t)\not=0\)．

\[\frac{dy}{dx}=\frac{\sin t}{1-\cos t}=\frac{2\sin \frac{t}{2} \cos \frac{t}{2}}{s\sin^2 \frac{t}{2}}=\frac{1}{\tan \frac{t}{2}}\]

\[\frac{d^2y}{dx^2}=\frac{d}{dx}\frac{dy}{dx}=\frac{d}{dt}\frac{dy}{dx}\frac{dt}{dx}=\left(\frac{1}{\tan \frac{t}{2}}\right)'(1-\cos t)^{-1}=-\frac{\sin^2\frac{t}{2}}{2(1-\cos t)}\lt 0\]

### 二階微分

\(x(t),y(t)\)が二階微分可能で，\(x'(a)\not=0\)のとき，\(t=a\)の近くで\(y\)は\(x\)で二階微分可能で，\[\frac{d^2y}{dx^2}=\frac{d}{dt}\frac{dy}{dx}\frac{dt}{dx}=\frac{d}{dt}\frac{y'(t)}{x'(t)}\frac{1}{\frac{dx}{dt}}=\frac{x'(t)y''(t)-x''(t)y'(t)}{\{x'(t)\}^3}\]

### 極座標表示を持つ曲線

\[\left(\begin{array}{c}x\\y\end{array}\right)=r(\theta)\left(\begin{array}{c}\cos \theta\\\sin \theta\end{array}\right)\]

\(r(\theta)\)が微分可能なとき，接ベクトルは，\[\left(\begin{array}{c}x'(\theta)\\y'(\theta)\end{array}\right)=r'(\theta)\left(\begin{array}{c}\cos \theta\\\sin \theta\end{array}\right)+r(\theta)\left(\begin{array}{c}-\sin \theta\\\cos \theta\end{array}\right)=\left(\begin{array}{c}\cos \theta & -\sin \theta \\\sin \theta & \cos \theta\end{array}\right)\left(\begin{array}{c}r'(\theta)\\r(\theta)\end{array}\right)\]

\[\left(\begin{array}{c}x'(\theta)\\y(\theta)\end{array}\right)=\left(\begin{array}{c}0\\0\end{array}\right)\Longleftrightarrow\left(\begin{array}{c}r'(\theta)\\r(\theta)\end{array}\right)=\left(\begin{array}{c}0\\0\end{array}\right)\]それ以外のとき，局所的にグラフ．

### 例：カージオイド

\[r(\theta)=1+\cos\theta\]

\[\left(\begin{array}{c}x'(\theta)\\y(\theta)\end{array}\right)=\left(\begin{array}{c}\sin\theta(1+2\cos\theta)\\0\end{array}\right)\Longleftrightarrow\left(\begin{array}{c}r'(\theta)\\r(\theta)\end{array}\right)=\left(\begin{array}{c}0\\0\end{array}\right)\]

## 陰関数定理

\(f(x,y):\{(a,b)近傍で定義,f(a,b)=0,C^1\}\)
\[f_y(a,b)\neq 0\Rightarrow \exists! \phi(x)
\left\{
\begin{array}{l}
\phi(a)=b \\
f(x,\phi(x))=0
\end{array}
\right.\]

\[\phi '(x)=-\frac{f_y(x,y)}{f_x(x,y)}\]

\(y=\phi(x)\)を\(f(x,y)\)の陰関数という．

#### 証明

\(C\)の\((a,b)\)における接線
\[f_x(a,b)(x-a)+f_y(a,b)(y-b)=0\]</p>

#### 例

## 特異点

\(f(x,y):C^1\)が定める曲線\(C:f(x,y)=0\)上の点\((a,b)\)が特異点であるとは，\[f_x(a,b)=f_y(a,b)=0\]

陰関数定理：非特異点の近くでは，C はグラフ

#### 例

## 条件付き極値

\(U:\)開集合，\(f(x,y),g(x,y):C^1\)，曲線\(C:g(x,y)=0\)

\((x,y)\)が\(C\)上を動くという条件下で\(f(x,y)\)の極値を考える．

\(C:(x,y)=(x(t),y(t))\)とパラメタ表示されるとき，\(f(x(t),y(t))\)の極値を考える．

とくに\(y=\phi(x)\)のグラフのとき，\(f(x,\phi(x))\)の極値を考えること．

### ラグランジュの未定乗数法

\(f(x,y),g(x,y):U 上,C^1\)

\(g(x,y)=0\)のとき\(f(a,b)\)で極値をとるとする．

\(F(x,y,\lambda):=f(x,y)-\lambda g(x,y)\)

\((a,b)\)が曲線\(C\)の特異点でない\[\Rightarrow \exists \lambda F_x(x,y,\lambda)=F_y(x,y,\lambda)=0\]

#### 証明

\(g_y(a,b)\neq 0\)の場合を考える．

\((a,b)\)の近くでは，\(C\)は\(y=\phi(x)\)

\[\begin{eqnarray}\frac{d}{dx}f(x,\phi(x))&=&f_x(x,y)+f_y(x,y)\phi'(x)\\&=&f_x(x,y)+f_y(x,y)\left(-\frac{g_x(x,y)}{g_y(x,y)}\right)\end{eqnarray}\]
