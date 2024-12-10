---
title: 倒立振子
---

## 運動方程式

速度ベクトルは

$$
v=\begin{pmatrix}
    \dot{x} \\ \dot{y} \\ 0
\end{pmatrix} +
l\dot{\theta}
\begin{pmatrix}
    -\sin\theta \\ \cos\theta \\ 0
\end{pmatrix} +
l\dot{\phi}
\begin{pmatrix}
    \cos\theta\cos\phi \\ \sin\theta\cos\phi \\ -\sin\phi
\end{pmatrix}
$$

$$
\begin{aligned}
v^2 &= (\dot{x}-l\dot{\theta}\sin\theta+l\dot{\phi}\cos\theta\cos\phi)^2 + (\dot{y}+l\dot{\theta}\cos\theta+l\dot{\phi}\sin\theta\cos\phi)^2 + (-l\dot{\phi}\sin\phi)^2 \\
&=\dot{x}^2 + l^2\dot{\theta}^2\sin^2\theta + l^2\dot{\phi}^2\cos^2\theta\cos^2\phi - 2\dot{x}l\dot{\theta}\sin\theta - 2l^2\dot{\theta}\dot{\phi}\sin\theta\cos\theta\cos\phi + 2l\dot{x}\dot{\phi}\cos\theta\cos\phi\\
&+ \dot{y}^2+l^2\dot{\theta}^2\cos^2\theta+l^2\dot{\phi}^2\sin^2\theta\cos^2\phi + 2\dot{y}l\dot{\theta}\cos\theta + 2l^2\dot{\theta}\dot{\phi}\cos\theta\sin\theta\cos\phi + 2l\dot{y}\dot{\phi}\sin\theta\cos\phi\\
&+ l^2\dot{\phi}^2\sin^2\phi \\
&= \dot{x}^2 + \dot{y}^2 + l^2\dot{\theta}^2 + l^2\dot{\phi}^2 + 2l\dot{\theta}(-\dot{x}\sin\theta + \dot{y}\cos\theta) + 2l\dot{\phi}\cos\phi(\dot{x}\cos\theta + \dot{y}\sin\theta)
\end{aligned}
$$

ラグランジアンは

$$
L=\frac{1}{2} m[\dot{x}^2 + \dot{y}^2 + l^2\dot{\theta}^2 + l^2\dot{\phi}^2 + 2l\dot{\theta}(-\dot{x}\sin\theta + \dot{y}\cos\theta) + 2l\dot{\phi}\cos\phi(\dot{x}\cos\theta + \dot{y}\sin\theta)]-mgl\cos\phi
$$

以下$m$ は省略する

$$
\begin{aligned}
\pd[L]{x} &=0 \\
\pd[L]{\dot{x}} &= \dot{x} - l\dot{\theta}\sin\theta + l\dot{\phi}\cos\phi\cos\theta \\
\d{t}\pd[L]{\dot{x}} &= \ddot{x} - l\ddot{\theta}\sin\theta - l\dot{\theta}^2\cos\theta + l\ddot{\phi}\cos\phi\cos\theta - l\dot{\phi}^2\sin\phi\cos\theta - l\dot{\phi}\dot{\theta}\cos\phi\sin\theta \\
\pd[L]{y} &=0 \\
\pd[L]{\dot{y}} &= \dot{y} + l\dot{\theta}\cos\theta + l\dot{\phi}\cos\phi\sin\theta \\
\d{t}\pd[L]{\dot{y}} &= \ddot{y} + l\ddot{\theta}\cos\theta - l\dot{\theta}^2\sin\theta + l\ddot{\phi}\cos\phi\sin\theta - l\dot{\phi}^2\sin\phi\sin\theta + l\dot{\phi}\dot{\theta}\cos\phi\cos\theta \\
\pd[L]{\theta} &= l\dot{\theta}(-\dot{x}\cos\theta - \dot{y}\sin\theta) + l\dot{\phi}\cos\phi(-\dot{x}\sin\theta + \dot{y}\cos\theta) \\
\pd[L]{\dot{\theta}} &= l^2\dot{\theta} + l(-\dot{x}\sin\theta + \dot{y}\cos\theta) \\
\d{t}\pd[L]{\dot{\theta}} &= l^2\ddot{\theta} + l(-\ddot{x}\sin\theta -\dot{x}\dot{\theta}\cos\theta + \ddot{y}\cos\theta - \dot{y}\dot{\theta}\sin\theta) \\
\pd[L]{\phi} &= -l\dot{\phi}\sin\phi(\dot{x}\cos\theta + \dot{y}\sin\theta)+gl\sin\phi\\
\pd[L]{\dot{\phi}} &= l^2\dot{\phi} + l\cos\phi(\dot{x}\cos\theta + \dot{y}\sin\theta)\\
\d{t}\pd[L]{\dot{\phi}} &= l^2\ddot{\phi} - l\dot{\phi}\sin\phi(\dot{x}\cos\theta + \dot{y}\sin\theta) + l\cos\phi(\ddot{x}\cos\theta + \ddot{y}\sin\theta) + + l\dot{\theta}\cos\phi(-\dot{x}\sin\theta + \dot{y}\cos\theta)
\end{aligned}
$$

オイラー・ラグランジュの運動方程式

$$
\pd[L]{x_i}-\d{t}\pd[L]{\dot{x_i}}=0
$$

より，

$$
\begin{aligned}
0  &= \ddot{x} - l\ddot{\theta}\sin\theta - l\dot{\theta}^2\cos\theta + l\ddot{\phi}\cos\phi\cos\theta - l\dot{\phi}^2\sin\phi\cos\theta - l\dot{\phi}\dot{\theta}\cos\phi\sin\theta \\
0 &= \ddot{y} + l\ddot{\theta}\cos\theta - l\dot{\theta}^2\sin\theta + l\ddot{\phi}\cos\phi\sin\theta - l\dot{\phi}^2\sin\phi\sin\theta + l\dot{\phi}\dot{\theta}\cos\phi\cos\theta \\
l\dot{\theta}(-\dot{x}\cos\theta - \dot{y}\sin\theta) + l\dot{\phi}\cos\phi(-\dot{x}\sin\theta + \dot{y}\cos\theta)  &= l^2\ddot{\theta} + l(-\ddot{x}\sin\theta -\dot{x}\dot{\theta}\cos\theta + \ddot{y}\cos\theta - \dot{y}\dot{\theta}\sin\theta) \\
-l\dot{\phi}\sin\phi(\dot{x}\cos\theta + \dot{y}\sin\theta)+gl\sin\phi &= l^2\ddot{\phi} - l\dot{\phi}\sin\phi(\dot{x}\cos\theta + \dot{y}\sin\theta) + l\cos\phi(\ddot{x}\cos\theta + \ddot{y}\sin\theta) + l\dot{\theta}\cos\phi(-\dot{x}\sin\theta + \dot{y}\cos\theta)
\end{aligned}
$$

## 状態方程式
