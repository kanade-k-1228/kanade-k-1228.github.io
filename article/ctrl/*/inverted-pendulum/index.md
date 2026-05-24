---
title: 倒立振子
icon: balance_scale
abst: ""
---

## 運動方程式

速度ベクトルは

$$
v=mat(delim: "(", dot(x); dot(y); 0) +
ldot(theta)
mat(delim: "(", -sintheta; costheta; 0) +
ldot(phi)
mat(delim: "(", costhetacosphi; sinthetacosphi; -sinphi)
$$

$$

v^2 = (dot(x)-ldot(theta)sintheta+ldot(phi)costhetacosphi)^2 + (dot(y)+ldot(theta)costheta+ldot(phi)sinthetacosphi)^2 + (-ldot(phi)sinphi)^2 \

=dot(x)^2 + l^2dot(theta)^2sin^2theta + l^2dot(phi)^2cos^2thetacos^2phi - 2dot(x)ldot(theta)sintheta - 2l^2dot(theta)dot(phi)sinthetacosthetacosphi + 2ldot(x)dot(phi)costhetacosphi\

+ dot(y)^2+l^2dot(theta)^2cos^2theta+l^2dot(phi)^2sin^2thetacos^2phi + 2dot(y)ldot(theta)costheta + 2l^2dot(theta)dot(phi)costhetasinthetacosphi + 2ldot(y)dot(phi)sinthetacosphi\

+ l^2dot(phi)^2sin^2phi \

= dot(x)^2 + dot(y)^2 + l^2dot(theta)^2 + l^2dot(phi)^2 + 2ldot(theta)(-dot(x)sintheta + dot(y)costheta) + 2ldot(phi)cosphi(dot(x)costheta + dot(y)sintheta)


$$

ラグランジアンは

$$
L=(1)/(2) m[dot(x)^2 + dot(y)^2 + l^2dot(theta)^2 + l^2dot(phi)^2 + 2ldot(theta)(-dot(x)sintheta + dot(y)costheta) + 2ldot(phi)cosphi(dot(x)costheta + dot(y)sintheta)]-mglcosphi
$$

以下$m$ は省略する

$$

(partial L)/(partial x) =0 \

(partial L)/(partial dot(x)) = dot(x) - ldot(theta)sintheta + ldot(phi)cosphicostheta \

d{t}(partial L)/(partial dot(x)) = dot.double(x) - ldot.double(theta)sintheta - ldot(theta)^2costheta + ldot.double(phi)cosphicostheta - ldot(phi)^2sinphicostheta - ldot(phi)dot(theta)cosphisintheta \

(partial L)/(partial y) =0 \

(partial L)/(partial dot(y)) = dot(y) + ldot(theta)costheta + ldot(phi)cosphisintheta \

d{t}(partial L)/(partial dot(y)) = dot.double(y) + ldot.double(theta)costheta - ldot(theta)^2sintheta + ldot.double(phi)cosphisintheta - ldot(phi)^2sinphisintheta + ldot(phi)dot(theta)cosphicostheta \

(partial L)/(partial theta) = ldot(theta)(-dot(x)costheta - dot(y)sintheta) + ldot(phi)cosphi(-dot(x)sintheta + dot(y)costheta) \

(partial L)/(partial dot(theta)) = l^2dot(theta) + l(-dot(x)sintheta + dot(y)costheta) \

d{t}(partial L)/(partial dot(theta)) = l^2dot.double(theta) + l(-dot.double(x)sintheta -dot(x)dot(theta)costheta + dot.double(y)costheta - dot(y)dot(theta)sintheta) \

(partial L)/(partial phi) = -ldot(phi)sinphi(dot(x)costheta + dot(y)sintheta)+glsinphi\

(partial L)/(partial dot(phi)) = l^2dot(phi) + lcosphi(dot(x)costheta + dot(y)sintheta)\

d{t}(partial L)/(partial dot(phi)) = l^2dot.double(phi) - ldot(phi)sinphi(dot(x)costheta + dot(y)sintheta) + lcosphi(dot.double(x)costheta + dot.double(y)sintheta) + + ldot(theta)cosphi(-dot(x)sintheta + dot(y)costheta)


$$

オイラー・ラグランジュの運動方程式

$$
(partial L)/(partial x_i)-d{t}(partial L)/(partial dot(x_i))=0
$$

より，

$$

0  = dot.double(x) - ldot.double(theta)sintheta - ldot(theta)^2costheta + ldot.double(phi)cosphicostheta - ldot(phi)^2sinphicostheta - ldot(phi)dot(theta)cosphisintheta \

0 = dot.double(y) + ldot.double(theta)costheta - ldot(theta)^2sintheta + ldot.double(phi)cosphisintheta - ldot(phi)^2sinphisintheta + ldot(phi)dot(theta)cosphicostheta \

ldot(theta)(-dot(x)costheta - dot(y)sintheta) + ldot(phi)cosphi(-dot(x)sintheta + dot(y)costheta)  = l^2dot.double(theta) + l(-dot.double(x)sintheta -dot(x)dot(theta)costheta + dot.double(y)costheta - dot(y)dot(theta)sintheta) \

-ldot(phi)sinphi(dot(x)costheta + dot(y)sintheta)+glsinphi = l^2dot.double(phi) - ldot(phi)sinphi(dot(x)costheta + dot(y)sintheta) + lcosphi(dot.double(x)costheta + dot.double(y)sintheta) + ldot(theta)cosphi(-dot(x)sintheta + dot(y)costheta)


$$

## 状態方程式
