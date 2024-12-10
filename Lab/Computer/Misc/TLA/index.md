---
title: TLA+ 入門
keywords: TLA+, TLA, 検証言語, オートマトン
---

[本家のウェブサイト](http://lamport.azurewebsites.net/tla/tla.html)

## TLA とは

### TLA+ の思想

> A language for high-level modeling of digital systems

デジタルシステム（アルゴリズム・プログラム・コンピュータマシンからなるシステム）の高レイヤの（コードを書く前の設計段階における）モデル記述言語

> For concurrent and distributed systems

並列・分散システムのための

> Abstraction is the most important part of engineering.
> It lets us understand complex systems.

複雑なシステムは抽象化するとわかりやすくなる

### TLA+ のメリット

- 複雑なシステムを厳密に・統一的に記述できる
  - システムの実装によらない
- モデルの検証のためのツールがある
  - TLA Model Checker
  - TLAPS
  - TLA Toolbox (IDE)
- 設計への出戻りリスクを減らせる

> TLA+を学ぶと、複雑なシステムを明快に扱えるようになる

### 実績

- AWS とか複雑なシステムに使われてるよ
- 詳細はドキュメント
- RTOS にも

### デジタルシステムの抽象化

- 離散的なイベントの連続

## 簡単な例

整数をランダムに取得してインクリメントする処理を考えます。

```typescript
{
  let i: number = 0; // "start"
  i = SomeInt(); // "middle"
  i = i + 1; // "end"
}
```

※ `SomeInt()` は 0~255 を返すとします

この処理を以下のように書き換えます。

```typescript
type State = number;
type ProgramCounter = "start" | "middle" | "end";

function transition([pc: ProgramCounter, i: State]){
    if     (pc==="start")  return ["middle", SomeInt()];
    else if(pc==="middle") return ["end"   , i + 1    ];
}

{
    let pc: ProgramCounter = "start";
    let i: State = 0;
    [pc,i] = transition([pc,i]); // pc = "middle" , i = a
    [pc,i] = transition([pc,i]); // pc = "end"    , i = a + 1
}
```

非常にまどろっこしい書き方ですが、i に関して上のコードと同じ処理をしていることを確認してください。

この書き換えをすることで、処理が同じ形 `[pc,i] = transition([pc,i]);` の繰り返しになっていることが重要です。

### プログラムの検証

この簡単なプログラムの検証をしてみましょう。検証とは、プログラムがある性質を満たすことを確認することです。（例えば、変数がオーバーフローしない、無限ループに入らない、デッドロックしない、、、など）

例えばここでは、i の範囲を調べてみましょう。

（ここかく）

※　プログラムが単純なので少々強引になってしまいましたが………

実際の巨大なプログラムではこの検証が非常に大変になります。TLA を使うとこの検証がやりやすくなります。

### TLA+ の記法

TLA+ でインクリメントプログラムを書いてみましょう。とりあえず完成品をみてください

$$
\mathrm{VARIABLES} : i, \mathrm{pc}
$$

$$
\begin{alignedat}{5}
\rm Init \triangleq
&     &\land& \rm pc = start \\
&     &\land& i = 0 \\
\\
\rm Next \triangleq
&\lor &\land& \rm pc = start   \\
&     &\land& \rm pc' = middle \\
&     &\land& i' \in 0 \cdots 255 \\
&\lor &\land& \rm pc = middle \\
&     &\land& \rm pc' = end   \\
&     &\land& i' = i + 1      \\
\end{alignedat}
$$

数学の命題の形で記述されています。

この命題を真とする状態 $i,\mathrm{pc}, i', \mathrm{pc}'$ が、実行中に現れる状態になります。

つまり、プログラムがある状態に到達するかどうかを調べたければ、その状態を VARIABLES に代入して、命題の真偽を確かめればいいわけです。
