---
title: TangNano9k の使い方
date: 2023-07-01
keywords: TangNano, tangnano, FPGA, gowin
---

今さらですがTangNanoを触ります。

Interfaceのおかげで全人類FPGAに入門しているので、この記事ではIDEを使わずに全てCLIだけで開発します。

原発でも動かすのか？ってぐらい複雑なIDEが嫌いすぎて、、、（参考：[チェルノブイリ原発シミュ](https://www.nicovideo.jp/watch/sm38241694)）

## [yosys](https://github.com/YosysHQ/yosys)

なんでも合成してくれるyosys先生。

以下インストール手順です。`git checkout` で latest のリリースを選んでください。

```
git clone https://github.com/YosysHQ/yosys.git
cd yosys
git checkout yosys-0.30 # select latest release commit
sudo apt update
sudo apt install build-essential clang bison flex \
	libreadline-dev gawk tcl-dev libffi-dev git \
	graphviz xdot pkg-config python3 libboost-system-dev \
	libboost-python-dev libboost-filesystem-dev zlib1g-dev
make
sudo make install
make test
```

合成コマンドは、`synth_gowin`

```
yosys -p "synth_gowin -json top.json -top top" $^
```

## [apicula](https://github.com/YosysHQ/apicula)

Gowin の FPGA をリバースエンジニアリングしてオープンソース化するプロジェクトみたいです。ありがたい話し❗️助かる❗️助かる❗️

pythonのpipでインストールします。

```
pip install apycula
```

パッキングのコマンドは、

```
gowin_pack -d GW1N-1 -o top.fs top.pack
```

## [nextpnr](https://github.com/YosysHQ/nextpnr)

これまたおなじみなんでも配置配線 (place and route) してくれるnextpnr先生。

以下インストール手順です。

```
git clone https://github.com/YosysHQ/nextpnr.git
cd nextpnr
git checkout nextpnr-0.6 # select latest release commit
cmake . -DARCH=gowin
make
sudo make install
```

nextpnrはたくさんのFPGAを使ってるオタク君に優しいギャルなので、

```
cmake . -DARCH="ice40;gowin"
```

というように、`;` 区切りにすれば複数のアーキテクチャに対応したビルドができます。

また、cmakeでgowin_bbrが見つからないと言われたら、

```
cmake . -DARCH=gowin -DGOWIN_BBA_EXECUTABLE=`which gowin_bba`
```
してください。それでも怒られたら、たぶんパスが通ってないので、

```
export PATH=$HOME/.local/bin:$PATH
```

してください。

pnrのコマンドは、

```
nextpnr --json top.json --write top.pack --device GW1N-LV1QN48C6/I5 --cst tangnano.cst
```

## [openFPGALoader](https://github.com/trabucayre/openFPGALoader)

なんでも書き込みしてくれるopenFPGALoader先生。

```
git clone https://github.com/trabucayre/openFPGALoader.git
cd openFPGALoader
git checkout v0.10.0 # select latest release commit
mkdir build
cd build
cmake ../ 
cmake --build .
sudo make install
```

書き込みコマンドは

```
openFPGALoader -b tangnano top.fs
```

### WSL

WSL2でUSBを使うには、[USB デバイスを接続する](https://learn.microsoft.com/ja-jp/windows/wsl/connect-usb)

PowerShellをadminで開き、

```
usbipd wsl list
usbipd wsl attach --busid <BUS-ID>
```

ここでエラーが出たので、
[WSL-support](https://github.com/dorssel/usbipd-win/wiki/WSL-support)
に従ってコマンドをたたいたら、いけました。

WSL2側で `lsusb` すれば認識されてるはず。

### Windows

MSYS2を使えば Windows で実行できるようです。

1. MSYS2 をインストール
2. UCRT x64 環境（黄色のロゴ）を起動
3. openFPGAloaderをインストール

```
pacman -S mingw-w64-ucrt-x86_64-openFPGALoader
```

4. `openFPGAloader` を実行します。

## Makefile

**! TODO**

## Docker化

というわけで、積み上げた開発環境を爆破し更地にして、Docker化します。

コマンドたちがさえずる綺麗な環境を守りたい。。。

**! TODO**

## 参考

- [OS Toolchain Manual Installation | lushaylabs](https://learn.lushaylabs.com/os-toolchain-manual-installation/)
- [MIT 6205 fall 2022](https://fpga.mit.edu/6205/F22/documentation/openFPGA)
