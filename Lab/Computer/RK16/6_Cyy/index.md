---
title: 自作言語:C--
keyword: 自作言語, 自作コンパイラ,　自作CPU
---

自作マイコン用の自作言語、`C--` (Cょゎょゎ) です。拡張子は `.cyy`。

- 組み込みシステムを作るために実用上十分な機能を持つこと
- コンパイラの実装が簡単になること
- 文法がわかりやすいこと

を目標に設計しました。

## 型

|            | 記法                          |
| ---------- | ----------------------------- |
| 整数型     | `int`                         |
| ポインタ型 | `*int`                        |
| 配列型     | `[N]int`                      |
| 構造体型   | `{m0 : int, m1 : int}`        |
| 関数型     | `(a0 : int, a1 : int) => int` |

```
type =
 | type_prim   = ident | "(" type ")"
 | type_ptr    = "*" type
 | type_arr    = "[" expr "]" type
 | type_struct = "{" (ident ":" type) % "," "}"
 | type_func   = "(" (ident ":" type) % "," ")" "=>" type
```

ポインタ `*`、配列 `[]` をベース型の前に置きます。

### 型の書き方

`var hoge : int`

コロンの後に型を書きます。これによって複合型の型がわかりやすくなります。

### 参照演算子・アドレス演算子

`a*` で `a` をポインタとみなして、`a` の指す値を得ます。

`a : *int` → `a* : int`

`a@` で `a` のアドレスを得ます。

`a : int` → `a@ : *int`

### キャスト演算子

`a : T`

変数の後に型を書いて、キャストができます。

`sizeof(a) == sizeof(T)`

メモリ上でサイズが同じならキャストができます。

後置演算子 `$` で変数をブーリアン型にします。

`a : int = 0` → `a$ = false`

### 整数型

16bit 整数。
符号付きか無しかについては未定。
ハードウェアとかの都合で決める。

### ポインタ型

ポインタ型は 16bit のアドレスです。
これはアドレス空間が 16bit であることに由来します。

アクセス演算子を適用すると、ベース型になります。

`hoge : *int` → `hoge* : int`

アドレス演算子を適用すると、ポインタ型になります。

`hoge : int` → `hoge@ : *int`

### 配列型

配列はコンパイル時にベース型の N 個分のメモリを確保します。

添字演算子を適用すると、ベースの型になります。

`hoge : [N]int` → `hoge[0] : int`

多次元配列は、このように表されます。

`hoge : [N][M]int`

C言語と異なり、配列とポインタの暗黙のキャストは行いません。

配列のアドレスが欲しい場合は、アドレス演算子を使います。

`hoge : [N]int` → `hoge@ : *[N]int`

配列の先頭の要素のアドレスは、このように取得します。

`hoge : [N]int` → `hoge[0]@ : *int`

これらのポインタの値は一致しますが、型は異なります。

### 構造体型

構造体のサイズはメンバの合計です。

メンバ演算子を適用すると、メンバの型になります。

`hoge : {a : int}` → `hoge.a : int`

### 関数型

関数型は関数の持つ型です。

関数呼び出し演算子を適用すると、返り値の型になります。

`hoge : (arg : Arg) => Ret` → `hoge(arg) : Ret`

関数型の変数は定義できません。かわりに関数ポインタ型を使います。

`var hoge_p : *(arg : Arg) => Ret = hoge@;` → `hoge_p*(arg) : Ret`

関数ポインタには関数のアドレスが入ってます。

## プログラム

|          | 記法                                                    |
| -------- | ------------------------------------------------------- |
| 変数定義 | `var  hoge : int;`                                      |
| 関数定義 | `func hoge : (a : int, b : int) => int { return a+b; }` |
| 型定義   | `type hoge : {x : int, y : int};`                       |

プログラムのトップレベルには、グローバル変数定義、関数定義、型定義が並びます。

```
program  =
 | gvar_def = "var"  ident ":" type ";"
 | func_def = "func" ident ":" type compound
 | type_def = "type" ident ":" type ";"
```

### 文

関数定義には複文 (compound satements) が続き、
その中には文 (statement) が並びます。

```
compound = "{" stmt* "}"

stmt =
空文
 | void_stmt = ";"
複文
 | compound  = "{" stmt* "}"
式文
 | expr_stmt = expr ";"
ローカル変数定義
 | lvar_def  = "var" ident ":" type ";"
代入文
 | assign    = expr "=" expr ";"
制御文
 | if        = "if" "(" expr ")" stmt
 | if_else   = "if" "(" expr ")" stmt "else" stmt
 | goto      = "goto" ident ";"
 | label     = ident ":"
 | return    = "return" expr ";"
繰り返し文
 | while     = "while" "(" expr ")" stmt
 | continue  = "continue" ";"
 | break     = "break" ";"
```

#### 式文

式を評価します。評価値は破棄されるため、実用上は副作用を実行するための文です。

#### 代入文

代入文が変数の値を書き換える唯一の方法です。

左辺はアドレス、右辺は値として評価できる必要があります。

`a : int = b : int`

という代入文は、実際には、

`a@ : *int <= b : int`

このような動作をしています。

#### goto label

関数呼び出しのABIを守るため、gotoは同一の関数内である必要がある。

ラベルの前に関数名を付記することで `<func-name>_<label-name>` 、
関数外へのgotoはアセンブラがエラーを出す。

アドホックですが、gotoはそんなに使わないのでこの程度のエラー処理でいいでしょう。

```
func main : ()=>int {
  goto hoge; //     jump zero zero main_hoge
hoge:      // main_hoge:
}
```

### 式

#### 演算

```
expr = cond = or ("?" expr ":" cond)?
or  = xor ("|" xor)*
xor = and ("^" and)*
and = equal ("&" equal)*
equal = relat ("==" relat | "!=" relat)*
relat = shift ("<" shift | "<=" shift | ">" shift | ">=" shift)*
shift = (shift "<<" | shift ">>")? add
add   = mul ("+" mul | "-" mul)*
mul   = prim ("**" prim | "//" prim | "%%" prim)*
```

#### 後置演算子

```
post =
 | prim
 | cast      = post ":" type
 | ref       = post "*"
 | addr      = post "@"
 | array     = post "[" expr "]" 
 | member    = post "." ident
 | func_call = post "(" expr % "," )"
```

###  値

```
prim =
 | num
 | ident
 | "(" expr ")"
 | "<" type ">" // sizeof
```
