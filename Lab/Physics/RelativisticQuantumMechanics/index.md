---
title: 相対論的量子力学
---

- 特殊相対性原理に従う
- $c\ra\infty$ の極限

## ディラック方程式

$$
\left[i\hbar \gamma^\mu \pd{x^\mu}-mc\right] \psi(x) = 0 \tag{1}
$$

### シュレディンガー方程式との対応

$$
i \hbar \pd{t} \psi = H \psi \tag{2}
$$

$$
H = \gamma^0 mc^2 + \gamma^0\gamma^i (-i\hbar \nabla)_i c \tag{3}
$$

### エネルギー

ハミルトニアンの固有関数を求めたい

$$
H\tilde{\psi}(x,E) = E\tilde{\psi}(x,E) \tag{4}
$$

1. エネルギー固有状態の時間発展は (2) より

$$
\psi(x,t) = \tilde{\psi}(x,E)e^{-iEt/\hbar} \tag{5}
$$

2. 運動量演算子 $p=-i\hbar \nabla$ はハミルトニアンと可換なので同時固有関数が存在する

$$
\psi(x,t) = \omega(p,E) e^{i(p\cdot x-Et)/\hbar} \tag{6}
$$

(2) に (6) を代入して両辺 $E+\gamma mc^2+mc^2\gamma\gamma^i$ をかけて

$$
(E^2-m^2c^4-p^2c^2)\omega(p,E)=0
$$

> $$
> E^2 = m^2c^4 + p^2c^2
> $$

- エネルギー固有値は無限スペクトル
- エネルギー固有値に対して運動量は自由度が残る
  - 向きの 2 自由度が残る

#### $p=0$ （静止）

$$
(E-mc^2\gamma^0)\omega(0,E)=0
$$

$$
\begin{pmatrix} E-mc^2 & \\ & E+mc^2 \end{pmatrix}
\begin{pmatrix} \varphi \\ \zeta \end{pmatrix} = 0
$$

$$
\psi(x,t) = \begin{cases}
\begin{pmatrix} \chi \\ 0  \end{pmatrix} e^{-imc^2t/\hbar} & (E=mc^2) \\
\begin{pmatrix} 0 \\ \chi  \end{pmatrix} e^{imc^2t/\hbar} & (E=-mc^2) \\
\end{cases} \\
\chi = \begin{pmatrix} \chi_+ \\ \chi_- \\ \end{pmatrix}
$$

- 正エネルギー解と負エネルギー解がある
- $\chi_+,\chi_-$ が残るがこの自由度がスピン

#### $p\neq 0$

$$
\begin{pmatrix} E-mc^2 & -\sigma \cdot p c \\ -\sigma \cdot p c & E+mc^2 \end{pmatrix}
\begin{pmatrix} \varphi \\ \zeta \end{pmatrix} = 0
$$

$$
\psi(x,t) = \begin{cases}
\begin{pmatrix} \chi \\ \frac{\sigma\cdot p c}{E+mc^2} \chi \end{pmatrix} e^{i(p\cdot x-Et)/\hbar} & (E>mc^2) \\
\begin{pmatrix} \frac{\sigma\cdot p c}{E-mc^2} \chi \\ \chi \end{pmatrix} e^{i(p\cdot x-Et)/\hbar} & (E<-mc^2) \\
\end{cases} \\
\chi = \begin{pmatrix} \chi_+ \\ \chi_- \\ \end{pmatrix}
$$

- 動くと反対の成分が付随して生じる

### ローレンツ変換不変性

$\psi(x)\rightarrow\psi'(x')$ に対してディラック方程式がどうなるか

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

1 粒子系の波動関数は状態 $\alpha$ に対して

$$
\psi_\alpha(x)=\braket{x}{\alpha}
$$

量子場とは演算子 $\hat{\psi}(x)$

$$
\psi_\alpha(x)=\braket{x}{\alpha}
$$

## ディラック場

## 生成消滅演算子

## CPT 定理

## スピノルの数学

### パウリ行列

### ガンマ行列

$$
\gamma^0 = \begin{pmatrix}
1 & 0 \\ 0 & -1
\end{pmatrix}
\gamma^i = \begin{pmatrix}
0 & \sigma_i \\ -\sigma_i & 0
\end{pmatrix}
$$

#### 性質

$$
\begin{aligned}
\gamma^\mu\gamma^\nu+\gamma^\nu\gamma^\mu &= g^{\mu\nu} \\
(\gamma^\mu)^\dagger &= g_\mu^\mu\gamma^\mu \\
(\gamma^\mu)^2 &= g_\mu^\mu \\
\gamma^\mu\gamma^\nu &= -\gamma^\nu\gamma^\mu
\end{aligned}
$$
