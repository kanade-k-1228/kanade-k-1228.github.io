---
title: 波動方程式
---

$$
\f{1}{c^2}\pdd{}{t}u(x,t)=\pdd{}{x}u(x,t)
$$

を、境界条件

$$
u(0,t)=u(L,t)=0
$$

と、初期条件

$$
u(x,0)=f(x),\t \pd{}{t}u(x,0)=g(x)
$$

で解く。

### x 成分

まず、$\pdd{}{x}$ の固有ベクトルを求める。

$$
\pdd{}{x} v(x) = \lambda v(x)
$$

$$
v(x) = c_1 \sin(\sqrt{-\lambda} x) + c_2 \cos(\sqrt{-\lambda} x)
$$

境界条件から、

$$
v(0) = c_2 = 0
$$

$$
v(L) = c_1\sin(\sqrt{-\lambda}L) = 0
$$

これを満たす$\lambda$は、$i=1,2,3,,,$ として、

$$
\lambda_i = -\f{i^2\pi^2}{L^2}
$$

$$
v_i(x) = c_1 \sin\l(\f{i\pi x}{L}\r)
$$

規格化条件 $\inner{v_i}{v_j}=\delta_{ij}$ を満たすようにすると、

$$
v_i(x)=\sqrt{\f{2}{L}}\sin\l(\f{i\pi x}{L}\r)
$$

### t 成分

同様に、$\f{1}{c^2}\pdd{}{t}$ の固有ベクトルは、

$$
a_j(t)=\beta_j\cos\f{j\pi ct}{L}+\gamma_j\sin\f{j\pi ct}{L}
$$

### 一般解

$$
u(x,t) = \sum_j a_j(t)v_j(x)
$$

$$
\f{1}{c^2}\pdd{}{t}u(x,t)=\sum_j
$$

### 初期条件

$$
u(x,0) = \sum_j a_j(0)v_j(x) = \sum_j \beta_jv_j(x) = f(x)
$$

より、

$$
\beta_j=\inner{f(x)}{v_j(x)}
$$

$$
\dot{u}(x,0) = \sum_j \dot{a_j}(0)v_j(x) = \f{j\pi c}{L}\gamma_j v_j(x) = g(x)
$$

より、

$$
\gamma_j = \f{L}{j\pi c}\inner{g(x)}{v_j(x)}
$$

### 解

$$
u(x,t)=\sum_i\l(\inner{u_0}{v_i}\cos\l(\f{i\pi c t}{L}\r)+\f{L}{i\pi c}\inner{\dot{u_0}}{v_i}\sin\l(\f{i\pi c t}{L}\r)\r)\sqrt{\f{2}{L}}\sin\l(\f{i\pi x}{L}\r)
$$
