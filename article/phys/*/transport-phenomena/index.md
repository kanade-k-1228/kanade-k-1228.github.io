---
title: 移動現象論
---

非定常系

## 輸送の一般式

$$
begin{alignedat}{10}
J    &=&       &-k& &nabla F \\
流束 &prop& &  & & 駆動力
end{alignedat}
$$

※　駆動力があまり大きくないときに成り立つ現象論的な線形近似

- 運動量交換（ニュートンの粘性法則）

$$
tau_("xy") = -mu (partial v_x)/(partial y)
$$

- 熱伝導（フーリエの法則）

$$
q = - lambda nabla T
$$

- 拡散（フィックの第１法則）

$$
j = - D nabla C
$$

- 電流

$$
j = - sigma nabla V
$$

## 拡散

### フィクスの第１法則

混合流体中のある成分の濃度場を $C(x)$ とする．全ての分子はランダムに等方的に拡散する．ある微小面の両側に濃度勾配がある場合，等方的な拡散の結果として，濃度を均一にする方向に分子が動いたようにみえる．

濃度場 $C$ と拡散流束 $q$ とに

> $$
> q = -D nabla C
> $$
>
> $D$ : 拡散係数

の関係（フィクスの第１法則）が見られる．

### 拡散方程式（フィクスの第２法則）

> $$
> (partial C)/(partial t) = kappa_C nabla^2 C
> $$
>
> $kappa_C:=(k_C)/(rho)$ : 質量拡散係数

静止した混合流体中に閉曲面 $A$ と $A$ に囲まれた閉領域 $V$ をとる．

質量保存則より，$V$ 内質量の増加量は $A$ の表面からの流入量と等しいので，（$n_A$ は外向きを正とする．最後の変形にガウスの発散定理を用いる．）

$$
(partial)/(partial t) integral_V rho C dV = - integral_A q dot.op n_A dA = integral_A (k_C nabla C) dot.op n_A dA = integral_V nabla (k_C nabla C) dV
$$

$V$ は任意なので，

$$
rho (partial C)/(partial t) = k_C nabla^2 C
$$

### 拡散係数の導出

#### ブラウン運動から

フィクスの第１法則はブラウン運動のモデル（ランダムに分子が運動するモデル）で説明できて，

$$
D = mu k_B T
$$

$mu$ : 移動度

低レイノルズ数の液体を媒体とした球形粒子の拡散の場合，

$$
D = (k_BT)/(6pi eta r)
$$

$eta$ : 動粘性係数

#### ボルツマン輸送方程式から

Chapman & Cowling (1939) を読むと良いらしい

位相空間上の分布関数 $f(x,v,t)$

状態が平衡状態 $f_0$ に近いとき，緩和時間近似により，

$$
(partial f)/(partial t) + v dot.op nabla f = -(f-f_0)/(tau)
$$

$F=f-f_0$ として，

$$
(partial F)/(partial t) + (F)/(tau) + v dot.op nabla F = 0
$$

濃度場は

$$
C(x,t) = integral.triple f(x,v,t) d v
$$

拡散流束は

$$
q(x,t) = integral.triple v f(x,v,t) d v
$$

濃度場の勾配を求める

$x$ 成分をみると

$$
(partial)/(partial x) C = (partial)/(partial x) integral.triple f(x,v,t) dv_x dv_y dv_z
$$

### 温度勾配による拡散

$$
q = -k_Clr([nabla C + (k_T)/(T) nabla T])
$$

## 熱伝導

### フーリエの法則

温度場 $T$ と熱流束 $q$ とに

> $$
> q = - k nabla T
> $$
>
> 熱伝導係数 $k$

の関係（フーリエの法則）が見られる．

### 熱伝導方程式

> $$
> (partial T)/(partial t) = kappa_T nabla^2 T
> $$
>
> 温度拡散係数 $kappa_T:=(k)/(rho C_p)$

静止流体中に閉曲面 $A$ と $A$ に囲まれた閉領域 $V$ をとる．

$V$ 内の熱エネルギーの時間変化は

$$
(partial Q)/(partial t) = integral rho C_P (partial T)/(partial t) dV
$$

エネルギー保存則より，$V$ 内エネルギーの増加量は $A$ の表面からの流入量＋内部発熱 $qV$ に等しい．内部発熱がない場合，

$$
integral rho C_P (partial T)/(partial t) dV = - integral_A q dot.op n_A dA = integral_A (k nabla T) dA = integral_V nabla (k nabla T) dV
$$

$V$ は任意なので，

$$
rho C_P (partial T)/(partial t) = k nabla^2 T
$$

## 粘性
