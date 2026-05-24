---
title: 解析学
icon: infinity
abst: ""
---

## 極限

平面上のあらゆる方向から近づける．

$$
forall epsilon.alt gt 0 , exists s delta gt 0 \\
0 lt |bold(x)-bold(a)|ltdelta \\
=> |f(bold(x))-c|ltepsilon.alt
$$

例:

$$
f(x,y)=(2xy)/(x^2+y^2)->???((x,y)->(0,0))\\
(x,y)=(tcostheta,tsintheta)\\
f(x,y)=(2t^2sinthetacostheta)/(t^2(sin^2theta+cos^2theta))=sin(2theta)\\
f->sin(2theta)
$$

$theta$に依存するため極限値は存在しない．

## 連続

$$
f(bold(x)) -> f(bold(a)) quad (bold(x) -> bold(a))
$$

### 二変数の中間値の定理

$bold(A)$ と $bold(B)$ をつなぐ曲線上のある点 $bold(C)$ について、

$$
f(bold(A)) < f(bold(C)) < f(bold(B))
$$

## 偏微分

## 全微分

## 連鎖律

### 連鎖律１

$f(bold(x))$は$Usubset bb(R)^2$ 上の関数で，$bold(x)=bold(a)$ で全微分可能．
$x(t),y(t)$ は $Isubset bb(R)$ 上の関数で，$(x(t),y(t))in U(forall tin I)$，$t=c$ で微分可能．
このとき $z(t)=f(x(t),y(t))$ は $t=c$ で微分可能で，

$$
z'(c)=f_x(bold(a))x'(c)+f_y(bold(a))y'(c)
$$

$f(bold(x))$は$U$上で$C^2$級．
$x(t),y(t),z(t)$は$I$上で$C^1$級．
$$(d z)/(d t)=(partial z)/(partial x)(d x)/(d t)+(partial z)/(partial y)(d y)/(d t)$$

#### 証明

### 連鎖律２

$x(s,t),y(s,t)$は$Vsubset bb(R)^2$上の関数で，$(x(s,t),y(s,t))in U(forall (s,t)in V)$，$(s,t)=bold(c)$で全微分可能．
$bold(a)=(x(bold(c)),y(bold(c))$．
このとき，$V$上の関数$z=f(x(s,t),y(s,t))$は$(s,t)=bold(c)$で微分可能で，

$$
z_s(bold(c))=f_x(bold(a))x_s(bold(c))+f_y(bold(a))y_s(bold(c)) \\
z_t(bold(c))=f_x(bold(a))x_t(bold(c))+f_y(bold(a))y_t(bold(c))
$$

$f(bold(x)),x(s,t),y(s,t)$が$C^1$級ならば，$z(s,t)$も$C^1$級．

$$
(partial z)/(partial s)=(partial z)/(partial x)(partial x)/(partial s)+(partial z)/(partial y)(partial y)/(partial s) \\
(partial z)/(partial t)=(partial z)/(partial x)(partial x)/(partial t)+(partial z)/(partial y)(partial y)/(partial t)
$$

ヤコビ行列$J$を用いて，
$$J=mat(delim: "(", (partial x)/(partial s), (partial x)/(partial t); (partial y)/(partial s), (partial y)/(partial t))$$
$$lr(((partial z)/(partial s),(partial z)/(partial t)))= lr(((partial z)/(partial x),(partial z)/(partial y)))J$$

ヤコビ行列の行列式をヤコビアンという．
$$(partial (x,y))/(partial (s,t))=det J=(partial x)/(partial s)(partial y)/(partial t)-(partial x)/(partial t)(partial y)/(partial s)$$

座標変換で面積がヤコビアン倍される．

## 一般の写像

$bold(x)={x_1,x_2,,,x_n},bold(a)={a_1,a_2,,,a_n}inbb(R)^n$

$U subset bb(R)^n$ を定義域とし，$bb(R)^m$ に値を持つ写像 $F:U -> bb(R)^m$ は，$F=(f_1,f_2,...,f_n)$ と書ける．ただし，$f_i:U -> bb(R)$ は n 変数関数．

$$
F text(" が連続関数") <==> f_1,f_2,...,f_n text(" が連続関数")
$$

### 偏微分

$$(partial F)/(partial x_j)=lr(((partial f_1)/(partial x_j),(partial f_2)/(partial x_j),,,(partial f_n)/(partial x_j)))$$

### 合成写像

$$V-> U -> bb(R)^m$$

### 連鎖律

$$(partial z_i)/(partial t_j)=(partial z_i)/(partial x_1)(partial x_1)/(partial t_j)+,,,+(partial z_i)/(partial x_n)(partial x_n)/(partial t_j)$$

## 高次偏導関数

2 変数関数$f(bold(x))=f(x,y)$の$x$に関する偏導関数$f_x(bold(x))$が存在し，

## テイラーの定理

$$
f(x,y) = sum_(0 <= m <= M, 0 <= n <= N) a_(m,n) x^m y^n \
(partial^(i+j))/(partial x^i partial y^j) f(x,y) = sum_(0 <= m <= M, 0 <= n <= N) a_(m,n) m(m-1)...(m-i+1) n(n-1)...(n-j+1) x^(m-i) y^(n-j) \
a_(i,j) = (1)/(i! j!) (partial^(i+j))/(partial x^i partial y^j) f(0,0)
$$

$$
f(x,y) = sum_(0 <= m <= M, 0 <= n <= N) a_(m,n) (x-a)^m (y-b)^n \
a_(i,j) = (1)/(i! j!) (partial^(i+j))/(partial x^i partial y^j) f(a,b)
$$

## 極大・極小

$f(bold(x))$が$bold(x)=bold(a)$で極大・極小とは，

$$
exists s delta > 0, 0 < |bold(x) - bold(a)| < delta \
=> f(bold(x)) gt.lt f(bold(a))
$$

以下，$f(bold(x))$は$bold(a)$の近くで定義された$C^2$関数，$bold(a)=(a,b)$は$f$の停留点($f_x(bold(x))=f_y(bold(a))=0$)とする．

もし，$f$が$bold(a)$で極小ならば，任意の方向で 2 階微分が正でなくてはいけない．

$x=a+m t, y=b+n t$として，

$$
(d^2 f)/(d t)(0) = lr((m (partial)/(partial x) + n (partial)/(partial y)))^2 f(bold(a)) = m^2 f_(x x)(bold(a)) + 2 m n f_(x y)(bold(a)) + n^2 f_(y y)(bold(a)) > 0
$$

が全ての$(m,n) != (0,0)$で成り立つ．

その必要十分条件は，

$$
f_(x x)(bold(a)) > 0, f_(y y)(bold(a)) > 0 \
{f_(x y)(bold(a))}^2 - f_(x x)(bold(a)) f_(y y)(bold(a)) < 0
$$

逆に，$(f_(x y)(bold(a)))^2 - f_(x x)(bold(a)) f_(y y)(bold(a)) < 0$のとき，方向二階微分は正にも負にもなりうる．このとき$bold(a)$は$f(bold(x))$の峠点・鞍点という．

### ヘッシアン

$C^2$関数$f(bold(x))$のヘッシアン

$$
H(bold(x)) := det mat(delim: "(", f_(x x), f_(x y); f_(y x), f_(y y)) = f_(x x) f_(y y) - (f_(x y))^2
$$

## 曲線

### パラメタ曲線

$f(t),g(t)$:$Iinbb(R)$上の連続関数．

$C = { mat(delim: "(", f(t); g(t)) in bb(R)^2 bar t in I } in bb(R)^2$を$t$をパラメタとする曲線という．

※$C$は写像$mat(delim: "(", f; g) : I -> bb(R)^2$の像

同じ曲線でもパラメタの取り方は様々．

### 微分可能な曲線

$C$は微分可能／$C^1$級の曲線である$:=$$f(t),g(t)$どちらも微分可能／$C^1$級

例：$I$上の関数$f(x)$のグラフは，$C = { mat(delim: "(", x; f(x)) bar x in I }$と$x$をパラメタとする曲線であり，$f(x)$が微分可能／$C^1$級$<==>$$C$は微分可能／$C^1$級．

### 定理

$mat(delim: "(", x; y) = mat(delim: "(", f(t); g(t)) quad (t in I)$を$C^1$級の曲線とする．$f'(a) != 0 (a in I)$ならば，$t=a$の近くで$y$は$x$の関数であり，$(d y)/(d x) = (g'(t))/(f'(t)) = ((d y)/(d t))/((d x)/(d t))$

#### 証明

$f'(t)gt 0$の場合．

よって$f(x)$は単調増加なので，逆関数$t=h(x)$が存在する．

$y=g(t)=g(h(x))$と，$x$の$C^1$関数

$$(d y)/(d x)=(d y)/(d t)(d t)/(d x)=(g'(t))/(f'(t))$$

### 接線

曲線$C : mat(delim: "(", x; y) = mat(delim: "(", f(t); g(t)) quad (t in I)$は$C^1$級で，$a in I, mat(delim: "(", f(t); g(t)) != mat(delim: "(", 0; 0)$とする．

このとき，点$mat(delim: "(", f(a); g(a))$で$C$は接線を持ち，その式は，

$$
mat(delim: "(", x; y) = k mat(delim: "(", f'(a); g'(a)) + mat(delim: "(", f(a); g(a)) quad (k in bb(R))
$$

または，$k$を消去して，

$$
f'(a) (y - g(a)) = g'(a) (x - f(a))
$$

### 例：サイクロイド

$$
bold(P) = mat(delim: "(", t - sin t; 1 - cos t) = mat(delim: "(", f(t); g(t))
$$

$f(t),g(t)$が$C^("oo")$級なので，$C^("oo")$級の曲線．

$f'(t)=1-cos t$なので，$t != 2 pi k (k in bb(Z))$なら$f'(t) != 0$．

$$(d y)/(d x)=(sin t)/(1-cos t)=(2sin (t)/(2) cos (t)/(2))/(ssin^2 (t)/(2))=(1)/(tan (t)/(2))$$

$$(d^2y)/(d x^2)=(d)/(d x)(d y)/(d x)=(d)/(d t)(d y)/(d x)(d t)/(d x)=lr(((1)/(tan (t)/(2))))'(1-cos t)^(-1)=-(sin^2(t)/(2))/(2(1-cos t))lt 0$$

### 二階微分

$x(t),y(t)$が二階微分可能で，$x'(a)not=0$のとき，$t=a$の近くで$y$は$x$で二階微分可能で，$$(d^2y)/(d x^2)=(d)/(d t)(d y)/(d x)(d t)/(d x)=(d)/(d t)(y'(t))/(x'(t))(1)/((d x)/(d t))=(x'(t)y''(t)-x''(t)y'(t))/({x'(t)}^3)$$

### 極座標表示を持つ曲線

$$
mat(delim: "(", x; y) = r(theta) mat(delim: "(", cos theta; sin theta)
$$

$r(theta)$が微分可能なとき，接ベクトルは，

$$
mat(delim: "(", x'(theta); y'(theta)) = r'(theta) mat(delim: "(", cos theta; sin theta) + r(theta) mat(delim: "(", -sin theta; cos theta) = mat(delim: "(", cos theta, -sin theta; sin theta, cos theta) mat(delim: "(", r'(theta); r(theta))
$$

$$
mat(delim: "(", x'(theta); y'(theta)) = mat(delim: "(", 0; 0) <==> mat(delim: "(", r'(theta); r(theta)) = mat(delim: "(", 0; 0)
$$

それ以外のとき，局所的にグラフ．

### 例：カージオイド

$$
r(theta) = 1 + cos theta
$$

$$
mat(delim: "(", x'(theta); y'(theta)) = mat(delim: "(", sin theta (1 + 2 cos theta); 0) <==> mat(delim: "(", r'(theta); r(theta)) = mat(delim: "(", 0; 0)
$$

## 陰関数定理

$f(x,y):{(a,b)$近傍で定義$, f(a,b)=0, C^1}$

$$
f_y(a,b) != 0 => exists s! phi(x) ; cases(phi(a) = b\, , f(x, phi(x)) = 0)
$$

$$phi '(x)=-(f_y(x,y))/(f_x(x,y))$$

$y=phi(x)$を$f(x,y)$の陰関数という．

#### 証明

$C$の$(a,b)$における接線
$$f_x(a,b)(x-a)+f_y(a,b)(y-b)=0$$</p>

#### 例

## 特異点

$f(x,y):C^1$が定める曲線$C:f(x,y)=0$上の点$(a,b)$が特異点であるとは，$$f_x(a,b)=f_y(a,b)=0$$

陰関数定理：非特異点の近くでは，C はグラフ

#### 例

## 条件付き極値

$U:$開集合，$f(x,y),g(x,y):C^1$，曲線$C:g(x,y)=0$

$(x,y)$が$C$上を動くという条件下で$f(x,y)$の極値を考える．

$C:(x,y)=(x(t),y(t))$とパラメタ表示されるとき，$f(x(t),y(t))$の極値を考える．

とくに$y=phi(x)$のグラフのとき，$f(x,phi(x))$の極値を考えること．

### ラグランジュの未定乗数法

$f(x,y),g(x,y):U 上,C^1$

$g(x,y)=0$のとき$f(a,b)$で極値をとるとする．

$F(x,y,lambda):=f(x,y)-lambda g(x,y)$

$(a,b)$が曲線$C$の特異点でない$$=> exists s lambda F_x(x,y,lambda)=F_y(x,y,lambda)=0$$

#### 証明

$g_y(a,b)!= 0$の場合を考える．

$(a,b)$の近くでは，$C$は$y=phi(x)$

$$
begin{eqnarray}(d)/(d x)f(x,phi(x))&=&f_x(x,y)+f_y(x,y)phi'(x)\
&=&f_x(x,y)+f_y(x,y)lr((-(g_x(x,y))/(g_y(x,y))))end{eqnarray}
$$
