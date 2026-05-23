---
title: "自作言語:tasm"
words:
  - 自作言語
  - 自作コンパイラ
  - 自作CPU
---

自作マイコン用の自作言語、`tasm` (typed assembly) です

- 組み込みシステムを作るために実用上十分な機能を持つこと
- コンパイラの実装が簡単になること
- 文法がわかりやすいこと

を目標に設計しました。

## サンプルコード

```tasm
type Vec2 = {x: int, y: int};

var origin: Vec2 = {x: 0, y: 0};

func add: (a: Vec2, b: Vec2) -> Vec2 {
  var result: Vec2 = {x: a.x + b.x, y: a.y + b.y};
  return result;
}

func main: () -> int {
  var points: [2]Vec2 = [{x: 1, y: 2}, {x: 3, y: 4}];
  var offset: Vec2 = {x: 10, y: 20};
  var sum: Vec2 = add(points[0], offset);
  return sum.x + sum.y;
}
```

## 型

|            | 記法                   |
| ---------- | ---------------------- |
| データ型   | `int`                  |
| アドレス型 | `*int`                 |
| 配列型     | `[N]int`               |
| 構造体型   | `{m0 : int, m1 : int}` |
| 関数型     | `(arg : int) => int`   |

```
type =
 | data   = "int"
 | addr   = "*" type
 | prim   = ident | "(" type ")"
 | arr    = "[" expr "]" type
 | struct = "{" (ident ":" type) % "," "}"
 | func   = "(" (ident ":" type) % "," ")" "=>" type
```

ポインタ型 `*` 配列型 `[]` を作るには、ベース型に前置します。英語の語順と同じです。たとえば `*[2]int` は "pointer to array of int" です。

独自の型は次のようにコロンで定義します。

`type hoge : {x : int, y : int};`

変数の型は次のようにコロンの後に書きます。

`var hoge : int;`

## 型のサイズ

tasm は、16 ビットのアドレス幅および 16 ビットのデータ幅を持つシステム向けに設計されています。すべてのデータ型およびメモリアクセスはこの固定幅アーキテクチャに従います。

型のサイズは固定です。次の計算規則に従い、コンパイル時に計算されます。

```
sizeof(int) = 1
sizeof(*T) = 1
sizeof([N]T) = N × sizeof(T)
sizeof({f₁: T₁, f₂: T₂, ...}) = sizeof(T₁) + sizeof(T₂) + ...
sizeof((args) => Ret) = 0
```

これらの規則により、型のサイズは常にコンパイル時に計算可能です。sizeof 演算子は型が使用するメモリを 16bit 単位で返します。

#### 基本型

`int` - 16 ビット整数を表します。符号付きか符号無しかの解釈は、ターゲットアーキテクチャの実装に委ねられており、ハードウェア固有の最適化に柔軟性を持たせます。

#### ポインタ型

`\*T` - 型 T の値へのポインタを表します。これは、16 ビットのメモリアドレスであり、T 型のデータが格納された別のメモリ領域を参照します。

#### 配列型

`[N]T` - 型 T の要素が N 個連続して割り当てられた静的配列です。配列のサイズはコンパイル時に既知でなければならず、動的なサイズ変更はサポートされません。

#### 構造体型

`{field1: T1, field2: T2}` - 複数の名前付きフィールドをまとめた合成データ型です。構造体は宣言された順に各メンバが連結された形でメモリ上に配置されます。

#### 関数型

`(arg1: T1, arg2: T2) => Ret` - 明示的な型を持つ固定数の引数を受け取り、Ret 型の値を返す関数を表します。関数は第一級オブジェクトではありませんが、ポインタを介して参照することが可能です。

### 参照演算子・アドレス演算子

`a*` で `a` をポインタとみなして、`a` の指す値を得ます。

`a : *int` → `a* : int`

`a@` で `a` のアドレスを得ます。

`a : int` → `a@ : *int`

### キャスト演算子

変数の後にコロンと型を書いてキャストをします。

`var a:TA;`
`var b:TB = a:TB;`

メモリ上でサイズが同じ型どうしでキャストができます。

`sizeof(a) == sizeof(TB)`

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

C 言語と異なり、配列とポインタの暗黙のキャストは行いません。

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

|          | 記法                                                  |
| -------- | ----------------------------------------------------- |
| 変数定義 | `var hoge : int;`                                     |
| 関数定義 | `fn hoge : (a : int, b : int) -> int { return a+b; }` |
| 型定義   | `type hoge : {x : int, y : int};`                     |

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

関数呼び出しの ABI を守るため、goto は同一の関数内である必要がある。

ラベルの前に関数名を付記することで `<func-name>_<label-name>` 、
関数外への goto はアセンブラがエラーを出す。

アドホックですが、goto はそんなに使わないのでこの程度のエラー処理でいいでしょう。

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

### 値

```
prim =
 | num
 | ident
 | "(" expr ")"
 | "<" type ">" // sizeof
```
