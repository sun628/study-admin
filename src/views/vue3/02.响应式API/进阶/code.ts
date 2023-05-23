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

export const triggerRefCode = `const shallow = shallowRef({
	count: 0,
});

// 此时ref对象的值会发生改变 但是视图并不会更新，因为这个 ref 是浅层的
shallow.value.count++;

// 通过 triggerRef 可以使视图强制更新
triggerRef(shallow);`;

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

export const shallowReactiveCode = `const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++`;

export const shallowReadonlyCode = `const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++`;

export const toRawCode = `const state = {
	a: 1,
	b: 2,
};
const reactiveState = reactive(state);

const proxyState = toRaw(reactiveState);

console.log(proxyState === state); // true
console.log(proxyState === reactiveState); // false
console.log(proxyState.a === reactiveState.a); // true`;

export const markRawCode = `const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false`;
