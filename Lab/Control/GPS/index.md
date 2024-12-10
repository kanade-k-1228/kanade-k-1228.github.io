---
title: GPSデータの座標系と変換
keyword: GPS, GNSS, 座標系
---

GPSから取得された緯度・経度をそのままXY座標として扱ってしまった場合、あなたは地球平面論者とみなされても仕方がない。測地データの正しい扱い方を知り、世界の中から世界の形状を理解する多様体の喜びを享受しよう。

## 座標系

### Earth Centered Earth Fixed

`{x, y, z}`

地球の中心を原点とし、`{lat:0, lng:0}`　方向をx軸、`{lat:90, lng:0}`方向をy軸、北極方向をz軸とした座標系である。

### Geodetic

`{lat, lng, alt}`

基準点からz軸周りの角度を`lng`、赤道からの角度を`lat`、その緯度経度における高度基準点からの高度を`alt`とする座標系である。
高度基準点の取り方は測地系で定められているため、どの測地系で測られた値なのかをよく確認する必要がある。
GPSで使用されている `WGS84` は、地球を楕円体とみなして高度基準点を設定している。
国土地理院で使用されている測地系はこれとは異なるようである。

### Local Tangent Plane

`{n, e, d}`

Geodetic上のある点 `{lat, lng, alt}` を中心に、北方向をn座標、東方向をe座標、地球中心方向をd座標とした座標系である。
点ごとに座標系が定義されることに注意されたい。

## 座標変換

座標変換の数式は以下のWikipediaを参照されたい。

[Geographic coordinate conversion - Wikipedia](https://en.wikipedia.org/wiki/Geographic_coordinate_conversion)

### Geo ⇄ ECEF

Geo → ECEF は三角関数を用いた単純な座標変換である。

逆に ECEF → Geo は陽に解くことができない。

#### Python

`pymap3d` というパッケージを使用する。

https://github.com/geospace-code/pymap3d

```python:
import pymap3d as pm
x,y,z = pm.geodetic2ecef(lat, lng, alt)
```

#### C++

`pymap3d` の C++ 版である `cppmap3d` というライブラリを使用する。

https://github.com/ClancyWalters/cppmap3d

```cpp:
#include "cppmap3d.hh"

double x, y, z;
cppmap3d::geodetic2ecef(lat, lon, alt, x, y, z);
```

ECEF → Geodetic の変換アルゴリズムをまとめたリポジトリが存在している。

https://github.com/planet36/ecef-geodetic

### NED ⇄ ECEF

NEDからECEFに変換するには、NEDの原点の座標が必要である。なぜなら、NEDは地球上の点に対して定義された局所座標系であるからだ。

#### Python

#### C++

## GPSデータの変換

GPSモジュールの中では、複数の衛星から受信したGPS信号を用いて位置と速度を求める計算処理が行われているが、ユーザはそれらを気にせずに整理されたデータを使うことができる。

### 緯度・経度・高度

Geo 座標であるから、WGS84 の Geo → ECEF の変換式にそのまま入れればよい。

### 速度

NED 座標における速度である。NED → ECEF の変換式にそのまま入れればよいと思われるかもしれないが、速度はベクトルであるので回転するだけでよい。回転行列は緯度経度から求められる。

#### Python

```python:
enu2uvw(e,n,-d,lat,lon)
```
