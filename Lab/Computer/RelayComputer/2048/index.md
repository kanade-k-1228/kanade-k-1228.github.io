---
title: 2048 on リレーコンピュータ
---

<iframe src="./game.html" width="200px"height="250px"></iframe>

![](./img/algo.drawio.svg)

## 専用ハードウェア

![](./img/reduct.drawio.svg)

|    label    | Op    |             |               | Comment                         |
| :---------: | ----- | ----------- | ------------- | ------------------------------- |
|    INIT     | LOAD  | 0x0F        | RAND_RANGE    | 乱数器の範囲を 0~15 に設定      |
|             |       |             |               |                                 |
|     PUT     | MOV   | RAND        | POINTER       | ランダムなマスを選択する        |
|             | JMPIF | PUT         | [POINTER]!=0  | そのマスに空のマスに 2 を埋める |
|             |       |             |               |                                 |
|             |       |             |               |                                 |
| WAIT_BUTTON | JMPIF | UP          | BUTTON==UP    | ボタンを取得します              |
|             |       | DOWN        | BUTTON==DOWN  |                                 |
|             |       | LEFT        | BUTTON==LEFT  |                                 |
|             |       | RIGHT       | BUTTON==RIGHT |                                 |
|             |       |             |               |                                 |
|             | GOTO  | WAIT_BUTTON |               |                                 |
|     UP      |       |             |               |                                 |
|             | GOTO  | PUT         |               |                                 |
|    DOWN     |       |             |               |                                 |
|             | GOTO  | PUT         |               |                                 |
|    LEFT     |       |             |               |                                 |
|             | GOTO  | PUT         |               |                                 |
|    RIGHT    |       |             |               |                                 |
|             | GOTO  | PUT         |               |                                 |
