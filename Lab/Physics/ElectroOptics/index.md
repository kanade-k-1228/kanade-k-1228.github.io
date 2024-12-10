---
title: 電気光学効果
---

物質の電気的特性は、分極 (Polarization) であらわされる。

$$
\begin{aligned}
P &= \eps_0 \chi E \\
  &= \eps_0 \chi_1 E + \eps_0 \chi_2 E^2 + \eps_0 \chi_3 E^3 + \cdots \\
  &= P_1 + P_2 + P_3 + \cdots
\end{aligned}
$$

電気感受率 (Susceptibility) は以下の次元をもつテンソルである。

- $\chi_1$ : $3 \ra 3$
- $\chi_2$ : $3^2 \ra 3$
- $\chi_3$ : $3^3 \ra 3$

次数によっていろいろな特徴が生じる。

## 線形光学

- 重ね合わせ
- 反射・吸収・透過
- 屈折
- 複屈折

## 2次の非線形効果

$$
P_2 = \eps\chi_2 E^2
$$

※ $E(\omega)$ は周波数 $\omega$ の電場を表す。（$E(\omega)=E\sin\omega t$）

### 2次高調波と整流

電磁波 $E=E(\omega)$ に対して、

$$
E^2(\omega) = \f{1}{2}E(2\omega) + \f{1}{2}E(0)
$$

$$
P_2 = P_2(\omega) + P_2(0)
$$

$P_2(\omega)$ が2次高調波で、$P_2(0)$ が整流

### Pockell 効果

静電場＋光 $E=E(0)+E(\omega)$ に対して、

$$
E^2 = E^2(0) + 2E(0)E(\omega) + E^2(\omega)
$$

ここで、$E(0) \gg E(\omega)$ の場合、つまり、物質の電場が光の電場に対して十分小さい場合、$\omega^2$ の成分は無視できて、

$$
P_2 = P_2(0) + P_2(\omega)
$$

### 三波混合

異なる周波数の光 $E=E_1(\omega_1)+E_2(\omega_2)$ に対して、

$$
E^2 = E_1^2(2\omega_1) + E_1^2(2\omega_2) + E_1E_2(\omega_1+\omega_2) + E_1E_2(\omega_1-\omega_2)
$$

2次高調波、

## 3次の非線形効果


