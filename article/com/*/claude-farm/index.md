---
title: Claude 牧場の作り方
date: 2026-05-22
words: [tmux, git, worktree, vibe coding, Claude Code]
---

## claude

1. プロジェクトルートで `claude` を起動
2. やってほしいことを自然言語で投げる
3. キリのいいところで `/clear` して次のタスクへ
4. 続きをやりたいときは `claude --resume`

| cmd                 |                                  |
| ------------------- | -------------------------------- |
| `claude`            | 対話モード起動                   |
| `claude -p "..."`   | プロンプトを渡してワンショット   |
| `claude --resume`   | 過去のセッションから選んで再開   |
| `claude --continue` | 直近のセッションを最後から続ける |
| `/clear`            | 会話履歴をリセット               |
| `/compact`          | 履歴を要約して圧縮               |
| `/agents`           | サブエージェント設定             |
| `/permissions`      | ツール許可設定                   |
| `Esc` 2 回          | 直前のメッセージを巻き戻し       |

- **コンテキストが膨らんだら `/compact`**: 自動圧縮を待つより、区切りで明示的に圧縮した方が結果が安定します。
- **`CLAUDE.md` に方針を書く**: 毎回同じ指示を投げるくらいなら `CLAUDE.md` に書いておけば、全セッションで自動的に読まれます。
- **`--dangerously-skip-permissions` は worktree 内でだけ**: 本番リポジトリで使うと事故ります。エージェントを暴れさせる時は隔離された worktree で。

## tmux

1. `tmux new -s claude-foo` でセッションを作り
2. その中で `claude` などを起動してタスクを投げ
3. `Ctrl-b d` で離れて、別の作業に戻る
4. たまに `tmux a -t claude-foo` で覗きに行く

| cmd                  |                                  |
| -------------------- | -------------------------------- |
| `tmux new -s claude` | 新しいセッションを名前付きで作る |
| `Ctrl-b d`           | セッションから離れる             |
| `tmux ls`            | セッション一覧                   |
| `tmux a -t claude`   | セッションに戻る                 |
| `tmux a`             | 直近のセッションに戻る           |

| CMD                     | 操作                           |
| ------------------------ | ------------------------------ |
| ウィンドウを新しく作る   | `C-b c`                        |
| ウィンドウを切り替える   | `C-b n` / `C-b p` / `C-b 0..9` |
| ウィンドウに名前を付ける | `C-b ,`                        |
| ペインを左右に割る       | `C-b %`                        |
| ペインを上下に割る       | `C-b "`                        |
| ペイン間を移動           | `C-b ←↑↓→`                     |
| ペインを閉じる           | `C-b x` (確認あり)             |
| ペインを最大化 / 戻す    | `C-b z`                        |
| コピーモードに入る       | `C-b [`                        |
| ペースト                 | `C-b ]`                        |
| セッションから離れる     | `C-b d`                        |

- **コピーモードでマウス選択するとペーストバッファに入らない**: コピーモードに入ってから (`C-b [`)、`space` で選択開始、`enter` で確定、で tmux 側のバッファに入ります。OS のクリップボードに入れたければ `xclip` や `pbcopy` を噛ませる設定が必要です。
- **ネストして使うと混乱する**: SSH 先でも tmux を使っていると、プレフィックスがどちらに飛ぶか分からなくなります。SSH 先の tmux にはプレフィックスを 2 回押すか、ネストしないように `screen` を使い分けるかの 2 択です。
- **`tmux kill-server` は最終兵器**: セッションが壊れたとき用。中で走っているプロセスも全部死ぬので、エージェントを放牧している最中には打たないようにしましょう。

## screen

tmux が入っていないサーバ用の保険。基本は tmux でいいです。

1. `screen -S claude-foo` でセッションを作り
2. その中でタスクを起動
3. `Ctrl-a d` で離脱
4. `screen -r claude-foo` で戻る

| cmd                 |                              |
| ------------------- | ---------------------------- |
| `screen -S claude`  | 名前付きでセッション作成     |
| `Ctrl-a d`          | デタッチ                     |
| `screen -ls`        | セッション一覧               |
| `screen -r claude`  | 再アタッチ                   |
| `screen -dr claude` | 他のクライアントから奪い取る |
| `Ctrl-a c`          | 新しいウィンドウ             |
| `Ctrl-a n` / `p`    | ウィンドウ切り替え           |
| `Ctrl-a "`          | ウィンドウ一覧から選ぶ       |
| `Ctrl-a k`          | ウィンドウを kill            |

- **プレフィックスが `Ctrl-a`**: bash の行頭移動と被るので、`.screenrc` で `escape ^Tt` にして `Ctrl-t` に逃がすと楽です。
- **コピーモードが貧弱**: スクロールバックは `Ctrl-a [`、独自操作。慣れていなければ素直に tmux を入れる方が早い。
- **screen を選ぶ理由は「最初から入ってるから」だけ**: 自分で入れられる環境なら tmux で。

## git worktree

1. `git worktree add ../foo feat/foo` で別ディレクトリにブランチを展開し
2. その中でエージェントにタスクを投げ
3. 自分は元のツリーで別作業を続ける
4. 終わったら `git worktree remove ../foo` で畳む

| cmd                                   |                                   |
| ------------------------------------- | --------------------------------- |
| `git worktree add ../foo feat/foo`    | 既存ブランチを別ディレクトリに    |
| `git worktree add -b feat/foo ../foo` | ブランチも同時に作って追加        |
| `git worktree list`                   | 一覧                              |
| `git worktree remove ../foo`          | 削除 (未コミットあれば `--force`) |
| `git worktree prune`                  | 手で消した worktree のメタを掃除  |

おすすめ配置:

```
~/code/myproj/         (main、自分の作業ツリー)
~/code/myproj-agent-1/ (エージェント A 用)
~/code/myproj-agent-2/ (エージェント B 用)
```

worktree 1 つ = tmux セッション 1 つ、で運用すると気持ちよく回ります。

- **`node_modules` や `.env` は付いてこない**: 追跡対象ファイルだけが展開されます。新しい worktree では `pnpm i` や `.env` のコピーを自分でやる必要あり。シンボリックリンク共有はネイティブビルドで爆発するので非推奨です。
- **同じブランチは 2 つの worktree で開けない**: 仕様。1 worktree = 1 ブランチで運用するのが安全。
- **エージェントは worktree のルートで起動**: `cd ../foo && claude` のように入ってから起動すれば、`git status` も `find .` もそのブランチ視点になります。

## gh

GitHub の操作を git と同じ感覚で。エージェントに PR まで任せたい時の必需品。

1. `gh auth login` で認証
2. ブランチを push したら `gh pr create` で PR
3. `gh pr view --web` でブラウザ確認
4. レビュー後 `gh pr merge --squash` で取り込む

| cmd                            |                                |
| ------------------------------ | ------------------------------ |
| `gh auth login`                | 認証                           |
| `gh repo clone owner/repo`     | クローン                       |
| `gh pr create`                 | 現在ブランチから PR 作成       |
| `gh pr create --fill`          | コミットから本文を自動入力     |
| `gh pr list`                   | PR 一覧                        |
| `gh pr view 123` / `--web`     | PR 詳細 / ブラウザで開く       |
| `gh pr checkout 123`           | PR のブランチを引っ張る        |
| `gh pr merge 123 --squash`     | squash マージ                  |
| `gh issue list` / `view`       | issue 一覧 / 詳細              |
| `gh run list` / `gh run watch` | Actions の状態確認             |
| `gh release create v1.0.0`     | リリース作成                   |

- **`gh pr create --fill` がエージェントと相性◎**: コミットメッセージを丁寧に書かせておけば、PR 本文を考えさせる手間が省けます。
- **エージェントに `gh` を渡すと PR まで完結**: `git push` → `gh pr create` までやらせて、自分はレビューだけ。
- **CI やコンテナでは `GH_TOKEN`**: 対話ログイン (`gh auth login`) より環境変数で渡す方が楽。

## systemd

エージェントが叩く MCP サーバや、ローカルで常駐させたいツールをサービス化。
`--user` 単位なら root 権限なしで完結します。

1. `~/.config/systemd/user/foo.service` にユニット定義を書く
2. `systemctl --user daemon-reload` で読み込み
3. `systemctl --user enable --now foo` で起動 + 自動起動登録
4. `journalctl --user -u foo -f` でログを追う

最小ユニット例 (`~/.config/systemd/user/mcp-foo.service`):

```ini
[Unit]
Description=MCP foo server

[Service]
ExecStart=/home/me/bin/mcp-foo
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=default.target
```

| cmd                                            |                            |
| ---------------------------------------------- | -------------------------- |
| `systemctl --user daemon-reload`               | ユニットを再読み込み       |
| `systemctl --user enable --now foo`            | 自動起動を有効化して起動   |
| `systemctl --user start` / `stop` / `restart`  | 起動 / 停止 / 再起動       |
| `systemctl --user status foo`                  | 状態確認                   |
| `systemctl --user list-units --type=service`   | 動いているサービス一覧     |
| `journalctl --user -u foo -f`                  | ログを追う                 |
| `journalctl --user -u foo --since '10min ago'` | 直近のログ                 |
| `loginctl enable-linger $USER`                 | ログアウト後も `--user` 維持 |

- **開発機での常駐は `--user` 一択**: システム全体に影響しないし、ユニットも `~/.config/systemd/user/` に置けば自己完結。dotfiles で持ち運べます。
- **ログアウトすると死ぬ**: デフォルトでは `--user` セッションはログアウトで終了。SSH 越しに常駐させたいなら `loginctl enable-linger` を忘れずに。
- **`Restart=on-failure` を入れておく**: 雑に書いたサーバが落ちても勝手に復活。`RestartSec` で間隔を空けないと暴走ループになります。

## github actions
