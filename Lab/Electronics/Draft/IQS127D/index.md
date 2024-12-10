% Azoteq IQS127D （静電容量タッチセンサIC）の使い方
% 
% 2021-01-13

[メーカーのページ](https://www.azoteq.com/product/iqs127d/)

[データシート](https://www.mouser.jp/datasheet/2/42/iqs127_datasheet-1602122.pdf)

[サンプルコード](https://www.azoteq.com/wp-content/uploads/2019/02/azd017_iqs127_1-wire_protocol_sample_code.pdf)

## 機能

- 電極とIC（とコンデンサと抵抗）だけでタッチスイッチを作れる
- Proximity output （近接状態を検出できる）
- ATI（自動調整機能）
- 1-Wire通信でセンサ値を取れる

## PIN

1. TOUT - スイッチの出力・シリアル通信にも使用
2. VSS - Ground
3. POUT - Proximity output
4. VREG - 内部レギュレータ用コンデンサに接続
5. VDDHI - 電源（2.95V～5.5V）
6. CX - 電極（抵抗を直列接続）

## 簡単な使い方

TOUTをトランジスタにつなぐだけで，スイッチとして使える

## 静電容量の値を取る

1-Wire っていうプロトコル((電源ラインと信号ラインを1本にまとめられるらしい（ここではそうなってはいないが）．簡易なセンサ用の通信によさそう．))で通信できて容量値を取れたり閾値を設定できたりするっぽい

___

タッチセンサ用のIC，アキバを回っても見つからなかったから秋月とかで売ってくれないかな
