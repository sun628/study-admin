<template>
	<el-row class="flex items-center mb-2">
		<el-col class="flex">
			<h2>computed 拦截：</h2>
			<customInput v-model="msg" />
		</el-col>
		<el-col :span="12">
			<h2>父组件的msg值： <tag :data="msg" /></h2>
		</el-col>
	</el-row>
	<Tip title>
		<p>使用computed拦截对象时，不会触发<code>computed</code>的<code>set</code>方法</p>
		<p>原因是：form.xxx = xxx时，并不会触发computed的set，只有form = xxx时，才会触发set</p>
	</Tip>
	<div class="flex items-center mb-2">
		<h2>Proxy+computed 代理对象：</h2>
		<customForm v-model="form" />
	</div>
</template>

<script setup lang="ts">
import customInput from './customInput.vue';
import customForm from './customForm.vue';

const msg = ref('hello');

const form = ref({
	name: '张三',
	age: 18,
	sex: 'man',
});

watch(form, (newValue) => {
	console.log(newValue);
});
</script>

<style scoped lang="scss">
h2 {
	white-space: nowrap;
	margin-right: 10px;
	margin-bottom: 0;
}
</style>
