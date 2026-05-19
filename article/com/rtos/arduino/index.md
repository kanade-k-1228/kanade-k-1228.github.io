---
title: Arduinoの内側を見る
---

## main 関数はどこ？

私の環境では、

C:\Users\Kanade\AppData\Local\Arduino15\packages\arduino\hardware\avr\1.8.6\cores\arduino\main.cpp

にありました。（Arduino IDE 2.0）

```C:
// main.cpp

#include <Arduino.h>

// Declared weak in Arduino.h to allow user redefinitions.
int atexit(void (* /*func*/ )()) { return 0; }

// Weak empty variant initialization function.
// May be redefined by variant files.
void initVariant() __attribute__((weak));
void initVariant() { }

void setupUSB() __attribute__((weak));
void setupUSB() { }

int main(void)
{
	init();

	initVariant();

#if defined(USBCON)
	USBDevice.attach();
#endif

	setup();

	for (;;) {
		loop();
		if (serialEventRun) serialEventRun();
	}

	return 0;
}
```

### setup と loop

```C:
main(){
    setup();
    for(;;){
        loop();
    }
}
```

Arduino のスケッチで定義した、 `setup()` と `loop()` が `main()` で呼び出されてるわけです。

### initVariant

`__attribute__((weak))` がついてます。

これは、Arduino で使用している GCC（GNU C コンパイラ）の拡張機能です。

[GCC Attributes](https://gcc.gnu.org/onlinedocs/gcc-4.7.2/gcc/Function-Attributes.html)

`weak` は、上書き可能な宣言を意味しているようです。

なので、自分の Arduino スケッチで `initVariant()` を定義すれば、そこで処理を行えます。

基本的に前処理は `setup()` に書けばいいのですが、Arduino の記法を維持したまま、処理を書き換えたい場合に使えるみたい。

```C:
// FreeRTOS variantHooks.cpp
void initVariant(void) __attribute__ ((OS_main));

void initVariant(void)
{
    // As the Task stacks are on heap before Task allocated heap variables,
    // the library default __malloc_heap_end = 0 doesn't work.
    __malloc_heap_end = (char *)(RAMEND - __malloc_margin);

#if defined(USBCON)
    USBDevice.attach();
#endif

    setup();                    // the normal Arduino setup() function is run here.
    vTaskStartScheduler();      // initialise and run the freeRTOS scheduler. Execution should never return here.
}
```

### init

```C:
void init()
{
    sei();

    // （略）
}

// avr/interrupt.h
# define sei()  __asm__ __volatile__ ("sei" ::)
```

割り込み許可をしてます。

（略） には #IFDEF のブロックがあります。
