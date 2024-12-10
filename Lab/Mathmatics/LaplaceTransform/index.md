---
title: ラプラス変換
---

## ラプラス変換

## ラプラス変換による微分方程式の解法

### 振動

$$
f''(t) + 2 \zeta \omega f'(t) + \omega^2 f(t) = g(t)
$$

$$
(s^2F(s) - sf(0) - f'(0)) + 2 \zeta \omega (sF(s)-f(0)) + \omega^2 F(s) = G(s)
$$

$$
(s^2 + 2 \zeta \omega s + \omega^2) F(s) = G(s) + sf(0) + f'(0) + 2\zeta\omega f(0)
$$

#### 減衰なし $\zeta=0$

$$
(s^2 + \omega^2) F(s) = G(s) + sf(0) + f'(0)
$$

$$
F(s) = \frac{G(s)}{s^2 + \omega^2} + \frac{sf(0)}{s^2 + \omega^2} + \frac{f'(0)}{s^2 + \omega^2}
$$

積の逆ラプラス変換は畳み込み

$$
\L^{-1} \left[\frac{G(s)}{s^2 + \omega^2}\right] = \frac{1}{\omega}\sin(\omega t) * g(t) = \frac{1}{\omega} \int_0^t \sin(\omega (\tau - t)) * g(\tau) d\tau
$$

$$
f(t) = \frac{1}{\omega} \int_0^t \sin(\omega (\tau - t))g(\tau) d\tau + f(0) \cos\omega t + f'(0) \frac{1}{\omega} \sin\omega t
$$

### 二階線形微分方程式

$$
f''(t) + P(t) f'(t) + Q(t) f(t) + R(t) = 0
$$

#### 固有関数

$$
\dd[u]{x} = -\lambda u \quad (0 < x < 1 , \lambda \geq 0,)
$$

自由端（$u'(0)=u'(1)=0$）

- $\lambda = 0$ の場合 $u(x)=0$
- $\lambda \neq 0$ の場合

$$
(s^2 U(s) - su(0) - u'(0)) + \lambda U(s) = 0
$$

$$
U(s) = \frac{s}{s^2+\lambda} u(0) + \frac{1}{s^2+\lambda} u'(0)
$$

$$
u(x) = u(0) \cos(\sqrt{\lambda}t) + \frac{u'(0)}{\sqrt{\lambda}} \sin(\sqrt{\lambda}t)
$$

境界条件から

$$
u(x) = u(0) \cos(\sqrt{\lambda}x)
$$

$$
u'(1) = - u(0) \sqrt{\lambda} \sin(\sqrt{\lambda}) = 0
$$

- $u(0)=0$ の場合 $u(x)=0$
- $\sin(\sqrt{\lambda})=0$ の場合 $\sqrt{\lambda} = n\pi$

$$
u(x) = u(0) \cos(n\pi x)
$$

#### 例１

$$
f''(t) + P(t) f'(t) + Q(t) f(t) + R(t) = 0
$$
