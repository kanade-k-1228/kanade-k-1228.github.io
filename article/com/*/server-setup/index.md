---
title: サーバーセットアップメモ
---

- ターミナルの文字がおかしい
  - `export TERM=vt100`

## セキュリティ

セキュリティに関するログは `/var/log/secure` にあって、`grep -m 10 invalid /var/log/secure` とでもしてみると、不正アクセスしようとしてる様子が見れるよ。ユーサ名 admin とかで攻撃してきてる。ちゃんと対策しようね。

### ユーザの追加

- ユーザの追加
  - `useradd -G wheel [user]`
  - `wheel` グループのユーザは sudo できる
- パスワードを設定
  - `passwd [user]`
- ユーザ移動
  - `su [user]`

### SSH を公開鍵認証にする

- 鍵生成
  - TeraTerm の設定 → SSH 鍵生成
- 公開鍵を置く
  - `mkdir /home/[user]/.ssh`
  - 公開鍵を `/home/[user]/.ssh/authorized_keys`に置く
  - `chmod 600 /home/[user]/.ssh/authorized_keys`
- SSH 再起動
  - `service sshd restart`
- 接続を確認

### SSH の設定

- `/etc/ssh/sshd_config`を編集
  - root ログイン禁止
    - `PermitRootLogin no`
  - パスワードログイン禁止
    - `PasswordAuthentication no`
  - IP アドレス制限
    - `AllowUsers *@[yourIp]`

### ポート番号変更

- `/etc/ssh/sshd_config`
  - `Port [port]`
- SELinux
  - `getenforce` で動いてるか確認
- firewalld
  - `firewall-cmd --list-services`
  - `cp /usr/lib/firewalld/services/ssh.xml /etc/firewalld/services/ssh.xml`
  - `/etc/firewalld/services/ssh.xml` のポート番号を変更
  - `firewall-cmd --reload`

### 接続ショートカットを作成

- TeraTerm
  - `"C:\Program Files (x86)\teraterm\ttermpro.exe" [ip]:[port] /auth=publickey /user=[user] /keyfile="C:\Users\[user]\.ssh\[key]"`
- WinSCP

### Firewall の設定
