<template>
  <!-- <p>
    基础类型：Boolean、 Number、String、null、undefined 以及 ES6 的 Symbol 和 ES10
    的BigInt。
  </p> -->
  <div>
    <li v-for="(item, index) in obj">{{ obj[index] }}</li>
  </div>
</template>
<script setup lang="ts">
const obj = { name: '1', age: 18, sex: '男' };

const list = [{ name: '1' }, { name: '2' }, { name: '3' }];

// :key=item.goods.goods.id
const list1 = [{ goods: { goods: { id: 1 } } }, {}, {}, {}, {}];

// :key=item.id
const list2 = [{ id: 1 }, {}, {}, {}, {}];
</script>

<style scoped lang="scss"></style>
