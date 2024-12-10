---
title: 割り込み
---

Arduinoでの可変長のタイマ割り込みの例。

```
const byte LED_PIN = 13;
bool led_state = false;

// Format
// int[N*2]
// int[i*2]     : dt_i
// int[i*2 + 1] : j_i

const int N=16;
uint16_t i=0, j=0;

const uint16_t profile[N] = {
  0xFFFF,    8,
  0x7FFF,   16,
  0x3FFF,   32,
  0x1FFF,   64,
  0x0FFF,  128,
  0x07FF,  256,
  0x03FF,  512,
  0x01FF, 1024 
};

void setup() {
  pinMode(LED_PIN, OUTPUT);
  TCCR1A = 0b00000000;  // Mode4(MGM10=0,MGM11=0) CTC
  TCCR1B = 0b00001100;  // Mode4(MGM12=1,MGM13=0):clkI/256 (From prescaler)
  TIMSK1 = 0b00000010;  // OCIE1A: Timer/Countern, Output Compare A Match Interrupt Enable
  OCR1A  = 62500;
}

int next_ij(){
  if(j+1 == profile[i*2+1]) ++i, j=0;
  else ++j;
}

ISR(TIMER1_COMPA_vect) {
  // Toggle LED
  led_state = !led_state;
  digitalWrite(LED_PIN, led_state);
  // Next Interval 
  OCR1A = profile[i*2];
  next_ij();
  // Exit
  if(i*2>=N){
    digitalWrite(LED_PIN, false);
    exit(0);
  }
}

void loop() {
} 
```