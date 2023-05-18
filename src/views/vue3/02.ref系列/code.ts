export const refCode = `<template>
  <span>{{ count }}</span>
</template>
<script setup lang="ts">
import { ref, customRef } from 'vue';
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

export const isRefCode = `const str = ref('aaa');
const num = 666;
console.log(isRef(str)); // true
console.log(isRef(num)); //false`;

export const triggerRefCode = `const shallow = shallowRef({
	count: 0,
});

// 此时ref对象的值会发生改变 但是视图并不会更新，因为这个 ref 是浅层的
shallow.value.count++;

// 通过 triggerRef 可以使视图强制更新
triggerRef(shallow);`;

export const unrefCode = `let msgref = ref('你好');
console.log(unref(msgref)); // 你好
let msg = '你好';
console.log(unref(msg)); // 你好`;

export const customReftType = `function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}`;
export const customReftCode = `import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}`;
export const customRefDemoCode = `<script setup>
import { useDebouncedRef } from './debouncedRef'
const text = useDebouncedRef('hello')
</script>

<template>
  <input v-model="text" />
</template>`;
