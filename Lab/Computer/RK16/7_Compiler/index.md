---
title: 自作コンパイラ
---

##  トークン化

文字列をトークン列に変換します。

- コメントの除去
- 文字列リテラル

##  抽象構文木の構築

抽象構文木 (Abstract Syntax Tree : AST) 

| Func       | `Node::Type` | `childs`  |           |            |         |
| ---------- | ------------ | --------- | --------- | ---------- | ------- |
| type       | TypeFunc     | arg[]     | ret       |            |         |
|            | TypeStruct   | member[]  |           |            |         |
|            | TypeArray    | base      | size      |            |         |
|            | TypePointer  | base      |           |            |         |
|            | TypePrim     | ident     |           |            |         |
| program    | Program      | defs      |           |            |         |
|            | FuncDef      | name      | type      | compound   |         |
|            | GVarDef      | name      | type      |            |         |
|            | TypeDef      | name      | type      |            |         |
| compound   | Compound     | stmt[]    |           |            |         |
| stmt       | VoidStmt     |           |           |            |         |
|            | ExprStmt     | expr      |           |            |         |
|            | LVarDef      | name      | type      |            |         |
|            | Assign       | expr      | expr      |            |         |
|            | UAssign      | expr      |           |            |         |
|            | If           | cond      | true_node |            |         |
|            | IfElse       | cond      | true_node | false_node |         |
|            | Goto         | name      |           |            |         |
|            | Label        | name      |           |            |         |
|            | Return       | expr      |           |            |         |
|            | While        | cond      | body      |            |         |
|            | DoWhile      | cond      | body      |            |         |
|            | For          | cond      | body      | init       | iterate |
|            | Continue     |           |           |            |         |
|            | Break        |           |           |            |         |
| **expr**   |              |           |           |            |         |
| cond       | Cond         | cond      | true_node | false_node |         |
| or         | Or           | :         | :         |            |         |
| xor        | Xor          | :         | :         |            |         |
| and        | And          | :         | :         |            |         |
| equality   | EQ           | :         | :         |            |         |
|            | NEQ          | :         | :         |            |         |
| relational | LT           | :         | :         |            |         |
|            | LEQ          | :         | :         |            |         |
|            | GT           | :         | :         |            |         |
|            | GEQ          | :         | :         |            |         |
| shift      | RShift       | :         | :         |            |         |
|            | LShift       | :         | :         |            |         |
| add        | Add          | :         | :         |            |         |
|            | Sub          | :         | :         |            |         |
| mul        | Mul          | :         | :         |            |         |
|            | Div          | :         | :         |            |         |
|            | Mod          | :         | :         |            |         |
| post       | Cast         | ident     | type      |            |         |
|            | Ref          | ident     |           |            |         |
|            | Addr         | ident     |           |            |         |
|            | Array        | ident     | expr      |            |         |
|            | Member       | ident     | ident     |            |         |
|            | FuncCall     | ident     |           |            |         |
| prim       | Num          | ***int*** |           |            |         |
|            | Ident        | ***str*** |           |            |         |
|            | SizeOf       | type      |           |            |         |

##  シンボルテーブル生成

| 種類 | 名前 | 型   | アドレス            | 関数本体 | ローカル |
| ---- | ---- | ---- | ------------------- | -------- | -------- |
| Func | name | type | addr (テキスト領域) | body     | lsymbol  |
| GVar | name | type | addr (静的領域)     |          |          |
| LVar | name | type | addr (スタック相対) |          |          |
| Type | name | type |                     |          |          |

##  ASTの再帰的評価

ASTを再帰的に評価することで、コード生成に必要なさまざまな情報を得ることができます。

###  型のサイズ

変数に必要なメモリを知るために型のサイズを計算します。

- 整数型 : 1 (16bit)
- ポインタ型 : 1 (16bit)
- 配列型 : ベース型の N 倍
- 構造体型 : メンバのサイズの合計
- 関数型 : 直接評価不可

### 変数

### アドレス

代入文の左辺を評価します。

### 定数値

コンパイル時に値が決まっているべき部分を評価します。

## アセンブラコードの生成

### グローバル変数の配置

グローバル変数はデータ領域に配置されます。

### 関数のコード生成

### 実行環境メモ

現在の位置を保持しながらコード生成をする。

| 関数 | ループ               |
| ---- | -------------------- |
| main | null / for_1 / for_1 |

return, break, continue に必要な情報。

関数のバイナリはテキスト領域に配置されます。

低レイヤの世界では「テキスト」は実行可能なバイナリのことを指します。

### ローカル変数の配置

スタックのアドレスはフレームポインタからの相対アドレスです。

## 作業日誌

- 11/10
  - 四則演算の実装
    - 構文木構築
    - 再帰的評価

```
expr =  mul ("+" mul | "-" mul)*
mul = primary ("*" primary | "/" primary | "%" primary)*
primary = num | "(" expr ")"
```

- 11/13
  - 演算子の拡張
    - ? :, ||, &&, |, ^, &, ==, !=, <, <=, >, >=, <<, >>, \*, /, %, ++, --

- 11/15
  - 変数の実装

```
prim = num | ident | "(" expr ")"
```

- 11/16
  - 文の実装
  - 代入の実装

```
program = stmt*
stmt = ";"
     | "{" stmt* "}"
     | "if" "(" expr ")" stmt ("else" stmt)?
     | "while" "(" expr ")" stmt
     | "do" stmt "while" ( expr ) ";"
     | "for" "(" expr? ";" expr? ";" expr? ")" stmt
     | expr ";"
```

- 2/8
  - 関数定義

```
program = func*
func = ident "(" ident % "," ")" compound
compound = "{" stmt* "}"
```

- 2/9
  - 型
- 2/10
  - AST ノードの改良
    - child を vector にまとめメソッドでアクセスするようにした
- 2/12
  - 変数定義
- 2/14
  - 細かい文法を決めた
  - ドキュメントの整備
- 2/15
  - AST完成？
  - ポインタの\*と乗算の\*、アドレスの&と論理積の&の区別がつかない
    - 残された記号は @ と $
    - 論理演算とビット演算は同じにできるか？
    - アドレス演算子は@でいいかも。アドレスっぽいし
    - 乗除算は\*\*と//にする
      - 乗除算器を持たないので重いよという意味で
  - 文法を↑で変える。暫定的
- 2/16
  - ↑アホか？ポインタのポインタと競合するやんけ。
- 2/17
  - DFS、シンボルテーブルができた
  - シンボル、ローカルとグローバルを統一したいわね
  - Static変数も作りたい
- 2/20

## 参考

https://github.com/DoctorWkt/acwj

https://github.com/rui314/chibicc

https://www.sigbus.info/compilerbook

https://github.com/season1618/books/blob/main/c-compiler/index.md

