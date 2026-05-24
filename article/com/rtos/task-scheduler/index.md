---
title: タスクスケジューラ
icon: calendar
abst: ""
---

- initVariant
  - setup
    - xTaskCreate
      - pvPortMalloc
      - prvInitialiseNewTask
        - vListInitialiseItem
        - pxPortInitialiseStack
      - prvAddNewTaskToReadyList
  - vTaskStartScheduler
    - xPortStartScheduler
      - prvSetupTimerInterrupt
      - portRESTORE_CONTEX
      - asm ret
