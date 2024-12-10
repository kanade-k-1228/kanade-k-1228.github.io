---
title: 自作 RISC-V マイコンを Rust で動かす
keyword: rust, riscv, picorv32, rv32, マイコン, RISC-V
---

いままで C++ をメインの言語として使ってきたのですが、最近コンパイラを作るのに Rust を使ってみたところかなり良かったので、今後作るものは Rust で書いきたいと思っています。ということで今回は FPGA に実装した自作 RISC-V マイコンを Rust で動かす方法を調べて実装してみます。

ソースコードは [@tnakabayashi](https://twitter.com/tnakabayashi) さんの [riscv-rust-hello](https://github.com/tomoyuki-nakabayashi/riscv-rust-hello) を参考にしています。

また以下のドキュメントを参照しました。

[Baremetal Rust for RISC-V](https://speakerdeck.com/tomoyuki/baremetal-rust-for-risc-v)

[Embedded Rust Techniques](https://tomoyuki-nakabayashi.github.io/embedded-rust-techniques/)

[The Embedonomicon](https://tomoyuki-nakabayashi.github.io/embedonomicon/)

[The Embedded Rust Book](https://tomoyuki-nakabayashi.github.io/book/)

[Rust 裏本 高度で危険な Rust Programming のための闇の技法](https://doc.rust-jp.rs/rust-nomicon-ja/)

環境は以下の通り。

```
$ cat /etc/issue
Ubuntu 20.04.6 LTS \n \l
$ rustc -V
rustc 1.75.0 (82e1608df 2023-12-21)
$ cargo -V
cargo 1.75.0 (1d8b05cdd 2023-11-20)
```

## 環境構築

以下のコマンドで使いたいマシンが対応してるか調べることができます。

```
$ rustc --print target-list
> riscv32imc-unknown-none-elf
```

これを target triplet と言い、コンパイラがどの計算機環境での実行バイナリを吐けばいいのかを、以下の項目で指定します。

- arch: riscv32
- sub: imc
- vendor: unknown
- sys: none
- abi: elf

以下のコマンドでクロスコンパイラをインストールします。

```
$ rustup target add riscv32imc-unknown-none-elf
```

### ツールチェーン

objdump や nm などのツールをインストールします。

```
$ cargo install cargo-binutils
$ rustup component add llvm-tools-preview
```

## 最初のプログラム

`main.rs` を書きます。最小限のプログラムです。main すら存在しません。

```
#![no_main]
#![no_std]

use core::panic::PanicInfo;

#[panic_handler]
fn panic(_panic: &PanicInfo<'_>) -> ! {
    loop {}
}
```

ターゲットを指定してコンパイルします。

```
$ rustc --target riscv32imc-unknown-none-elf main.rs
```

言語仕様上パニックハンドラだけは定義する必要があるようです。パニックハンドラを消すと、このようなエラーが出ます。

```
error: `#[panic_handler]` function required, but not found
```

吐かれたバイナリ中身を見てみます。

```
$ rust-objdump ./main -x

./main: file format elf32-littleriscv
architecture: riscv32
start address: 0x00000000

Program Header:
    PHDR off    0x00000034 vaddr 0x00010034 paddr 0x00010034 align 2**2
         filesz 0x00000080 memsz 0x00000080 flags r--
    LOAD off    0x00000000 vaddr 0x00010000 paddr 0x00010000 align 2**12
         filesz 0x000000b4 memsz 0x000000b4 flags r--
   STACK off    0x00000000 vaddr 0x00000000 paddr 0x00000000 align 2**64
         filesz 0x00000000 memsz 0x00000000 flags rw-
 UNKNOWN off    0x000000f4 vaddr 0x00000000 paddr 0x00000000 align 2**0
         filesz 0x00000026 memsz 0x00000026 flags r--

Dynamic Section:

Sections:
Idx Name              Size     VMA      Type
  0                   00000000 00000000
  1 .comment          00000040 00000000
  2 .riscv.attributes 00000026 00000000
  3 .symtab           00000020 00000000
  4 .shstrtab         00000036 00000000
  5 .strtab           0000001d 00000000

SYMBOL TABLE:
00000000 l    df *ABS*  00000000 main.7c41ea6d61ccd5c8-cgu.0
```

### Cargo

Cargo を使えるようにします。
新しくディレクトリを作ります。

```
$ mkdir rvrs
$ cd rvrs
$ cargo init
```

設定ファイルを書きます。

```
# .cargo/config
[build]
target = "riscv32imc-unknown-none-elf"
```

`src/main.rs` を上記のコードで書き換えます。

以下のコマンドでコンパイルできます。

```
$ cargo build
```

以下のコマンドで逆アセンブルできます。

```
$ cargo objdump --bin rvrs -- -x
(省略)
```

謎のシンボルが増えていますが、`cargo build` がデフォルトでデバッグビルドをするためのようです。

`--release` オプションを付けると、リリースビルドをして、逆アセンブルできます。

```
$ cargo build --release
$ cargo objdump --bin rvrs --release -- -x
```

### L チカ (仮)

`0x0300_0000`番地に LED に繋がったレジスタがあるとしましょう。
L チカのコードは以下のようになります。

```
#![no_main]
#![no_std]

#[no_mangle]
pub extern "C" fn __start_rust() -> ! {
    let led = 0x0300_0000 as *mut u8;
    loop {
        unsafe {
            *led = 0;
            *led = 1;
        }
    }
}

use core::panic::PanicInfo;
#[panic_handler]
#[no_mangle]
pub fn panic(_info: &PanicInfo) -> ! {
    loop {}
}
```

`__start_rust` は Rust のエントリポイントです。
`led` というポインタを作って、それの指すアドレスに対して 0 と 1 を交互に書き込んで L チカしています。

これをビルドして中身を見てみます。

```
$ cargo build
$ cargo objdump --bin rvrs -- -d

rvrs:   file format elf32-littleriscv

Disassembly of section .text.__start_rust:

80000000 <_bss_start>:
80000000: 41 11         addi    sp, sp, -16
80000002: 37 05 00 03   lui     a0, 12288
80000006: 2a c6         sw      a0, 12(sp)
80000008: 09 a0         j       0x8000000a <_bss_start+0xa>
8000000a: b7 05 00 03   lui     a1, 12288
8000000e: 01 45         li      a0, 0
80000010: 23 80 a5 00   sb      a0, 0(a1)
80000014: 05 45         li      a0, 1
80000016: 23 80 a5 00   sb      a0, 0(a1)
8000001a: c5 bf         j       0x8000000a <_bss_start+0xa>
```

`12288 = 0x3000` です。

### 最適化オプション

## エントリポイントまで

実際に動作するバイナリを作っていきましょう！

### リンカスクリプト

`.` は変数です！

マイコンが起動すると、まず ROM の 0 番地にある命令が実行されます。
これをリセットベクタと言ったりするのですが、

## ABI

Rust には安定した ABI がない [Define a Rust ABI #600](https://github.com/rust-lang/rfcs/issues/600) そうです。

C 的人間がこのような関数を見たら、引数は順番にスタックに push されると考えがちですが、Rust ではそこに取り決めはないようです。最適化の中でフィールドの順番が入れ替わっているかもしれません。

```
fn hoge(a: u8, b: u32, c: u8) -> u32 {
    a + b + c
}
```

TODO バイナリを見る

なので `extern "C"` で C の ABI を拝借します。

```
extern "C" {
}
```

また構造体も同じように、上から順番にメモリに配置されるわけではなく、入れ替えられる可能性があります。
`repr(C)` で C と同様に上から順番に配置できます。

```
#[repr(C)]
struct Hoge{
    a: u8,
    b: u32,
    c: u8
}
```

## リンカ

リンカは GCC の ld を使用できるため、今まで通りのリンカスクリプトを使用できます。

```lds:
MEMORY
{
    RAM   (rw) : ORIGIN = 0x00000000, LENGTH = 0x00002000 /* 8 KiB */
    FLASH (rx) : ORIGIN = 0x00050000, LENGTH = 0x00100000 /* entire flash, 1 MiB */
}

SECTIONS {
    /* 略 */
    .bss :
    {
        . = ALIGN(4);
        _sbss = .;
        *(.bss .bss.* .sbss .sbss.*)
        *(COMMON)
        . = ALIGN(4);
        _ebss = .;
    } >RAM
    /* 略 */
}
```

リンカスクリプト中で定義したシンボルを Rust 中で使用するには `static` 変数として宣言します。

```rs:
extern "C" {
    static mut _sbss: u32;
    static mut _ebss: u32;
}
```

たとえば BSS 領域を 0 で初期化するには `ptr::write_bytes` (C の`memset`) を使用し以下のようにします。

```rs:
let count = &_ebss as *const u8 as usize - &_sbss as *const u8 as usize;
ptr::write_bytes(&mut _sbss as *mut u8, 0, count);
```

Attribute としてシンボル名とセッションを指定できます。

```rs:
#[export_name = "foo"]
```

## アセンブラ

### 外部ファイル

外部のアセンブラファイル `.s` を別途アセンブルし、rust とリンクします。
ここは通常の C と同じ方法でできます。

Rust は Makefile みたいなビルドスクリプトを Rust で記述できます。いいね。

TODO ビルドスクリプトを書く

### インラインアセンブラ

インラインアセンブラは以下のように書きます。

```rs:
asm!(
    "mov {tmp}, {x}",
    x = inout(reg) x,
    tmp = out(reg) _,
);
```

詳細は[Rust リファレンス](https://doc.rust-lang.org/reference/inline-assembly.html)を参照してください。

### 拡張命令

独自の拡張命令をラップしたアセンブラマクロ

```
#define my_opr(rs1,rs2,rd) .word(/* 略 */)
```

を使用するには `global_asm!` を使用します。

TODO 試す

## スタートアップルーチン

ベアメタルのプログラムのエントリポイントは、割り込みベクタの先頭にあるリセットベクタになります。ここから、環境を整えて `main` 関数へと引き渡すまでの部分を、スタートアップルーチンと言います。

上で説明した `extern "C"` と `#[no_mangle]` を使用しシンボル名を同じにすることで、 C で開発していたものと同じアセンブラを使用できます。

## 割り込みハンドラ

## ペリフェラル

ここ [The Embedded Rust Book | ペリフェラル](https://tomoyuki-nakabayashi.github.io/book/peripherals/index.html) にだいたいのことが書いてあります。

有名なハードウェアに対しては、それをラップするクレートを実装してくれています。
が、自作マイコンの場合、それらを自分で書く必要があります。

今回は CPU に PicoRV32 というそこそこ有名なものを使用しているので、CPU のクレートは見つかりました。

[picorv32-rt](https://github.com/ilya-epifanov/picorv32-rt)

CPU 以外のペリフェラルの部分は独自なので、自分で実装する必要があります。

まず、機能ごとにレジスタをまとめた構造体を定義します。

```
#[repr(C)]
struct GPIO {
    pub iosel: u32,
    pub in: u32,
    pub out: u32,
}
```

メモリのアドレスを指定して書き換えるには、

## L チカ

以上で自作マイコンのプログラミング言語を C++ から Rust に移行するための道具は揃ったと思うので、実際にやっていきます。

### コンパイルスクリプト

### シミュレータ

iverilog でマイコンを動かして main 関数に到達していることを確認します。

## アセンブリの比較

最後に、C++ と Rust の吐いたアセンブリを比べてみます。
以下のコマンドでアセンブリを出力できます。

```
$ rustc --emit asm main.rs
```
