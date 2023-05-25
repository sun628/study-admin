<template>
	<doc class="flex-1">
		<div class="tip">
			<h2>默认值</h2>
			<ul>
				<li v-for="(item, index) in tipsList" :key="index">{{ item }}</li>
			</ul>
			<h2>其他值的改变</h2>
			<p>prop:v-model:msg</p>
			<p>事件:emit('update:msg',newValue)</p>
		</div>
		<h2>父组件</h2>
		<div class="tip flex">
			<p style="margin-right: 10px">v-model绑定<bold>默认</bold>值</p>
			<el-button type="primary" @click="countAdd()">更新传给子组件的count</el-button>
		</div>

		<div class="tip flex">
			<p style="margin-right: 10px; white-space: nowrap">v-model绑定<bold>其他</bold>值</p>
			<el-input v-model="msg"></el-input>
		</div>
	</doc>
	<el-divider>
		<el-icon><star-filled /></el-icon>
	</el-divider>
	<child v-model="count" v-model:msg="msg"></child>
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

let count = ref(0);

const countAdd = () => {
	count.value = count.value + 1;
};

let msg = ref('');
</script>
