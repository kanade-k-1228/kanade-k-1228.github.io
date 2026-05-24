---
title: 熱工学
icon: fire
abst: ""
---

## 熱力学

### 系

|          |     |           |
| -------- | --- | --------- |
| 孤立系   | NVE | dQ=0,dN=0 |
| 閉じた系 | NVT | dN=0      |
| 開いた系 | μVT |           |

### 状態量

示量性：E,V,S
示強性：T,P

### 平衡状態

状態量は平衡状態においてのみ定義される

### 第二法則

エントロピー変化を系内の不可逆過程によって生じるエントロピーと系外との熱のやりとりに伴うエントロピー変化に分ける

$$
dS=d_iS+d_eS
$$

第二法則は

$$
d_iS>= 0
$$

### 孤立系 $delta Q=0$

$$dS=d_iS>= 0$$

### 閉じた系

$$

d_iS >=0\

d_eS = (delta Q)/(T) \

dS >= (delta Q)/(T)


$$

### 開いた系

$$

(dif S)/(dif t)   = (dif _iS)/(dif t)+(dif _eS)/(dif t)+l(dot(m)_("in")s-dot(m)_("out")sr) \

(dif _eS)/(dif t) = (dot(Q))/(T) \

(dif _iS)/(dif t) = (dif S)/(dif t)-(dot(Q))/(T)+l(dot(m)_("in")s-dot(m)_("out")sr) \

>=0


$$

## 物質量が変化する系

$$dU=TdS-PdV+sum mu dN$$
$$U=U(S,V,N,,,)$$

$$
begin{alignedat}{5}
T&=&(partial U)/(partial S)\\
P&=-&(partial U)/(partial V)\\
mu&=&(partial U)/(partial N)
end{alignedat}
$$

物質量の変化を内部変化によるものと外部からの流入によるものに分ける
$$dN=d_iN+d_eN$$

$$

dS   =  (dU+PdV)/(T)-(1)/(T)summu_i(d_iN_i+d_eN_i) \

d_iS = -(1)/(T)summu_id_iN_i \

d_eS =  (dU+PdV)/(T)-(1)/(T)summu_id_eN_i


$$

## 熱力学の一般関係式

### デュエムの定理

閉じた系の安定平衡状態は２つの独立変数によって決定される．

### 相反・循環の関係式

全微分可能な関数$z(x,y)$について

$$
newcommand{pdf}[3][]{lr(( (partial #1)/(partial #2) ))\_(#3)}
$$

$$
(partial x)/(partial z){y}(partial z)/(partial x){y}=1
$$

$$
(partial x)/(partial y){z}(partial y)/(partial z){x}(partial z)/(partial x){y}=-1
$$

### 極値原理・マクスウェルの関係式

|                     |        |     |                                    |                                   |                                                            |
| ------------------- | ------ | --- | ---------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| 孤立系              | S      | max |                                    |                                   |                                                            |
| 閉じた系（VS 一定） | U      | min | $$(partial U)/(partial S){V} = T$$ | $$(partial U)/(partial V){S}=-p$$ | $$(partial T)/(partial V){S}=-(partial p)/(partial S){V}$$ |
| 閉じた系（pS 一定） | H=U-pV | min | $$(partial H)/(partial S){p} = T$$ | $$(partial H)/(partial p){S}= V$$ | $$(partial T)/(partial p){S}= (partial V)/(partial S){p}$$ |
| 閉じた系（VT 一定） | F=U-TS | min | $$(partial F)/(partial V){T} =-p$$ | $$(partial F)/(partial T){V}=-S$$ | $$(partial p)/(partial T){V}= (partial S)/(partial V){T}$$ |
| 閉じた系（pT 一定） | G=H-TS | min | $$(partial G)/(partial p){T} = V$$ | $$(partial G)/(partial T){p}=-S$$ | $$(partial V)/(partial T){p}=-(partial S)/(partial p){T}$$ |

### オイラー方程式

$$
U=TS-pV+sum mu N
$$

### ギブス・デュエムの式

$$
SdT-Vdp+sum Ndmu=0
$$

## 化学反応

$$
sum a_i A_i -> sum b_i B_i
$$

反応進行度

$$
dxi = (dN_("Ai"))/(-a_i)=(dN_("Bi"))/(b_i)
$$

親和力(Affinity)

$$
A=sum mu_("Ai")a_i - sum mu_("Bi")b_i
$$

$$
d_iS=(A)/(T)dxi
$$

第二法則より

$$
(d_iS)/(dT)=(A)/(T)(dxi)/(dT)gt 0
$$

Thermodynamic Force ($(A)/(T)$) の正負で反応の向きがわかる

## 相平衡

### $T,P,mu$の制約（ギブス・デュエムの式）

$$
U=U(S,V,N,,,)
$$

$$
SdT-VdP+sum Ndmu=0
$$

### 平衡の条件（クラペイロンの式）

$$
dmu^((1)) = dmu^((2))
$$

$$
(dif P)/(dif T) = (s^((2))-s^((1)))/(v^((2))-v^((1))) = (Delta s)/(Delta v) = (Delta q)/(TDelta v)
$$

圧力一定で

$$
(dif P)/(dif T)=(Delta h)/(TDelta v)
$$

### 気液平衡（クラウジウス・クラペイロンの式）

気体は体積が大きい $v^((g))>>v^((l))$ かつ気体は理想気体 $v^((g))=RT/P$ とすると，

$$
(dif P)/(dif T)=(PDelta h)/(RT^2)
$$

$$
ln P_2 - ln P_1 = (Delta h)/(R)l((1)/(T_1)-(1)/(T_2)r)
$$

$Delta h$が気化熱

### 平衡状態の自由度（相律，Phase Rule）

$$
f = C-P+2
$$

## 熱機関

### PV 線図・ST 線図

## ブレイストンサイクル

![](./img/brayton.dio.svg)

以下、作動流体単位質量あたりの量を用いる
