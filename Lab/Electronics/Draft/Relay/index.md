% リレー
%
% 2021-09-04

$$
\newcommand{\d}[2][ ]{\frac{\mathrm{d} #1}{\mathrm{d} #2}}
\newcommand{\pd}[2][ ]{\frac{\partial #1}{\partial #2}}
\newcommand{\L}[1][] {\mathcal{L} \left[ #1 \right]}
\newcommand{\Linv}[1][] {\mathcal{L}^{-1} \left[ #1 \right]}
$$

## リレーコイルの過渡応答

回路方程式は

$$
v(t) = L \d{t} i(t) + ri(t) \\
v(t) = R \d{t} q(t) + \frac{1}{C}q(t)
$$

同じ形なので $(A,B)=(L,r),(R,1/C)$ として，以下の式を解く．

$$
y(t) = A \d{t} x(t) + Bx(t) \\
Y(s) = A(sX(s)-x(0)) + BX(s) \\
X(s) = \frac{Y(s)+Ax(0)}{As+B} \\
x(t) = \Linv[\frac{Y(s)}{As+B}] + x(0) e^{-\frac{B}{A}t}
$$

初期値の影響は指数で減衰している

$$
I(s) = \frac{V(s)+Li(0)}{Ls+r} \\
Q(s) = \frac{V(s)+Rq(0)}{Rs+\frac{1}{C}}
$$

$$
i(t) = \Linv[\frac{V(s)}{Ls+r}] + i(0) e^{-\frac{r}{L}t} \\
q(t) = \Linv[\frac{V(s)}{Rs+\frac{1}{C}}] + q(0) e^{-\frac{1}{RC}t}
$$

### ON 時

ステップ関数

$$
v(t) = Vu(t) \\
V(s) = \frac{V}{s}
$$

$$
\begin{aligned}
i(t) &= \Linv[\frac{V}{s(Ls+r)}] + i(0) e^{-\frac{r}{L}t} \\
     &= \Linv[\frac{V}{r}\left( \frac{1}{s} - \frac{1}{s+\frac{r}{L}} \right)] \\
     &= \frac{V}{r}\left(1-e^{-\frac{r}{L}t}\right) + i(0) e^{-\frac{r}{L}t} \\
q(t) &= \Linv[\frac{V}{s(Rs+\frac{1}{C})}] + q(0) e^{-\frac{1}{RC}t} \\
     &= VC \left(1-e^{-\frac{1}{RC}t}\right) + q(0) e^{-\frac{1}{RC}t}
\end{aligned}
$$

### OFF 時

電流条件

$$
-\d{t} q(t) = i(t) \\
sQ(s) - q(0) + I(s) = 0 \\
s\frac{V(s)+Rq(0)}{Rs+\frac{1}{C}} - q(0) + \frac{V(s)+Li(0)}{Ls+r} = 0 \\
\left( \frac{s}{Rs+\frac{1}{C}} + \frac{1}{Ls+r} \right) V(s) + \left( -\frac{\frac{1}{C}}{Rs+\frac{1}{C}}q(0) + \frac{L}{Ls+r}i(0) \right) = 0 \\
$$

$$
\begin{aligned}
V(s) &= \frac{ \frac{\frac{1}{C}}{Rs+\frac{1}{C}}q(0) - \frac{L}{Ls+r}i(0) }{ \frac{s}{Rs+\frac{1}{C}} + \frac{1}{Ls+r} } \\
 &= \frac{\left( \frac{L}{C}q(0) - LRi(0) \right)s + \left(\frac{r}{C}q(0)-\frac{L}{C}i(0)\right)}{Ls^2+(R+r)s+\frac{1}{C}}
\end{aligned}
$$
