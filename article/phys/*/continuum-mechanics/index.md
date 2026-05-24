---
title: 連続体力学
icon: ocean
abst: ""
---

[Book](https://ocw.kyoto-u.ac.jp/course/9/)

## 登場人物

- $v$ 速度
- $sigma$ 応力（面積力）
- $K$ 体積力

## 連続体上の微分

連続体中の点を指定するには、初期状態での位置か、変位後の位置のどちらかを与えればいい（連続体の変位がわかれば変換できる）。連続体上の場は、初期位置をインデックスとして$F(t,x_0)$、または現在位置をインデックスとして$f(t,x)$と表現される。

$$
F(t,x_0)=f(t,x(x_0,t))
$$

$$
(d)/(d t)F=l((partial )/(partial t)+(dif x_i)/(dif t)(partial )/(partial x_i)))f
$$

$$
D_t:=p_t+v_ip_i
$$

## 保存則

### 質量保存則

$$

p_trho+p_i(rho v_i)=0\

D_trho+rhop_iv_i=0


$$

### 運動量保存則（運動方程式）

$$
D_tv_i=(1)/(rho)p_jsigma_("ji")+K_i
$$

### エネルギー保存則

検査体積について、dt (運動エネルギー + 内部エネルギー) = 体積力による仕事率 + 面積力による仕事率 - 熱流束

$$
(dif )/(dif t)integral_V l((1)/(2)rho v^2 + rhoepsilonr) dV = integral_V l(rho K dot.op vr) dV + integral_S ((sigmadot.op n)dot.op v) dS - integral_S (q dot.op n) dS
$$

$$

D_t l((1)/(2)rho v^2r)=v_jp_isigma_("ij")+rho K_iv_i \

D_t l(rhoepsilonr) = sigma_("ij")p_i v_j - p_i q_i \

D_t l((1)/(2)rho v^2 + rhoepsilonr)=p_i(sigma_("ij") v_i - q_i)+rho K_iv_i \


$$
