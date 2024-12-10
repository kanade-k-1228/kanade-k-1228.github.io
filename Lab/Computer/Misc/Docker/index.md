% Dockerはじめました
% 
% 2021-01-07

お仕事でちゃんとDockerを使わないといけなくなったので勉強し始めました．

## Dockerって？

とりあえず"docker しくみ"とかでgoogle先生に聞いて出てきたやつをざざっと読むと，

- 仮想化
  - バーチャルマシンは重い
  - コンテナはホストの機能を使いつつ仮想化するので軽い
  - namespace・cgroupeというLinuxの機能がベースにある
- イメージ
  - イメージというのがある
  - レイヤが積み重なった構造をしている
  - レイヤは利用時には一つに見える ←？？？
  - イメージをビルド？してコンテナを作る
  - レイヤのベースに配布されてるubuntuとかを使いがちらしい
- コンテナ
  - 隔離された名前空間
  - プロセスはこの中で動く
- Dockerfile
  - イメージを組み立てる設計図てきなもの
  - イメージのレイヤと対応している？
- docker-compose.yml
  - Dockerfileとの違いがよくわからん
  - docker-compose up すると動く

## 実験：node.js

[参考サイト](https://ishida-it.com/blog/post/2019-11-21-docker-nodejs/)

これを真似する

- docker-compose.ymlを書いて実行
  - npm がなんか言ってる
  - コンテナ内の./app以下にいろいろたりねぇぞ
  - いったんコンテナ内に入って，npmうんぬんかんぬんしてやる
  - ./src（コンテナ外）に追加された！
- これで実行すると……
  - localhost:3000になんか出た
  - コンテナ側のターミナルにnodeのログが出てる
- nodemonを追加してリアルタイムで反映されるようにする

## 実験：TypeScript

[参考サイト](https://qiita.com/reflet/items/538753d5dcf3560567a9:embed:cite)


- 例のごとくdocker-compose.ymlを書く

```yml
version: "3"
services:
  app:
    image: nginx:latest
    container_name: "app"
    ports:
      - "8080:80"
    volumes:
      - ./src/html:/app
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf

  node:
    image: node:10
    container_name: node
    tty: true
    working_dir: /usr/src/app
    volumes:
      - ./src:/usr/src/app
```

- volumes:のとこがあってればとりあえず動きそう

___

docker-compose.ymlを書くだけでとりあえず使えることがわかた

