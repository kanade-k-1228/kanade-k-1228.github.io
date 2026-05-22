---
title: 相対論的量子力学
---

- 特殊相対性原理に従う
- $c->oo$ の極限

## ディラック方程式

$$
lr([iplanck.reduce gamma^mu (partial)/(partial x^mu)-mc]) psi(x) = 0 space (1)
$$

### シュレディンガー方程式との対応

$$
i planck.reduce (partial)/(partial t) psi = H psi space (2)
$$

$$
H = gamma^0 mc^2 + gamma^0gamma^i (-iplanck.reduce nabla)_i c space (3)
$$

### エネルギー

ハミルトニアンの固有関数を求めたい

$$
Htilde(psi)(x,E) = Etilde(psi)(x,E) space (4)
$$

1. エネルギー固有状態の時間発展は (2) より

$$
psi(x,t) = tilde(psi)(x,E)e^(-iEt/planck.reduce) space (5)
$$

2. 運動量演算子 $p=-iplanck.reduce nabla$ はハミルトニアンと可換なので同時固有関数が存在する

$$
psi(x,t) = omega(p,E) e^(i(pdot.op x-Et)/planck.reduce) space (6)
$$

(2) に (6) を代入して両辺 $E+gamma mc^2+mc^2gammagamma^i$ をかけて

$$
(E^2-m^2c^4-p^2c^2)omega(p,E)=0
$$

> $$
> E^2 = m^2c^4 + p^2c^2
> $$

- エネルギー固有値は無限スペクトル
- エネルギー固有値に対して運動量は自由度が残る
  - 向きの 2 自由度が残る

#### $p=0$ （静止）

$$
(E-mc^2gamma^0)omega(0,E)=0
$$

$$
mat(delim: "(", E-mc^2, ; , E+mc^2)
mat(delim: "(", phi.alt; zeta) = 0
$$

$$
psi(x,t) = cases(
  mat(delim: "(", chi; 0) e^(-i m c^2 t / planck.reduce)\, (E = m c^2),
  mat(delim: "(", 0; chi) e^(i m c^2 t / planck.reduce)\, (E = -m c^2),
) \\
chi = mat(delim: "(", chi_+; chi_-; )
$$

- 正エネルギー解と負エネルギー解がある
- $chi_+,chi_-$ が残るがこの自由度がスピン

#### $p!= 0$

$$
mat(delim: "(", E-mc^2, -sigma dot.op p c; -sigma dot.op p c, E+mc^2)
mat(delim: "(", phi.alt; zeta) = 0
$$

$$
psi(x,t) = cases(
  mat(delim: "(", chi; (sigma dot.op p c) / (E + m c^2) chi) e^(i (p dot.op x - E t) / planck.reduce)\, (E > m c^2),
  mat(delim: "(", (sigma dot.op p c) / (E - m c^2) chi; chi) e^(i (p dot.op x - E t) / planck.reduce)\, (E < -m c^2),
) \\
chi = mat(delim: "(", chi_+; chi_-; )
$$

- 動くと反対の成分が付随して生じる

### ローレンツ変換不変性

$psi(x)->psi'(x')$ に対してディラック方程式がどうなるか

#### 連続変換

#### 反転変換

### エネルギー

相対論のエネルギー式

$$
E^2 = m^2c^4 + p^2c^2
$$

## 反粒子

### 負エネルギー解

#### 時間逆行する粒子

## スピン

## 量子場

1 粒子系の波動関数は状態 $alpha$ に対して

$$
psi_alpha(x)=lr(angle.l x bar.v alpha angle.r)
$$

量子場とは演算子 $hat(psi)(x)$

$$
psi_alpha(x)=lr(angle.l x bar.v alpha angle.r)
$$

## ディラック場

## 生成消滅演算子

## CPT 定理

## スピノルの数学

### パウリ行列

### ガンマ行列

$$
gamma^0 = mat(delim: "(", 1, 0; 0, -1)
gamma^i = mat(delim: "(", 0, sigma_i; -sigma_i, 0)
$$

#### 性質

$$

gamma^mugamma^nu+gamma^nugamma^mu = g^("munu") \

(gamma^mu)^dagger = g_mu^mugamma^mu \

(gamma^mu)^2 = g_mu^mu \

gamma^mugamma^nu = -gamma^nugamma^mu


$$
