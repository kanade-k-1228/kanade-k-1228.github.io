% Linux デバイスドライバ
%
%

[参考](https://qiita.com/iwatake2222/items/1fdd2e0faaaa868a2db2)

[本]

## 関数

- `static int init(void)`
  - `register_chrdev(DRIVER_MAJOR, DRIVER_NAME, file_operations)`
    - カーネルに登録
    - Major 番号を決め打ちしていて古い方法
  - `alloc_chrev_region()`
    - 空いてる番号を取得
  - `cdev_init()`
    - cdev を初期化する
- `static void exit(void)`
  - `unregister_chrdev(DRIVER)MAJOR, DRIVER_NAME)`
  - カーネルから削除
- `static int open(struct inode *inode, struct file *file)`
- `static int close(struct inode*inode, struct file *file)`
- `static ssize_t read(struct file *filp, char __user *buf, size_t count, loff_t *f_pos)`
- `static ssize_t write(struct file *filp, const char __user *buf, size_t count, loff_t *f_pos)`

## 構造体

- `file_operations`
  - ハンドラテーブル
- `inode`
- `file`

## 実行

```
make
sudo insmod [module].ko
sudo rmmod [module].ko
dmesg
```
