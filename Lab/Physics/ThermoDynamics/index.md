---
title: 熱力学
---

## 基本法則

第一法則
$$ dU = δQ + δW $$
第二法則 
$$ \oint δQ/T \leq 0 $$

- 準静的
  $$ δW = -pdV $$
- 可逆
  $$ dS = δQ/T = 0 $$
- 準静的・可逆
  $$ dU = TdS - pdV $$
- 物質の増減
  $$ dU = TdS - pdV + \mu dN $$

## マクスウェルの関係式

1. エネルギー $U(S,V)$
   $$ dU = TdS - pdV $$

   $$
   dU = \left(\frac{\partial U}{\partial V}\right)dV + \left(\frac{\partial U}{\partial S}\right)dS
   $$

   を比較すると，

   $$ -p = \left(\frac{\partial U}{\partial V}\right) $$
   $$ T = \left(\frac{\partial U}{\partial S}\right) $$

   U が C^2 以上なら二階微分は可換で

   $$
   \left(\frac{\partial p}{\partial S}\right)_V = -\left(\frac{\partial T}{\partial V}\right)_S
   $$

2. ヘルムホルツエネルギー $F(T,V) = U - TS$
3. ギブスエネルギー $G = U - TS + pV$

## 一般の熱力学的状態方程式

エネルギー保存

$$
dU=Tds-PdV
$$

$$
\left(\frac{\partial U}{\partial V}\right)_T=T\left(\frac{\partial S}{\partial V}\right)_T-P
$$

マクスウェルの関係式

$$
\left(\frac{\partial S}{\partial V}\right)_T=\left(\frac{\partial P}{\partial T}\right)_V
$$

より，

$$
\left(\frac{\partial U}{\partial V}\right)_T=T\left(\frac{\partial P}{\partial T}\right)_V-P
$$

※ $U,p,V,T$ の関係式
