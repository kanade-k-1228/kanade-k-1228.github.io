---
title: TinyFPGA BX の使い方
date: 2022-03-26
keywords: TinyFPGA, TinyFPGA BX, FPGA, Lattice, ice40, Icestudio
---

TinyFPGA BX は Lattice 社製の FPGA、iCE40LP8K を搭載した開発ボードです。iCE40 は一連の開発ツールが完全にオープンソース化されている数少ない FPGA です。

## 情報リンク

- iCE 40
  - [iCE 40 Family Handbook](https://www.latticesemi.com/~/media/LatticeSemi/Documents/Handbooks/iCE40FamilyHandbook.pdf)
  - [iCE 40 DataSheet](https://www.latticesemi.com/~/media/LatticeSemi/Documents/DataSheets/iCE/iCE40LPHXFamilyDataSheet.pdf)
  - [iCE 40 Programming and Configuration](https://www.latticesemi.com/view_document?document_id=46502)
  - [iCE40 ユーザーガイド](https://www.macnica.co.jp/business/semiconductor/articles/iCE40_UserGuide_rev1.7__2.pdf)
- IceStudio
  - [リポジトリ](https://github.com/FPGAwars/icestudio)
  - [インストールマニュアル](https://github.com/FPGAwars/icestudio/wiki/Installation)
- TinyFPGA BX
  - [ウェブサイト](https://tinyfpga.com/)
  - [TinyFPGA BX ユーザーガイド](https://tinyfpga.com/b-series-guide.html)
  - [リポジトリ](https://github.com/tinyfpga/TinyFPGA-BX)
  - [TinyFPGA BX 回路図](https://github.com/tinyfpga/TinyFPGA-BX/blob/master/board/TinyFPGA-BX-Schematic.pdf)
  - [TinyFPGA ブートローダ](https://github.com/tinyfpga/TinyFPGA-Bootloader)
  - 通販
    - [CrowdSupply](https://www.crowdsupply.com/tinyfpga/tinyfpga-ax-bx)
    - [Sparkfun](https://www.sparkfun.com/products/14829)
    - [Mouser](https://www.mouser.jp/new/crowd-supply/crowd-supply-tinyfpga-bx-board/)
    - [千石電商](https://www.sengoku.co.jp/mod/sgk_cart/detail.php?code=EEHD-5C6J)
    - ※ どこも在庫切れ（2022/06/26 確認）みたいです orz………おらの村には半導体がねぇ
- ほか
  - [RISC-V on FPGA (the tinyFPGA) via WSL - Part 2](https://gojimmypi.blogspot.com/2019/01/risc-v-on-fpga-tinyfpga-via-wsl.html)
  - [AT25SF041B SPI Flash データシート](https://www.mouser.jp/datasheet/2/590/at25sf041b-1888127.pdf)

## TinyFPGA 内蔵ブートローダのアップデート

Python と pip が必要なのでインストールしておきましょう。

TinyFPGA に必要なツールをインストールします。依存するモジュールをインストールしろと言われたらインストールします。

```
pip install tinyprog
```

TinyFPGA ボードを PC に接続して、認識されるか確認します。

※ Windows 10 以前のバージョンを使っている場合、[Virtual Serial Port](https://www.pjrc.com/teensy/usb_serial.html) が必要なようです。

TinyFPGA のブートローダのアップデートをします。

```
tinyprog --update-bootloader
```

※ TinyFPGA BX にはプログラマ基板が不要です。その代わり、FPGA の一部にプログラマ回路が書き込まれています。間違えて上書きしてしまった場合、Arduino を使ってブートローダを復元することができます。参考 → [Programming with an Arduino](https://github.com/tinyfpga/TinyFPGA-B-Series/tree/master/programmer_arduino)

## 開発環境

- Lattice の iCEcube2
  - iCE40 ユーザーガイドに書かれてる方法
- OSS の CLI ツールでやる方法
- APIO (Atom プラグイン)
  - オープンソースのツールチェーン
  - [APIO ドキュメント](https://apiodoc.readthedocs.io/en/stable/source/installation.html)
- Icestorm
  - [tinyFPGA-BX board に Terminal のみで build とボードへの書き込みを行った](https://qiita.com/KYhei/items/0b8fb029bb8813c8cbd6)
- **Icestudio ← 今回はこれ**
  - オープンソースのビジュアル HDL 開発環境

[Icestudio](https://icestudio.io/#lk-download)をインストールします。インストーラに従うだけなので省略。

Icestudio を開いて、

ボードの選択画面が出てきたら、TinyFPGA BX を選択。

右下のポップアップに従って必要なツールをインストール。

## L チカ

サンプルコードから、L チカを選択。

![](./img/11.png)

Convert を選択。

![](./img/12.png)

LED を接続するピンを選択。

![](./img/13.png)

TinyFPGA ボードを接続して、右下の Upload をクリック。

![](./img/14.png)

L チカしました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/hzZ5VPpSlpU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

※ うまくいかない場合、**USB アダプタに接続して電源のみを供給** すると、L チカするはずです。PC に接続すると、ブートローダは通信待機状態で起動してしまい、ユーザーイメージを読み込みません。

## WSL2 + Ubuntu での環境構築

[Project Ice Storm](https://clifford.at/icestorm)

makeは-jで適宜並列化してね

```
sudo apt update
sudo apt install build-essential git cmake clang bison flex libreadline-dev gawk tcl-dev libffi-dev mercurial graphviz xdot pkg-config libftdi-dev qt5-default libboost-all-dev libeigen3-dev python python3 python3-dev
```

#### icestorm

```
git clone https://github.com/YosysHQ/icestorm.git
cd icestorm
make
sudo make install
```

#### arachine-pnr

```
git clone https://github.com/cseed/arachne-pnr.git
cd arachne-pnr
make
sudo make install
```

#### nextpnr

```
git clone https://github.com/YosysHQ/nextpnr.git
cd nextpnr
cmake . -DARCH=ice40
make
sudo make install
```

#### yosys

```
git clone https://github.com/YosysHQ/yosys.git
cd yosys
git checkout <select release commit (yosys-0.30)>
sudo apt update
sudo apt install build-essential clang bison flex \
	libreadline-dev gawk tcl-dev libffi-dev git \
	graphviz xdot pkg-config python3 libboost-system-dev \
	libboost-python-dev libboost-filesystem-dev zlib1g-dev
make
sudo make install
make test
```

#### riscv-gnu-toolchain

```
git clone https://github.com/riscv/riscv-gnu-toolchain
sudo apt-get install autoconf automake autotools-dev curl python3 python3-pip libmpc-dev libmpfr-dev libgmp-dev gawk build-essential bison flex texinfo gperf libtool patchutils bc zlib1g-dev libexpat-dev ninja-build git cmake libglib2.0-dev
```

ここでターゲットのアーキテクチャを指定します。
multilib　にするといろいろなISA（IとかMとかC）に対応できる。

```
./configure --prefix=/opt/riscv --enable-multilib
make newlib
```

### RISC-VでLチカ

[TinyFPGA-BX](https://github.com/tinyfpga/TinyFPGA-BX)にあるサンプルを試します。

#### 参考

- [TinyFPGA BX で RISC-V を動かしてみる（その1）](https://flogics.com/wp/ja/2019/12/running-risc-v-on-tinyfpga-bx/)
- [TinyFPGA BX で RISC-V を動かしてみる（nextpnr 編）](https://flogics.com/wp/ja/2019/12/running-risc-v-on-tinyfpga-bx-part2/)

### WSL2 に USB を渡す

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

※ attach でエラーが出る。FPGA側のUSBを書き換える必要がありそう。

### Windows 側で書き込む

WSL側からWindowsのプロセスを起動し書き込みを行う。

Windowsの環境変数に `$env:WSLHome = \\wsl.localhost\Ubuntu\home\[user]` を追加し、PowerShellで、

```
tinyprog -p $env:WSLHome\TinyFPGA-BX\examples\picosoc\hardware.bin -u $env:WSLHome\TinyFPGA-BX\examples\picosoc\hardware.bin
```

すれば書き込めます。これをWSL側から起動します。Makefile参照。Windowsの環境変数 `$env:WSLHome` を使うには、Linuxの環境変数記号 `$` をエスケープして `\$env:WSLHome` とし、Makefileの変数記号 `$` をエスケープするために `\$$env:WSLHome` とする。

### Makefile

```
CC=riscv64-unknown-elf-gcc
OBJCOPY=riscv64-unknown-elf-objcopy

upload: hardware.bin firmware.bin
	powershell.exe /c "tinyprog -p \$$env:WSLHome\TinyFPGA-BX\examples\picosoc\hardware.bin -u \$$env:WSLHome\TinyFPGA-BX\examples\picosoc\firmware.bin"

hardware.json: hardware.v spimemio.v simpleuart.v picosoc.v picorv32.v
	yosys -ql hardware.log -p 'synth_ice40 -top hardware -json hardware.json' $^

hardware.asc: hardware.pcf hardware.json
	nextpnr-ice40 --lp8k --package cm81 --asc hardware.asc --pcf hardware.pcf --json hardware.json

hardware.bin: hardware.asc
	icetime -d lp8k -c 12 -mtr hardware.rpt hardware.asc
	icepack hardware.asc hardware.bin


firmware.elf: sections.lds start.S firmware.c 
	$(CC) -march=rv32imc -mabi=ilp32 -nostartfiles -Wl,-Bstatic,-T,sections.lds,--strip-debug,-Map=firmware.map,--cref  -ffreestanding -nostdlib -o firmware.elf start.S firmware.c

firmware.bin: firmware.elf
	$(OBJCOPY) -O binary firmware.elf /dev/stdout > firmware.bin


clean:
	rm -f firmware.elf firmware.hex firmware.bin firmware.o firmware.map \
	      hardware.json hardware.log hardware.asc hardware.rpt hardware.bin
```
