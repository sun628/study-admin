<template>
	<doc class="flex-1">
		<div class="tip">
			<p>其实是一个语法糖 通过props 和 emit组合而成的</p>
			<ul>
				<li v-for="(item, index) in tipsList" :key="index">{{ item }}</li>
			</ul>
		</div>
		<h2>父组件</h2>
		<el-button type="primary" @click="updataMsg()">更新传给子组件的msg</el-button>
		<h2></h2>

		<div>
			<!-- 通过默认值的形式 -->
		</div>
	</doc>
	<el-divider>
		<el-icon><star-filled /></el-icon>
	</el-divider>
	<doc title="子组件" class="flex-1">
		<child v-model="msg" @update-count="updateCount"></child>
	</doc>
</template>

<script setup lang="ts">
import Child from './child.vue';
const tipsList = [
	'prop：value -> modelValue;',
	'事件：input -> update:modelValue;',
	'v-bind 的 .sync 修饰符和组件的 model 选项已移除;',
	'新增 支持多个v-model;',
	'新增 支持自定义修饰符 Modifiers',
];
const msg = ref('不听不听~');

let count = ref(0);

const updateCount = (val: number) => {
	count.value = val;
};

const updataMsg = () => {
	msg.value = '不听' + msg.value;
};
</script>
