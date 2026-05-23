---
title: ソフトマター
---

## ソフトマターとは

- 高分子
- コロイド
  - ゾル（流動性がある）
  - ゲル（流動性がない）
- 液晶
  - 結晶
  - スメチック液晶
  - ネマチック液晶
  - 等方性液体
- 界面活性剤
  - ミセル

### 動特性

- 非線形
  - 小さな外力でも非線形な応答をする
- 非平衡性
  - 緩和時間が長い

## 溶液

溶質が溶媒中に **均一に** 溶けている液体

- 温度 $T$
- 圧力 $P$
- 体積 $V$
- 溶質・溶媒の
  - 分子数 $N_P$ $N_S$
  - 分子量 $m_P$ $m_S$
  - 質量 $m_PN_P$ $m_SN_S$
- 全質量 $M=m_PN_P+m_SN_S$
- 密度 $rho=M/V$

### 濃度

重量濃度

$$
c=(m_PN_P)/(V)
$$

数密度

$$
n=(N_P)/(V)
$$

重量分率

$$
phi=(m_PN_P)/(M)=(m_PN_P)/(m_PN_P+M_SN_S)
$$

### 自由エネルギー

> $$
> G(N_P,N_S,T,P)
> $$

ギブス自由エネルギーは示量変数なので

$$
G(N_P,N_S,T,P)=Mg(phi,T,P)
$$

単位質量あたりの自由エネルギー $g$

単位体積あたりの自由エネルギー

$$
f(c,T,P)=rho g(phi,T,P)
$$

溶液はほとんど非圧縮なので $rho=upright("Const")$ となるので $g$ に成り立つことが $f$ にも成り立つ

### 化学ポテンシャル

$$

mu_P =(partial G)/(partial N_P)=(partial M)/(partial N_P)g+M(partial g)/(partial phi)(partial phi)/(partial N_P)=m_P{g+phi g'} \

mu_S =(partial G)/(partial N_S)=(partial M)/(partial N_S)g+M(partial g)/(partial phi)(partial phi)/(partial N_S)=m_S{g+(1-phi) g'} \


$$

### 溶液の混合

$(M_1,phi_1)$ と $(M_2,phi_2)$ を混合比 $x=(M_1)/(M_1+M_2)$ で混合して一様な溶液 $(M,phi)$ ができた．このとき $g$ は以下の不等式が要請される．

$$
M_1 g(phi_1) + M_2 g(phi_2) >= M g(phi)
$$

$ text("混合前の自由エネルギー") >= text("混合後の自由エネルギー") $

混合後の濃度は混合比を用いて，

$$
phi=xphi_1+(1-x)phi_2
$$

なので，$phi_1<phi<phi_2$ で $g(phi)$ は下に凸．

上に凸な部分がある場合，混合しても均一に混ざらず，相分離する．

### 相分離

溶液 $(M,phi)$ が $phi_1<phi<phi_2$ に相分離しているとき，それぞれの相の質量は，

$$
M_1 = (phi_2-phi)/(phi_2-phi_1)M quad M_2 = (phi-phi_1)/(phi_2-phi_1)M
$$

溶液の質量保存 $M=M_1+M_2$

溶質の質量保存 $Mphi=M_1phi_1+M_2phi_2$

### 浸透圧

熱力学的力

全体の自由エネルギー $G_("TOT")$

半透膜を押して溶液の体積を $dV$ 変化させる仕事は $Pi d v$ なので

$$
Pi = (partial G_("TOT")(V))/(partial V)
$$

## 格子模型

$$

ln W
= ln N_("tot")! - ln N_P! - ln N_S! \

= N_("tot") ln N_("tot") - N_("tot") - N_P ln N_P + N_P - N_S ln N_S + N_S \

= N_("tot") ln N_("tot") - N_P ln N_P - N_S ln N_S


$$

$$
N_P=N_("tot")phi,quad N_S=N_("tot")(1-phi)
$$

を代入して，

$$

ln W
= N_("tot") ln N_("tot") - N_("tot")phi ln N_("tot")phi - N_("tot")(1-phi) ln N_("tot")(1-phi) \

= N_("tot") (ln N_("tot") - phi ln N_("tot") - phi ln phi - (1-phi) ln N_("tot") - (1-phi) ln(1-phi)) \

= N_("tot") ( - phi ln phi - (1-phi) ln(1-phi))


$$

よって

$$
-k_BTln W = k_B T N_("tot") ( phi ln phi + (1-phi) ln(1-phi))
$$
