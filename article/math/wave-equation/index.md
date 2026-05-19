---
title: 波動方程式
---

$$
(1)/(c^2)(partial^2 )/(partial t^2)u(x,t)=(partial^2 )/(partial x^2)u(x,t)
$$

を、境界条件

$$
u(0,t)=u(L,t)=0
$$

と、初期条件

$$
u(x,0)=f(x),quad (partial )/(partial t)u(x,0)=g(x)
$$

で解く。

### x 成分

まず、$(partial^2 )/(partial x^2)$ の固有ベクトルを求める。

$$
(partial^2 )/(partial x^2) v(x) = lambda v(x)
$$

$$
v(x) = c_1 sin(sqrt(-lambda) x) + c_2 cos(sqrt(-lambda) x)
$$

境界条件から、

$$
v(0) = c_2 = 0
$$

$$
v(L) = c_1sin(sqrt(-lambda)L) = 0
$$

これを満たす$lambda$は、$i=1,2,3,,,$ として、

$$
lambda_i = -(i^2pi^2)/(L^2)
$$

$$
v_i(x) = c_1 sin lr(((ipi x)/(L)r))
$$

規格化条件 $lr(angle.l v_i, v_j angle.r)=delta_("ij")$ を満たすようにすると、

$$
v_i(x)=sqrt((2)/(L))sin lr(((ipi x)/(L)r))
$$

### t 成分

同様に、$(1)/(c^2)(partial^2 )/(partial t^2)$ の固有ベクトルは、

$$
a_j(t)=beta_jcos(jpi ct)/(L)+gamma_jsin(jpi ct)/(L)
$$

### 一般解

$$
u(x,t) = sum_j a_j(t)v_j(x)
$$

$$
(1)/(c^2)(partial^2 )/(partial t^2)u(x,t)=sum_j
$$

### 初期条件

$$
u(x,0) = sum_j a_j(0)v_j(x) = sum_j beta_jv_j(x) = f(x)
$$

より、

$$
beta_j=lr(angle.l f(x), v_j(x) angle.r)
$$

$$
dot(u)(x,0) = sum_j dot(a_j)(0)v_j(x) = (jpi c)/(L)gamma_j v_j(x) = g(x)
$$

より、

$$
gamma_j = (L)/(jpi c)lr(angle.l g(x), v_j(x) angle.r)
$$

### 解

$$
u(x,t)=sum_il(lr(angle.l u_0, v_i angle.r)cos lr(((ipi c t)/(L)r))+(L)/(ipi c)lr(angle.l dot(u_0), v_i angle.r)sin lr(((ipi c t)/(L)r))r)sqrt((2)/(L))sin lr(((ipi x)/(L)r))
$$
