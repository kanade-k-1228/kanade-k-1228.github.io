---
title: 移動現象論
---

非定常系

## 輸送の一般式

$$
\begin{alignedat}{10}
J    &=&       &-k& &\nabla F \\
流束 &\propto& &  & & 駆動力
\end{alignedat}
$$

※　駆動力があまり大きくないときに成り立つ現象論的な線形近似

- 運動量交換（ニュートンの粘性法則）

$$
\tau_{xy} = -\mu \pd[v_x]{y}
$$

- 熱伝導（フーリエの法則）

$$
q = - \lambda \nabla T
$$

- 拡散（フィックの第１法則）

$$
j = - D \nabla C
$$

- 電流

$$
j = - \sigma \nabla V
$$

## 拡散

### フィクスの第１法則

混合流体中のある成分の濃度場を $C(x)$ とする．全ての分子はランダムに等方的に拡散する．ある微小面の両側に濃度勾配がある場合，等方的な拡散の結果として，濃度を均一にする方向に分子が動いたようにみえる．

濃度場 $C$ と拡散流束 $q$ とに

> $$
> q = -D \nabla C
> $$
>
> $D$ : 拡散係数

の関係（フィクスの第１法則）が見られる．

### 拡散方程式（フィクスの第２法則）

> $$
> \pd[C]{t} = \kappa_C \nabla^2 C
> $$
>
> $\kappa_C:=\frac{k_C}{\rho}$ : 質量拡散係数

静止した混合流体中に閉曲面 $A$ と $A$ に囲まれた閉領域 $V$ をとる．

質量保存則より，$V$ 内質量の増加量は $A$ の表面からの流入量と等しいので，（$n_A$ は外向きを正とする．最後の変形にガウスの発散定理を用いる．）

$$
\pd{t} \int_V \rho C dV = - \int_A q \cdot n_A dA = \int_A (k_C \nabla C) \cdot n_A dA = \int_V \nabla (k_C \nabla C) dV
$$

$V$ は任意なので，

$$
\rho \pd[C]{t} = k_C \nabla^2 C
$$

### 拡散係数の導出

#### ブラウン運動から

フィクスの第１法則はブラウン運動のモデル（ランダムに分子が運動するモデル）で説明できて，

$$
D = \mu k_B T
$$

$\mu$ : 移動度

低レイノルズ数の液体を媒体とした球形粒子の拡散の場合，

$$
D = \frac{k_BT}{6\pi \eta r}
$$

$\eta$ : 動粘性係数

#### ボルツマン輸送方程式から

Chapman & Cowling (1939) を読むと良いらしい

位相空間上の分布関数 $f(x,v,t)$

状態が平衡状態 $f_0$ に近いとき，緩和時間近似により，

$$
\pd[f]{t} + v \cdot \nabla f = -\frac{f-f_0}{\tau}
$$

$F=f-f_0$ として，

$$
\pd[F]{t} + \frac{F}{\tau} + v \cdot \nabla F = 0
$$

濃度場は

$$
C(x,t) = \iiint f(x,v,t) dv
$$

拡散流束は

$$
q(x,t) = \iiint v f(x,v,t) dv
$$

濃度場の勾配を求める

$x$ 成分をみると

$$
\pd{x} C = \pd{x} \iiint f(x,v,t) dv_x dv_y dv_z
$$

### 温度勾配による拡散

$$
q = -k_C\left[\nabla C + \frac{k_T}{T} \nabla T\right]
$$

## 熱伝導

### フーリエの法則

温度場 $T$ と熱流束 $q$ とに

> $$
> q = - k \nabla T
> $$
>
> 熱伝導係数 $k$

の関係（フーリエの法則）が見られる．

### 熱伝導方程式

> $$
> \pd[T]{t} = \kappa_T \nabla^2 T
> $$
>
> 温度拡散係数 $\kappa_T:=\frac{k}{\rho C_p}$

静止流体中に閉曲面 $A$ と $A$ に囲まれた閉領域 $V$ をとる．

$V$ 内の熱エネルギーの時間変化は

$$
\pd[Q]{t} = \int \rho C_P \pd[T]{t} dV
$$

エネルギー保存則より，$V$ 内エネルギーの増加量は $A$ の表面からの流入量＋内部発熱 $qV$ に等しい．内部発熱がない場合，

$$
\int \rho C_P \pd[T]{t} dV = - \int_A q \cdot n_A dA = \int_A (k \nabla T) dA = \int_V \nabla (k \nabla T) dV
$$

$V$ は任意なので，

$$
\rho C_P \pd[T]{t} = k \nabla^2 T
$$

## 粘性
