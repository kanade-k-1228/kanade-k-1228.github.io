---
title: 自作 CPU と半導体の未来
---

これは [自作 CPU Advent Calendar 2023](https://adventar.org/calendars/8916) 25 日目の記事です。

こんにちは。[IPA 未踏](https://www.ipa.go.jp/jinzai/mitou/it/2023/gaiyou_tn-1.html)で「[NextMicon](https://github.com/NextMicon)」という FPGA 開発プラットフォームを作っている Kanade です。

アドベントカレンダー、楽しんでいただけましたか？

最終日の今日は少し毛色を変えて「自作 CPU と半導体の未来」という、たいそうな話をしてみようと思います。趣味としてハードウェアをやる人々がいることが、救いなのではないかという話です。

## 昔の半導体業界の話

MakerFaire とかで

かなりコアな人々です。

懐かしいと言われることがあります。

1960 ~ 1970 年代の半導体業界は

## 日本の半導体の凋落

その後、1980 年代に日本の半導体シェアは、その後徐々に衰退していきました。

![](https://www.soumu.go.jp/johotsusintokei/whitepaper/ja/r03/image/n0201030.png)

売上ベースで見ると、拡大する市場に追従できずに、横ばいになっています。

なぜこうなったのか。いろいろ言われていますが、一番言われている話は、産業構造の変化に追従できなかったということです。逆に言えば、産業構造を変えようとせずに、既存の仕事をし続けたとも言えます。

日本が得意と言われている製造業は、端的に言えば、機械と人と材料を工場に投入するとお金が出てくるシステムです。

一方で IT 産業は、ソフトウェアをコンピュータに投入するとお金が出てくるシステムです。すごいですね。システムの中核に人がいないので、たくさんのお金が出てきます。というわけで、みんなこぞって IT 産業を作ろうとするわけです。

日本の半導体は、この産業構造の変化に対応できなかったわけです。製造業向けの半導体ばかりを作っていて IT 産業向けの半導体を作れなかったというわけです。逆に、IT 産業向けの半導体、特に CPU を作ってたところはめちゃくちゃ儲かりました。

## 現状

では、今の半導体業界がどうなっているのか。趣味人ではなかなか知り得ないことも多いですが、実はお国の出してる資料から見える部分もあります。

霞ヶ関文庫！ `site:go.jp` から無料で読める！複雑怪奇な文学は ChatGPT に読んでもらおう！

- [経産省 半導体・デジタル産業戦略検討会議](https://www.meti.go.jp/policy/mono_info_service/joho/conference/semicon_digital.html)
- [内閣府 AI 戦略会議](https://www8.cao.go.jp/cstp/ai/ai_senryaku/ai_senryaku.html)
- [内閣官房 成長戦略会議](https://www.cas.go.jp/jp/seisaku/seicho/index.html)

政府の会議、いろいろな人が召喚されて、いろいろな話をしている。

とりあえず「[半導体・デジタル産業戦略](https://www.meti.go.jp/policy/mono_info_service/joho/conference/semiconductors_and_digital.pdf)」 をざっと見てください。凄いことがたくさん書かれてますね。

これらを実現するには、当然ですが、圧倒的に人が足りません。そのための人材育成については最後の方に書かれているのですが、圧倒的に間違っています。人間を講義のパイプラインに投入すると人材が出てくるという誤解をしている限り、またもや大金をかけて、真面目で堅苦しくただゆるやかな死を待つだけの JTC を作ることになってしまいます。そしてこの死に方に対するリアリティは、かなり高まっています。

## 授業をサボり外で遊ぼう

大学で工学部に入って感じたことは「直感に乏しい」という現実です。
「直感」とはなんでしょうか。経験から非明示的な推論です。
経験量が非常に重要です。

アフォーダンスに敏感

その一面が「脳内物理エンジンに乏しい」ということにも現れています。

初等教育からの問題でもあります。

大学で初めて工学に触れるという人も多いです。

文学部、理学部は、高校で授業がありますが、

古典的の教育環境は、技術者を育てるという観点からすると、直感・感性・思想を消去し空虚な人間を生産しています。
硬直死を助長しかねない。

本来優秀な技術者として物理世界の問題解決をする素質を持った人間を、単純な

物理・数学などとは違って、技術分野に関しては、偏差値と技術力の相関は弱いという感覚があり、

授業が不要だと言いたいわけではありません。
反復練習のような学習も無駄とはいいません。

## 自作のすすめ

放課後に塾に行くなど言語道断です。

方向とは

私が初等教育を受けたのは随分前になるので今では

システムに過度にフィッティングされてしまった

学校の授業より楽しくない？という

授業の形式でやるよりも、自分で好き勝手にやるのが一番楽しく、

お役人の文書だからそういうてきとーなことを書けないのか、

産業構造の変化に対応するためのエンジニアを育てる方針

残念ながら技術ばかりに関心があり、技術を伝えてことにあまり関心がないように思います。

人一人はたかが知れていていることを自覚して、他人に伝えて他人の人生の一部を借りてものをつくりましょう。

**本当に自由に使える装置** を増やす必要があります。

## 僕がやりたいこと

僕は半導体が好きです。特に、
データシートの
1970 年代に戻って

ですが、最近は似た状況にあると思っています。

AI は非常に不思議なものです。
CPU は中身を理解すれば理解できますが、AI は中身を理解しても理解できません。
データの複雑さ、つまり世界の複雑さを希釈せずに受け取り処理しているわけです。

残念ながら、近年ますます電子回路に触れる機会が減ってきています。

直感の中にハードウェアを

## AI の話

ところで、どうやら近い将来に、人が産業にいらなくなるようですね。

AI というものがあります。

そして、AI 産業向けの半導体を作ってるところはめちゃくちゃ儲かってますね。猫も杓子も「えぬべでぃあ」に群がって計算機を買いまくっています。

AI 産業と IT 産業を分けることに意味があるのかと聞かれると、

CPU を作ったことがある人ならわかると思うのですが、

CPU は決定的な処理を淡々とこなす機械です。

逆に AI は

この違いは、しくみ