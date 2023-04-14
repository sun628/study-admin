export const scriptTag = '</' + 'script>';

export const PropsEmits = `//父组件：
<template>
	<!-- 通过v-bind将数据向子组件传递
  动态绑定 props 是用 :，绑定 emit 是用 @ -->
	<child :count="count" @update-count="updateCount"></child>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Child from './child.vue';
let count = ref(0);
const updateCount = (val: number) => {
	count.value = val;
};
${scriptTag}

//子组件child：
<template>
	<h2>来自父组件的数据count：{{ count }}</h2>
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
${scriptTag}`;
