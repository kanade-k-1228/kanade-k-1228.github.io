---
title: リレー
icon: electric_plug
abst: ""
---

$$
newcommand{d}[2][ ]{(upright(d) #1)/(upright(d) #2)}
newcommand{pd}[2][ ]{(partial #1)/(partial #2)}
newcommand{cal(L)}[1][] {cal(L) lr([ #1 ])}
newcommand{Linv}[1][] {cal(L)^(-1) lr([ #1 ])}
$$

## リレーコイルの過渡応答

回路方程式は

$$
v(t) = L d{t} i(t) + ri(t) \\
v(t) = R d{t} q(t) + (1)/(C)q(t)
$$

同じ形なので $(A,B)=(L,r),(R,1/C)$ として，以下の式を解く．

$$
y(t) = A d{t} x(t) + Bx(t) \\
Y(s) = A(sX(s)-x(0)) + BX(s) \\
X(s) = (Y(s)+Ax(0))/(As+B) \\
x(t) = Linv[(Y(s))/(As+B)] + x(0) e^(-(B)/(A)t)
$$

初期値の影響は指数で減衰している

$$
I(s) = (V(s)+Li(0))/(Ls+r) \\
Q(s) = (V(s)+Rq(0))/(Rs+(1)/(C))
$$

$$
i(t) = Linv[(V(s))/(Ls+r)] + i(0) e^(-(r)/(L)t) \\
q(t) = Linv[(V(s))/(Rs+(1)/(C))] + q(0) e^(-(1)/(RC)t)
$$

### ON 時

ステップ関数

$$
v(t) = Vu(t) \\
V(s) = (V)/(s)
$$

$$

i(t) = Linv[(V)/(s(Ls+r))] + i(0) e^(-(r)/(L)t) \

     = Linv[(V)/(r)lr(( (1)/(s) - (1)/(s+(r)/(L)) ))] \

     = (V)/(r)lr((1-e^(-(r)/(L)t))) + i(0) e^(-(r)/(L)t) \

q(t) = Linv[(V)/(s(Rs+(1)/(C)))] + q(0) e^(-(1)/(RC)t) \

     = VC lr((1-e^(-(1)/(RC)t))) + q(0) e^(-(1)/(RC)t)


$$

### OFF 時

電流条件

$$
-d{t} q(t) = i(t) \\
sQ(s) - q(0) + I(s) = 0 \\
s(V(s)+Rq(0))/(Rs+(1)/(C)) - q(0) + (V(s)+Li(0))/(Ls+r) = 0 \\
lr(( (s)/(Rs+(1)/(C)) + (1)/(Ls+r) )) V(s) + lr(( -((1)/(C))/(Rs+(1)/(C))q(0) + (L)/(Ls+r)i(0) )) = 0 \\
$$

$$

V(s) = ( ((1)/(C))/(Rs+(1)/(C))q(0) - (L)/(Ls+r)i(0) )/( (s)/(Rs+(1)/(C)) + (1)/(Ls+r) ) \

 = (lr(( (L)/(C)q(0) - LRi(0) ))s + lr(((r)/(C)q(0)-(L)/(C)i(0))))/(Ls^2+(R+r)s+(1)/(C))


$$
