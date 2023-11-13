<template>
	<div class="flex items-center mb-2">
		<h2>computed拦截：</h2>
		<customInput v-model="msg" />
	</div>
	<div class="flex items-center mb-2">
		<h2>Proxy代理对象：</h2>
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
