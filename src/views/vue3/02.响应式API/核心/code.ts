export const refCode = `<template>
  <span>{{ count }}</span>
</template>
<script setup lang="ts">
import { ref, customRef, computed } from 'vue';
const count = ref(0);
console.log(count); // RefImpl{__v_isShallow: false, dep: undefined, __v_isRef: true, _rawValue: 0, _value: 0,value:0}
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
</script>`;

export const reactiveCode = `const obj = reactive({ count: 0 })
obj.count++
`;
export const reactiveCode1 = `const count = ref(1);
const obj = reactive({ count });

// ref 会被解包
console.log(obj.count === count.value); // true

// 会更新 'obj.count'
count.value++;
console.log(count.value); // 2
console.log(obj.count); // 2
`;
export const reactiveCode2 = `let person = reactive<number[]>([])
setTimeout(() => {
  person = [1, 2, 3] //这样直接赋值页面是不会变化的因为会脱离响应式
  console.log(person);

  //解决方案1 使用push
  person.push(...arr)
  console.log(person);
},1000)


方案2 包裹一层对象
type Person = {
  list?:Array<number>
}
let person = reactive<Person>({
   list:[]
})
setTimeout(() => {
  const arr = [1, 2, 3]
  person.list = arr;
  console.log(person);
  
},1000)`;

export const readonlyCode = `const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
`;

export const computedCode = `
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误`;

export const computedCode1 = `const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0`;

export const watchRefCode = `const x = ref(1);
const y = ref(1);

//情况一、单个 ref
watch(
	x,
	(newX) => {
		console.log('x:', newX);
	},
	{ immediate: true }
);

//情况二、 getter 函数
watch(
	() => x.value + y.value,
	(sum) => {
		console.log('x + y:', sum);
	},
	{ immediate: true }
);

//情况三、 多个来源组成的数组
watch(
	[x, () => y.value],
	([newX, newY]) => {
		console.log('x:', newX, 'y :', newY);
	},
	{ immediate: true }
);`;

export const watchReactiveCode = `const obj = reactive({ count: 0 })
//情况四、 监听reactive对象
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // newValue 此处和 oldValue 是相等的
  // 因为它们是同一个对象！
},{immediate:true,deep:false}) //此处的deep配置不再奏效

obj.count++

//情况五：监视reactive定义的响应式数据中的某个属性
//不能直接监听obj.count，因为 watch() 得到的参数是一个 number
watch(
	() => obj.count,
	(newValue, oldValue) => {
		console.log('obj的count变化了', newValue, oldValue);
	},
	{ immediate: true, deep: true }
); //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效

//情况六：监视reactive定义的响应式数据中的某些属性
const person = reactive({ name: '张三', job: '抢劫' });
watch(
	[() => person.job, () => person.name],
	(newValue, oldValue) => {
		console.log('newValue:', newValue); //['抢劫', '张三']
		console.log('oldValue:', oldValue); //[]
	},
	{ immediate: true }
);`;
export const watchStopCode = `// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

//手动停止
const count = ref(0);
const stop = watch(
	count,
	(newValue, oldValue) => {
		console.log('newValue:', newValue); //0
		console.log('oldValue:', oldValue); //undefined
	},
	{ immediate: true }
);
stop();
count.value = 1; //不会再触发watch`;

export const watchEffectCode = `//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
const count = ref(0);

watchEffect(() => {
	console.log('count:', count.value);
});
// -> 输出 0

count.value++;// -> 输出 1`;

export const watchEffectCode1 = `const antiShake = (val: string, time: number) => {
	return setTimeout(() => {
    console.log('用户输入:', val);
		keywordText.value = val;
	}, time);
};
const keyword = ref<string>(''); //输入的值
const keywordText = ref<string>(''); //展示的值
watchEffect((onCleanup) => {
	const timer = antiShake(keyword.value, 1000); //清除副作用
	onCleanup(() => clearTimeout(timer));
	console.log('watchEffect', keyword.value);
});`;
