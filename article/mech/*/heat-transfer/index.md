---
title: 伝熱工学
icon: fire
abst: ""
---

熱工学第二のノート

教科書：庄司正弘「伝熱工学」

## 伝熱の形態

### 熱伝導

- フーリエの法則

  $$
  q = (dQ)/(dA) = -lambda (dT)/(d x)
  $$

  $ text("熱流束") = text("断面あたりの通過熱量") = - text("温度勾配") $

### 熱伝達 (Convective Heat Transfer)

- 分子の集団が移動しながら熱エネルギーを伝える
- ニュートンの冷却法則
  $$
  q = h(T_w-T_oo)
  $$
- 強制対流（ファン）
- 自然対流

### 熱放射 (Thermal Radiation)

- ステファン-ボルツマンの式（黒体の熱放射）
  $$
  q_b = sigma T^4
  $$
- 実際は黒体ほどではない Gray Body

### いろいろ

- 相変化，
- 物質移動
- 高速
- 希薄
- マイクロ
- 極低温
- 超流動
- 超高速
- 非フーリエ
- バイオ：食品

## 熱伝導率・温度伝導率

### 気体

$$ alpha = (lambda)/(rho c)=(1)/(3)vl $$

- 理想気体

### 液体

$$ alpha = a l_0 $$

- $a$ : 音速
- $l_0^3$ : 分子が占める体積

### 固体

$$ lambda = lambda_p + lambda_e $$

- $lambda_p$ : フォノン（格子振動）
- $lambda_e=(1)/(3)rho c$? : 自由電子
- 金属
- 常温の金属では $lambda_e>>lambda_p$
- 格子振動による散乱
  - 界面・欠陥などによる散乱
  - $$ lambda_e = (1)/(aT^2 + b/T)$$
- Wiedemann-Franz-Lorenz 式（熱伝導率と電気伝導率の関係）
  $$ (lambda_e)/(sigma T) = (pi^2)/(3)lr(((k)/(e)))^2 = 2.45times10^(-8)lr([(V^2)/(K^2)]) $$
- 格子振動
  $$ lambda_p=(1)/(3)rho c v_p l_p $$
- $c$ : フォノンの比熱
- $rho$ :
- $c$ :

## 熱伝導

### 熱伝導方程式

$$
rho c partial_t T = partial_i(lambda^i   partial^i T) + w
$$

#### 等方性材料 ($lambda_x=lambda_y=lambda_z=lambda$)

$$
rho c partial_t T = partial_i(lambda   partial^i T) + w
$$

#### 定物性

$$
partial_t T = alpha partial_i partial^i T +  (w)/(rho c)
$$

温度伝導率 $alpha := (lambda)/(rho c)$

#### 定常

$$
 partial_ipartial^i T +  (w)/(lambda)=0
$$

ポアソン型の偏微分方程式

#### 内部発熱なし

$$
 partial_ipartial^i T =0
$$

ラプラス方程式

### 初期条件

$$
T(t=0)=T(x,y,z)
$$

### 境界条件

表面のある微小面$s$でのエネルギーバランスを考える．微小面の法線方向の軸$n$，加熱量$q_s$，外界の無限遠点までの熱伝達率$h$とすると，

$$
-lambda(partial T)/(partial n) - h (T_s - T_oo) + q_s=0
$$

#### 第 1 種 : 温度 : $h-> oo$

$$
T_s=T_oo
$$

#### 第 2 種 : 熱流束 : $h-> 0$

$$
lambdapartial_n T = q_s
$$

#### 第 3 種 : 熱伝達 : $q_s = 0$

$$
-lambdapartial_n T = h (T_s-T_oo)
$$

### 無次元化

## 1 次元定常熱伝導

対称な空間（平板，円柱，球殻）の熱伝導

$$
(1)/(r^sigma)partial_r(lambda r^sigmapartial_r T) + w = 0
$$

### 平板

$$
partial_x (lambda partial_x T) + w = 0
$$

x で積分して，

$$
lambdapartial_x T + integral_0^x w d x = c_1
$$

熱伝導率・内部発熱が一定の場合は，

$$
lambdapartial_x T + w x = c_1
$$

x で積分して，

$$
T = -(w)/(2lambda)x^2 + c_1 x + c_2
$$

境界条件

- $T(x_1)=T_1quad T(x_2)=T_2$

- $T(0)=T_1quad -lambdapartial_x T = h(T_2-T_oo)$

## いろいろな熱伝導

### 熱抵抗

$$
Q=(Delta T)/(R)
$$

直列接続は和

- 多層平板

$$
(1)/(A)lr(((1)/(h_a) + (d_i)/(lambda_i) + (1)/(h_b) ))
$$

- 多層円管

$$
(1)/(2 pi L)lr(((1)/(r_ah_a) + (1)/(lambda_i)ln(r_i)/(r_(i-1)) + (1)/(r_bh_b) ))
$$

接触面がきちんと熱的に接続されていないと接触抵抗が生じる

界面が汚れていると抵抗が生じる

### フィン

面積 $A$のヒートシンクを考える

フィンがない場合の熱抵抗は

$$
(1)/(A)lr(((1)/(h_L)+(d)/(lambda)+(1)/(h_G)))
$$

気体側にフィンがある場合は $h_G$ の面積が増加し

$$
(1)/(A)lr(((1)/(h_L)+(d)/(lambda)+(A)/(A_o+A_f)(1)/(h_G)))
$$

しかし実際にはフィンの先端にいくほど伝熱量が減るので

$$
(1)/(A)lr(((1)/(h_L)+(d)/(lambda)+(A)/(A_o+eta A_f)(1)/(h_G)))
$$

$eta$ をフィン効率という

### フィンの解析

$$
d{x}lr((Alambdad[T]{x}))-hL(x)(T-T_oo)=0
$$

断面が一定の矩形の場合

$$
dd[T]{x} -m^2(T-T_oo) =0
$$

フィンの先端を考えない（断熱）とき，境界条件 $T(0)=T_0$ $d[T]{x}(L)=0$

$$
T-T_oo = (T_0-T_oo) (cosh (mL-mx))/(cosh (mL))
$$

全表面からの放熱量は

$$
Q=integral_0^L hP(T-T_oo) d x = sqrt(hPlambda A)(T_0-T_oo)tanh(mL)
$$

フィン効率は

$$
eta = (tanh (mL))/(mL)
$$

### ステファン問題

氷が解けて固相と液相の境界が移動する場合など

## 熱伝達

物体表面 $T_S$から雰囲気 $T_oo$ への熱流束を単純に表すと

$$
q=h(T*S-T*oo)
$$

熱伝達率 $h$ は複雑な条件を代表した値

物体表面で流速が 0 であれば，フーリエの法則から

$$
q=-lambdalr(((partial T)/(partial n)))\_(n=0)
$$

よって熱伝達率は境界面の温度勾配によって定まる

$$
h=-(lambda)/(T*S-T*oo)lr(((partial T)/(partial n)))\_(n=0)
$$

#### ヌッセント数

$$

Nu=(hL)/(lambda)=(h(T*S-T*oo))/(lambda (T*S-T*oo)/(L))


$$

表面から流体へ流れ出る熱のうち，熱伝達と熱伝導の比を表す

### 熱伝達の基礎方程式

- 解析の仮定
  - 非圧縮
  - 定常流
  - 定物性
  - 内部発熱なし
  - 圧力仕事・粘性散逸を無視
- 連続の式

$$
partial_x u + partial_y v = 0
$$

- 運動方程式

$$

u partial_x u + v partial_y u = (1)/(rho) partial_x p + nu (partial_x^2 u + partial_y^2 u) + (F_x)/(rho) \

u partial_x v + v partial_y v = (1)/(rho) partial_y p + nu (partial_x^2 v + partial_y^2 v) + (F_y)/(rho)


$$

- エネルギー保存則

$$
u partial_x T + v partial_y T = alpha (partial_x^2 T + partial_y^2 T)
$$

温度伝導率 $alpha:=(lambda)/(rho c_P)$

### 境界層近似

> 速度境界層 $delta$ は十分薄い

$$
delta(x) << x
$$

- 連続の式
  $$
  partial_x u + partial_y v = 0
  $$
- 運動方程式

  $$
  u partial_x u + v partial_y u = (1)/(rho) partial_x p + nu partial_y^2 u + (F_x)/(rho) \

  partial_y p = 0
  $$

- エネルギー式
  $$
  u partial_x T + v partial_y T = alpha partial_y^2 T
  $$

### 無次元数

代表速度 $U_oo$ 代表長さ $L$ で無次元化する

※ 定数ではなく添え字が引数の関数

#### $Re$ : レイノルズ数

運動方程式の無次元数

$$
Re_L = (U_oo L)/(nu)=(rho U_oo^2)/(mu U_oo/L)
$$

慣性力と粘性剪断力の比（$Re=oo$はサラサラ）

#### $Pe$ : ペクレ数

エネルギー式の無次元数

$$
Pe_L = (U_oo L)/(alpha)
$$

#### $Pr$ : プラントル数

$$
Pr=(Pe)/(Re)=(nu)/(alpha)=(delta)/(delta_t)
$$

物性値

通常は $Pr=1$ すなわち速度境界層と温度境界層は近い厚さ

### レイノルズのアナロジー

無次元化された運動方程式とエネルギー式

$$


$$

### 乱流

レイノルズ数 $Re=ux/nu$ が流れの様子を代表する．レイノルズ数が小さい領域では層流であるが，限界レイノルズ数 $Re_C$ を超えるあたりで乱流に遷移する．乱流は熱や運動量の輸送が大きい．

乱流では速度が不規則に変動するので，速度の時間平均値についての NS 方程式を考える．

## 強制対流熱伝導

平板上を流れる流体

### 速度分布：プラジウスの解

### 温度分布：ポールハウゼンの解

y を無次元化して

$$
nu = (y)/(delta)
$$

温度を無次元化して

$$
theta=(T_S-T)/(T_S-T_theta)
$$

としたときのエネルギー式は

$$
(d^2theta)/(dnu^2)+(Pr)/(2)f(dtheta)/(dnu)=0
$$

これを境界条件 $theta(nu=0)=T_S,theta(nu=oo)=T_oo$ で解くと，

$$
theta =
$$

### 熱伝達率

$$
h=-(lambda)/(T_S-T_oo)lr(((partial T)/(partial n)))_(n=0)
$$

を無次元化して

$$
Nu_x=sqrt(Re_x)lr(((partial theta)/(partial nu)))_(nu=0)
$$

を解く

プラントル数によって解が異なるが概ね

$$
N u_x = 0.332 Pr^(1/3)Re_x^(1/2)
$$

$$
h_x = (lambda)/(L)N u_x
$$

<script>
function calcNu(){
  const coef = document.getElementById("nu-coef").value;
  const re = document.getElementById("nu-re").value;
  const l = document.getElementById("nu-l").value;
  const lam = document.getElementById("nu-lam").value;
  const ts = document.getElementById("nu-ts").value;
  const tinf = document.getElementById("nu-tinf").value;
  const pr = document.getElementById("nu-pr").value;
  const nu = coef*(re**(1/2))*(pr**(1/3));
  const h = lam*nu/l;
  document.getElementById("nu-nu").innerHTML=nu;
  document.getElementById("nu-h").innerHTML=h;
}
</script>

|          |                                                         |
| -------- | ------------------------------------------------------- |
| 係数     | <input type="number" id="nu-coef" value="0.33"></input> |
| $Re_L$   | <input type="number" id="nu-re" value="1000"></input>   |
| $L$      | <input type="number" id="nu-l" value="0.1"></input>     |
| $lambda$ | <input type="number" id="nu-lam" value="0.4"></input>   |
| $T_S$    | <input type="number" id="nu-ts"></input>                |
| $T_oo$   | <input type="number" id="nu-tinf"></input>              |
| $Pr$     | <input type="number" id="nu-pr" value="8"></input>      |

<button onclick="calcNu()">計算</button>

|         |                            |                             |
| ------- | -------------------------- | --------------------------- |
| $N u_L$ | $0.332 Pr^(1/3)Re_x^(1/2)$ | <span id="nu-nu">aaa</span> |
| $h_L$   | $(lambda)/(L)N u_L$        | <span id="nu-h">aaa</span>  |

### 近似解法

## 自然対流熱伝導

## 熱放射

熱運動をする電子が電磁波を発生させる．

微小面 $dA$ から天頂角 $phi$ の方向の立体角 $domega=dA'/r^2$ の領域にどれだけのエネルギーが放射するか

$$
dQ = i dA cosphi domega
$$

$i$ を放射強度といい，単位面積から単位立体角に放射するエネルギーを表す．それぞれの波長ごとの放射強度（単色放射強度）を $i_lambda$ として

$$
i=integral i_lambda dlambda
$$

$dQ$ を半球面の全方位にわたり積分すると

$$
Q=dAintegral_0^o integral.cont egral_0^(2pi)integral_0^(pi/2) i(lambda,theta,psi)sinphicosphi dtheta dphi dlambda
$$

$i$ が定数のとき

$$
(Q)/(dA) = pi i
$$

### 黒体放射

黒体とは

- 到来する全ての熱放射を吸収
- ある温度で最大の熱放射をする
- 放射強度は角度によらない

なる性質を持つ物体．

### プランクの式

単位体積中に定在する電磁波の振動モード（単位長が波長の整数倍）のうち，振動数が $nu～nu+Deltanu$ なる数は

$$
dN(nu)=(8pinu^2)/(c^3)dnu
$$

一方，ボルツマン分布

$$
n_i = c exp lr(((-(epsilon.alt_i)/(kT))))
$$

エネルギーは $hnu$ の整数倍の値となるので

$$
n_i = c exp lr(((-(ihnu)/(kT))))
$$

エネルギーの平均は

$$
macron(epsilon.alt) = (hnu)/(e^(hnu/kT)-1)
$$

それぞれの振動モードについて

いろいろあって

$$
i_lambda=(2hc^2)/(lambda^5(e^(hc/klambda T)-1))
$$

### ステファン・ボルツマンの式

$$
E=sigma T^4
$$

$$
sigma = (pi^4C_1)/(15C_2^4) = 5.667 times 10^(-8)  [W/m^2K^4]
$$

### 実際の熱放射

黒体は理論的に最大の熱放射をする．実際の物体の放射強度は黒体より少なく，また波長・角度・温度依存性がある．黒体における値との比をとって評価する．

### 吸収・反射・透過

入射するエネルギーに対して，吸収・反射・透過するエネルギーの比を吸収率 $alpha$ ・反射率 $r$ ・透過率 $t$ という．入射放射線が単色 $lambda$ の場合については，単色吸収率 $alpha_lambda$ ・単色反射率 $r_lambda$ ・単色透過率 $t_lambda$ という．

同じ $alpha_lambda,r_lambda,t_lambda$ の物体であっても，入射放射線のスペクトルに応じて $alpha,r,t$ は変化する

※　反射率・透過率は見え方を表している．たとえば水は可視光において透過率が高いが赤外線では透過率が低くなっている．

### キルヒホッフの法則（射出と吸収の関係）

黒体に囲まれた物体を考える．この系が温度 $T_S$ の平衡状態にある場合，物体に吸収されるエネルギは

射出されるエネルギは

熱平衡にあるので吸収と射出がつり合う

$$
alpha_lambda(T)=epsilon.alt_lambda(T)
$$

### 気体の熱放射

### ビアの法則

熱放射線が気体層を通過すると指数関数的に減衰する

### 灰色面

## 放射伝熱

微小面の熱放射を面に沿って積分する．

### 形態係数

面$i$から出たエネルギーのうち面$j$に入射する割合を形態係数$F_("ij")$という．

相互関係 $A_iF_("ij")=A_jF_("ji")$

総和関係 $sum_j F_("ij")=1$

### 灰色面系

灰色面が放射するエネルギーは自身の放射によるものと反射によるものがある．これらをまとめて射度 $G$ という値で表す．

$$
A_iG_i = A_iepsilon.alt_i sigma T_i^4 + (1-alpha_i)sum_k A_kG_kF_("ki")
$$

$$
G_i = epsilon.alt_i sigma T_i^4 + (1-epsilon.alt_i)sum_k G_kF_("ik")
$$

$F'_("ij")=(1-epsilon.alt_i)F_("ij")$ とすると

$$
G_i = (delta_("ij")-F'_("ij"))^(-1)epsilon.alt_i sigma T_i^4
$$

2 次元の場合

$$
(delta_("ij")-F'_("ij"))^(-1) = (1)/((1-F'_(11))(1-F'_(22))-F'_(12)F'_(21))
mat(delim: "[", 1-F'_(22), F'_(21); F'_(12), 1-F'_(11))
$$
