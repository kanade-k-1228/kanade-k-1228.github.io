---
title: 数値流体解析
---

## 解析の手法

### 有限要素法

### 有限体積法

## 移流拡散方程式

$phi$ という物理量が、速度場 $u$ で輸送される。

$$
(partial phi)/(partial t) + (u^Tnabla)phi = lambdanabla^2phi
$$

移流項：$(u^Tnabla)phi$

拡散項：$lambdanabla^2phi$

移流項は1階微分で計算しにくいが、拡散項は2階微分で数値計算しやすい。
