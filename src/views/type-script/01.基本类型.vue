<template>
  <doc>
    <bold>基础类型：</bold>
    Boolean、Number、String、null、undefined 以及 ES6 的 Symbol 和 ES10 的 BigInt。
  </doc>
  <doc>
    <bold>1.字符串类型：</bold>
    <p>支持十六进制、十进制、八进制和二进制；</p>
    <div>
      let notANumber: number = NaN;//Nan let num: number = 123;//普通数字 let
      infinityNumber: number = Infinity;//无穷大 let decimal: number = 6;//十进制 let hex:
      number = 0xf00d;//十六进制 let binary: number = 0b1010;//二进制 let octal: number =
      0o744;//八进制
    </div>
  </doc>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
