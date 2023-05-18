export const isRefCode = `const str = ref('aaa');
const num = 666;
console.log(isRef(str)); // true
console.log(isRef(num)); //false`;

export const unrefCode = `let msgref = ref('你好');
console.log(unref(msgref)); // 你好
let msg = '你好';
console.log(unref(msg)); // 你好`;

export const toRefCode = `// 按原样返回现有的 ref
toRef(existingRef)

// 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
toRef(() => props.foo)

// 从非函数的值中创建普通的 ref
// 等同于 ref(1)
toRef(1)`;

export const toRefCode1 = `const state = reactive({
  foo: 1,
  bar: 2
})

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3`;
