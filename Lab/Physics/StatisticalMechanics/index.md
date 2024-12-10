---
title: 統計力学
---

## 位相空間

### $\Gamma$空間

$N$ 質点系の状態 → $6N$ 次元空間の一点（代表点）

系の時間変化は $\Gamma$ 空間上を代表点が運動することと同じとみなせる

#### ハミルトニアン

$$
H(q,p)=\sum\frac{p^2}{2m}+\Phi(q)
$$

#### エルゴード面

$$
H(q,p)=\mathrm{Const}
$$

孤立系はエネルギーを保存するのでエルゴード面上を運動する

### ハミルトンの運動方程式

$$
\dot{q}=\frac{\partial H}{\partial p},\, \dot{p}=-\frac{\partial H}{\partial q}
$$

軌跡は交わらない（交点に 2 通りの速度が存在することになるので）

### 熱平衡と統計的物理量の存在

ある系の物理量 $Q(q,p)$ を観測したとき，観測値は観測時間平均

$$
\langle Q \rangle = \int_0^\tau Q(q(t)),p(t)) dt
$$

熱平衡状態の場合，（微小時間のゆらぎが無視できる程度の）十分な測定時間をとれば一定の観測値になっていてほしい．

> 軌道がエルゴード面上のすべての点を等確率で通過する

$\Gamma$空間中の微小体積を軌道が通過する確率を $\rho(q,p)dqdp$ とする

統計平均

$$
\bar{Q}=\int Q(q,p)\rho(q,p) dqdp
$$

> 系の軌道がエルゴード的であるとき，
>
> $$
> \langle Q \rangle=\bar{Q}
> $$

### リウビルの定理

$\Gamma$空間のある閉曲面内の代表点の集合を考える．これらの点が運動してもその点が存在する領域の面積は保存される．

### ミクロカノニカル分布

エルゴード面上の一様な分布

微小な等エネルギー領域 $E \leq H(q,p)\leq E+dE$ で $\rho(q,p)=\mathrm{Const}$

### 等確率の原理

> 同じエネルギーを持つ微視的状態の出現確率は等しい

ミクロカノニカル分布はこう言い換えられる

## ミクロカノニカルアンサンブル

$N$ 個の粒子があり，全エネルギーが $E$ の系について，エネルギーが $E_i$ である状態 $i$ に存在している粒子の数 $N_i$ を知りたい．

$$
\sum_i N_i  = N, \quad
\sum_i E_i N_i  = E
$$

粒子ひとつひとつを区別した微視的状態は等確率に出現するが， 粒子を区別せずに巨視的状態として見たときは，分布に偏りが生ずる．

ある巨視的状態に含まれる微視的状態の数は

$$
W(N_0,N_1,,,)=\frac{N!}{N_1!N_2!...}
$$

最もよく出現する巨視的状態 $(N_1,N_2,,,)$ は $W$ が最大となる状態で，

$$
N_i = C\exp\left(-\frac{E_i}{k_BT}\right)
$$

これをボルツマン分布という．

N が十分大きいとき，粒子系はボルツマン分布になっている．

#### 導出

$$
\begin{aligned}
\log W &= \log N! - \sum_i \log N_i! \\
&= N\log N - N - \sum_i (N_i\log N_i - N_i) \\
&= N\log N - \sum_i (N_i\log N_i) \\
\end{aligned}
$$

これを最大とする $(N_1,N_2,,,)$ を求めたい．

$$
F(N_1,N_2,,,\alpha,\beta) := \log W(N_1,N_2,,,) - \alpha \left(\sum_i N_i-N\right) - \beta \left(\sum_i E_iN_i - E \right)
$$

とおくと，ラグランジュの未定乗数法により

$$
\frac{\partial F}{\partial N_i} = 0
$$

$$
\begin{aligned}
\partial F &= \partial \left( -\sum_i N_i \log N_i - \alpha \sum_i N_i - \beta \sum_i E_iN_i \right) \\
           &= \sum_i (-\log N_i -\alpha -\beta E_i) \partial N_i \\
\frac{\partial F}{\partial N_i} &= -\log N_i - \alpha - \beta E_i \\
                                &= 0
\end{aligned}
$$

$$
N_i = A_i \exp(\beta E_i)
$$

## エントロピー

ある微視的状態 $i$ が出現する確率 $P_i$

$$
S=-k_B\sum_i P_i\ln P_i
$$

ミクロカノニカルの場合 $P_i=1/W$ なので，ボルツマンの関係式

$$
S=k_B\ln W
$$

エントロピー：熱力学 と 微視的状態数：統計力学 を結びつける式になっている．

ボルツマン分布の場合

$$
S = k_B (N\ln N - \sum_i N_i \ln N_i) = k_B N\ln N - k_B N \ln C + \frac{E}{T}
$$

### 配置エントロピー

$N$ マスの空間（１マスの体積 $v$ ）に $n$ 個の分子を排他的に配置する．

微視的状態数

$$
W=\frac{N^n}{n!}
$$

配置エントロピー

$$
S=k_b\ln(\frac{N^n}{n!})
$$

$$
\frac{d S}{d V} = \frac{k_B}{v}\frac{d}{dN}\{n\ln N-\ln(n!)\} = \frac{k_B n}{V}
$$

一方，熱力学から

$$
\left(\frac{\partial S}{\partial V}\right)_U=\frac{P}{T}
$$

状態方程式

$$
PV=nk_BT
$$

## カノニカル分布（カノニカルアンサンブル）（正準分布）

熱浴 B とそれに接する系 A

$$
N_A+N_B=N\\
E_A+E_B=E\\
W(E_A,E_B)=W_A(E_A)W_B(E-E_A)
$$

$$
W(E)=\sum_{E_A+E_B=E}W(E_A,E_B)=\sum_{E_A}W_A(E_A)W_B(E-E_A)=W_A*W_B
$$

## マクスウェル・ボルツマンの速度分布

理想気体の速度分布をミクロカノニカルアンサンブルで考える．

速度 $v=(v_x,v_y,v_z)$ の分子のエネルギーは

$$
\varepsilon=\frac{1}{2}m(v_x^2+v_x^2+v_x^2)
$$

なので，分布は

$$
f(v_x,v_y,v_z) \propto \exp\left(-\frac{\varepsilon}{k_BT}\right)=\exp\left\{-\frac{m}{2k_BT}(v_x^2+v_x^2+v_x^2)\right\}
$$

正規化

$$
\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}
\int_{-\infty}^{\infty} dv_x dv_y dv_z \exp\left\{-\frac{m}{2k_BT}(v_x^2+v_x^2+v_x^2)\right\} = 1
$$

より係数が決まり，

$$
f(v_x,v_y,v_z) = \left(\frac{m}{2\pi k_B T}\right)^{3/2}\exp\left\{-\frac{m}{2k_BT}(v_x^2+v_x^2+v_x^2)\right\}
$$

### 速さの分布

$$
f(v) = 4\pi \left(\frac{m}{2\pi k_B T}\right)^{3/2} v^2 \exp\left(-\frac{mv^2}{2k_BT}\right)
$$

$$
v_{max} = \sqrt{\frac{2k_BT}{m}}
$$

$$
\langle v \rangle = \int vf(v) dv = \sqrt{\frac{8k_BT}{\pi m}}
$$

$$
\langle v^2 \rangle = \int v^2 f(v) dv = \frac{3}{2} \left( \frac{2k_BT}{m} \right)
$$

平均エネルギー

$$
\langle \varepsilon \rangle = \frac{1}{2} m \langle v^2 \rangle = 3 \left(\frac{1}{2}k_BT\right)
$$

### 実際の分子

単元子分子の比熱 (J/mol)

$$
E = N \frac{3}{2} k_B T = \frac{3}{2} RT
$$

$$
C_v = \frac{3}{2} R
$$

二原子分子は 並進運動 (xyz) + 回転運動 (2 軸) + 伸縮振動 の自由度

$$
C_v = \frac{7}{2}
$$

| Cv  | 80K   | 100K  | 273K  | 2000K |
| --- | ----- | ----- | ----- | ----- |
| Ar  |       | 1.55R | 1.5R  | 1.51R |
| N2  | 2.58R | 2.5R  | 2.93R | 3.29R |

## 分子の運動学

### 平均自由行程

他の分子と衝突するまでに分子が移動する距離の平均

$$
l = \tau \times v
$$

ロシュミット数（標準状態の気体 1L に含まれる分子数）$n_0=N_A/V_{mol}$

### クヌッセン数

代表長さ $L$ に対する，平均自由行程 $l$ の比

$$
\mathrm{Kn}:=\frac{l}{L}
$$

|                |            |        |                      |                                      |
| :------------: | ---------- | :----: | -------------------- | ------------------------------------ |
|   Kn < 0.01    | 連続流     |  平衡  | マクスウェル分布     | 分子間がいっぱい衝突して平衡に近づく |
| 0.01 < Kn < 10 | 中間流     |   ↓    |                      |                                      |
|    10 < Kn     | 自由分子流 | 非平衡 | ボルツマン輸送方程式 | 不均一がなかなか消えない             |

### ボルツマンの輸送方程式

非平衡（高クヌッセン数）の支配方程式

分布関数 $f(x,v,t)$ （時刻 $t$ に状態 $x,v$ にある粒子数）について，

$$
\pd[f]{t} + v\pd[f]{r} + \frac{F}{m}\pd[f]{v} = \int\int (f'_1f'_2 - f_1f_2)|v_1-v_2|d\Omega dv_1
$$

### 分子衝突のない場合

位相空間上で粒子の動きを追尾する

$$
f(x,v,t) = f(x + v\Delta t, v, t + \Delta t)
$$

$t$ に $(x,v)$ の状態にいたとき，$t+\Delta t$ では $(x+v\Delta t,v)$ にいることを意味している．

$$
\begin{aligned}
f(x + v\Delta t, v, t + \Delta t) - f(x,v,t)
    &= f(x + v\Delta t, v, t + \Delta t) - f(x,v,t) \\
    &= f(x + v\Delta t, v, t + \Delta t) - f(x + v\Delta t, v, t) + f(x + v\Delta t, v, t) - f(x,v,t) \\
    &= \pd[f]{t}\Delta t + v \cdot \nabla f \Delta t \\
\end{aligned}
$$

$$
\pd[f]{t} + v \cdot \nabla f = 0
$$

### 分子衝突がある場合

時刻 $t_0$ に空間上の点 $x_0$ に流入する運動量の合計は

$$
\int_{-\infty}^{\infty} mvf(x_0,v,t_0) dv
$$

実際には $f(x,v,t)$

$$
\pd[f]{t} + v \cdot \nabla f = \left(\pd[f]{t}\right)_{\mathrm{Coll}}
$$

### 緩和時間近似

平衡状態 $f_0$ からそれほど離れていない場合は，平衡状態への緩和時間を $\tau$ として，

$$
\pd[f]{t} + v \cdot \nabla f = \left(\pd[f]{t}\right)_{\mathrm{Coll}} \simeq -\frac{f-f_0}{\tau}
$$

の近似ができる．

### 境界条件

自由分子流の場合はこれだけで流れが決まる（分子間の衝突がないので）

#### 鏡面反射

#### 拡散反射
