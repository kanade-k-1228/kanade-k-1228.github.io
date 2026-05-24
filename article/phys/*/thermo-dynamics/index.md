---
title: 熱力学
icon: fire
abst: ""
---

## 基本法則

第一法則
$$ dU = δQ + δW $$
第二法則 
$$ integral.cont δQ/T <= 0 $$

- 準静的
  $$ δW = -pdV $$
- 可逆
  $$ dS = δQ/T = 0 $$
- 準静的・可逆
  $$ dU = TdS - pdV $$
- 物質の増減
  $$ dU = TdS - pdV + mu dN $$

## マクスウェルの関係式

1. エネルギー $U(S,V)$
   $$ dU = TdS - pdV $$

   $$
   dU = lr(((partial U)/(partial V)))dV + lr(((partial U)/(partial S)))dS
   $$

   を比較すると，

   $$ -p = lr(((partial U)/(partial V))) $$
   $$ T = lr(((partial U)/(partial S))) $$

   U が C^2 以上なら二階微分は可換で

   $$
   lr(((partial p)/(partial S)))_V = -lr(((partial T)/(partial V)))_S
   $$

2. ヘルムホルツエネルギー $F(T,V) = U - TS$
3. ギブスエネルギー $G = U - TS + pV$

## 一般の熱力学的状態方程式

エネルギー保存

$$
dU=Tds-PdV
$$

$$
lr(((partial U)/(partial V)))_T=Tlr(((partial S)/(partial V)))_T-P
$$

マクスウェルの関係式

$$
lr(((partial S)/(partial V)))_T=lr(((partial P)/(partial T)))_V
$$

より，

$$
lr(((partial U)/(partial V)))_T=Tlr(((partial P)/(partial T)))_V-P
$$

※ $U,p,V,T$ の関係式
