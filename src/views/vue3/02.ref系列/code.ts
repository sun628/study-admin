export const refCode = `<template>
  <span>{{ count }}</span>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
console.log(count); // RefImpl{__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 0, _value: 0}
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
</script>`;

export const shallowRefCode = `const obj = { count: 1, bar: { baz: 2 } };
const shallowObj = shallowRef(obj);

// 不会触发更改
shallowObj.value.count = 2;

// 会触发更改
shallowObj.value = { ...obj, count: 2 };

// 或者为obj.bar创建一个ref
shallowObj.value.bar = reactive(obj.bar);

// 手动地通知依赖objRef的视图进行更新
shallowObj.value = { ...obj };`;

export const shallowRefCode1 = `const shallowArray = shallowRef([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArray.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
] `;
