
---
title: 第２回自作CPUを語る会やるよ！
date: 2023-12-01
author: Kanade
---

この記事は [自作CPU Advent Calendar 2023](https://adventar.org/calendars/8916) 1 日目の記事です。

こんにちは！Kanadeです。

計算機、作ってますか？作りましょう！

ということで、自作CPUを語る会の第２回を、12/3（日）にサイボウズ東京オフィス（日本橋）にて開催します！

参加登録はこちらから → [connpass](https://connpass.com/event/287012/)

計算機を作っている方、ぜひその計算機について存分に語ってください！これから計算機を作ってみたいと思ってる方、聞きに来てください！

## 第１回のふりかえり

第２回の前に、第１回のふりかえりをしていきましょう！
ハッシュタグ [#make_cpu](https://twitter.com/search?q=%23make_cpu&src=typed_query) への投稿、ありがとうございました！

### Kanadeの発表

最初は Kanade から、この会を開くに至った経緯をお話しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">CPUを作ったことがある人が挙手する異常な空間。作ったことが無い人も、ぜひ自作CPUの沼へ... <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; きー坊 💉💉💉💉 (@jnkykn) <a href="https://twitter.com/jnkykn/status/1667747695195484160?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="qht" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a> <a href="https://t.co/C8ek0DytdG">https://t.co/C8ek0DytdG</a></p>&mdash; 湯村 翼 Tsubasa YUMURA (@yumu19) <a href="https://twitter.com/yumu19/status/1667750446075879424?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">確かにMFTとかで展示されてて「わー、すごいですね」とか当たり障りない会話をしつつ「レジスタは何bitが何個ですか？命令セットは？クロックサイクルは？」とか聞きたくなったりしてたから聞けるの楽しい。<a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; TEFSOM (@Si_SJ_MOSFET) <a href="https://twitter.com/Si_SJ_MOSFET/status/1667751061363503105?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

というわけで、自分のCPUのアーキテクチャについて語らせてもらいました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ハードウェアの加算器の部分を減算器にしたり乗算器にすると、同じソフトで「一般化されたフィボナッチ数列」を計算できる。ハードとソフトの双対性。 <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; uchan (@uchan_nos) <a href="https://twitter.com/uchan_nos/status/1667751717474291712?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ハードウェアを変更して動作を変更するという考え方、リレーコンピュータらしくてめっちゃおもろいっすね... <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; /\/asTTYなすちゃん (@ethllc4) <a href="https://twitter.com/ethllc4/status/1667752205666099208?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### あおとさんの発表

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a><br>「自分もリレーでCPUを作って持ってきたんですけど…」<br><br>↑！？！？！？</p>&mdash; せながおぢさん【大阪カンファ共同代表】 (@Seyanaga) <a href="https://twitter.com/Seyanaga/status/1667754186380034048?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リレーで作ってる人多すぎて草 <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; ミタ式アンプ (@mtyk1t) <a href="https://twitter.com/mtyk1t/status/1667754596335521793?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リレーでAND、こうやって組むのか。勉強になるな。青兎さんの発表が最初の方が良かったのではないか？ｗ <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; uchan (@uchan_nos) <a href="https://twitter.com/uchan_nos/status/1667764247412240384?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">青兎さんハンドリーマで穴あけしてたのか（） <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; 電脳妖精☆ミント＠日曜東Ｕ02b (@MINT9821) <a href="https://twitter.com/MINT9821/status/1667766421462581249?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### ちぇりたくさんの発表

### うーちゃんさんの発表

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">FORTH言語みたいなISAじゃな<a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; みなぎ🌱 (@minagi_yu) <a href="https://twitter.com/minagi_yu/status/1667769804630147072?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

FORTH好き

### 交流会＆LT会

続いては後半戦、持ってきた自作CPUを囲んで交流会タイムです！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自作 CPU ブース，9 テーブル満員御礼なのやばいな <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; 旭川から小平市をはじめ各地に飛び立つ地方ITコミュニティ盛り上げ大臣とみお (@tomio2480) <a href="https://twitter.com/tomio2480/status/1667775413840650240?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自作 CPU ブース，9 テーブル満員御礼なのやばいな <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; 旭川から小平市をはじめ各地に飛び立つ地方ITコミュニティ盛り上げ大臣とみお (@tomio2480) <a href="https://twitter.com/tomio2480/status/1667775413840650240?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ボタニックさんのトランジスタ計算機

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">なんかLT会で突然ウェハー上のMOSFET自作の話が始まったんだが <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; uchan (@uchan_nos) <a href="https://twitter.com/uchan_nos/status/1667787754229608449?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この会では一番下のレイヤのお話です！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a> 自作CPUを語る会楽しかった！ <a href="https://t.co/yLy1gfaZui">pic.twitter.com/yLy1gfaZui</a></p>&mdash; RegYMM (@regymm0) <a href="https://twitter.com/regymm0/status/1667849396145524736?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 会を終えて

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">FPGAでCPU組んでるので低レイヤーだと思っていたら、他の発表者がリレーだったりNANDだったりで感覚麻痺してるの面白すぎる <a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; 甘なお (@amanao_) <a href="https://twitter.com/amanao_/status/1667767990748860417?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">おもろかったわ<br>第2回はもうちょっと高レイヤになることを期待()<a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; Y.M.D オフライン (@YMD_Glasses) <a href="https://twitter.com/YMD_Glasses/status/1667849437245505542?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

第１回は超低レイヤな会でしたが高レイヤ（FPGAなど）の発表も大歓迎です！というかなんでこんなハードウェア寄りなんですか！普通自作CPUってFPGAじゃないんですか！？

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a><br>さて……… <a href="https://t.co/5t3BwpxjNP">pic.twitter.com/5t3BwpxjNP</a></p>&mdash; せながおぢさん【大阪カンファ共同代表】 (@Seyanaga) <a href="https://twitter.com/Seyanaga/status/1667799531742990336?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a><br>なんかCPU作れる気がしてきた</p>&mdash; ポン酢@5V,8MHz (@ponzu840w) <a href="https://twitter.com/ponzu840w/status/1667818127177191425?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a> <br>一足早めに離脱して今帰宅しました。<br>とても面白い発表と展示があり、ただいま着手中のFPGAで実装するCPUのモチベを上げられました。<br>Verilogの勉強しないとなぁ。</p>&mdash; ABC10946 v2.0 (@abc10946) <a href="https://twitter.com/abc10946/status/1667819439885287424?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自作CPUを語る会。有益だった。現地行ってよかった。新作つくらねば。<a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; 電子ライダー (@denshirider) <a href="https://twitter.com/denshirider/status/1667825530157289472?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">次回！<br>「コンパレータとダイオードだけでCPUを作る」<br>乞うご期待！<a href="https://twitter.com/hashtag/make_cpu?src=hash&amp;ref_src=twsrc%5Etfw">#make_cpu</a></p>&mdash; PentliumEE (@7GHz) <a href="https://twitter.com/7GHz/status/1667868730871910400?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

皆様と計算機のお話ができるのを楽しみにしております！では会場で会いましょう！
