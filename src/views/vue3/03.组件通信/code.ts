export const PropsEmitsCode = `<!-- 父组件 -->
<template>
  <!-- 通过v-bind将数据向子组件传递, 动态绑定 props 是用 :，绑定 emit 是用 @ -->
	<child :count="count" @update-count="updateCount"></child>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Child from './child.vue';
let count = ref(0);
const updateCount = (val: number) => {
	count.value = val;
};
</script>

<!-- 子组件child： -->
<template>
	<h2>来自父组件的数据count：{{ count }}</h2>
  <el-button type="primary" @click="countAdd(count + 1)">通过emit触发点击事件</el-button>
</template>
<script setup lang="ts">
interface prop {
	count: number;
}
withDefaults(defineProps<prop>(), {
	count: 0,
});
const emit = defineEmits(['update-count']);
const countAdd = (val: number) => {
	emit('update-count', val);
};
</script>`;

export const VModelCode = `<!-- 父组件 -->
<template>
  <-- 通过v-model将数据向子组件传递 -->
  <child v-model="count"></child>
  <el-button type="primary" @click="countAdd()">更新传给子组件的count</el-button>
</template>
<script setup lang="ts">
let count = ref(0); 
const countAdd = () => {
  count.value++;
};
</script>

<!-- 子组件child： -->
<template>
	<div class="border p-1 bg-gray-200">
		<span>来自父组件的count：</span> <span>{{ modelValue }}</span>
	</div>
	<p class="tip">通过update:modelValue事件更新</p>
	<el-button type="warning" @click="change">通过emit更新count</el-button>
</template>
<script setup lang="ts">
interface prop {
	modelValue: number;
}

const props = withDefaults(defineProps<prop>(), {
	modelValue: 0,
});
const { modelValue } = toRefs(props);

const emit = defineEmits(['update:modelValue']);
const change = () => {
	emit('update:modelValue', modelValue.value - 1);
};
</script>`;

export const ProvideInjectCode = `// 父组件
let parentDataValue = ref(11111);
provide('parentData', parentDataValue);

// 子组件
let childData = inject('parentData');`;

export const MittCode = `import mitt from 'mitt'

// 创建一个事件总线
const emitter = mitt()

// 监听一个事件
emitter.on('foo', e => console.log('foo', e) )
// 移除一个事件监听
onUnmounted(() => {
	emitter.off('foo', onFoo); // onFoo 必须是一个函数引用,不加参数会移除所有foo事件监听
});

// 触发一个事件
emitter.emit('foo', { a: 'b' })`;
