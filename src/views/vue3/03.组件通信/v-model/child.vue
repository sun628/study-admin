<template>
	<doc title="子组件">
		<h3>默认值的改变</h3>
		<p class="tip">props里用modelValue接收,通过emit('update:modelValue',value)事件更新</p>
		<div class="border p-1 bg-gray-200 mb-2">
			<span>来自父组件的count：</span> <span>{{ modelValue }}</span>
		</div>
		<el-button type="warning" @click="change">更新count</el-button>

		<h3 class="mt-5">绑定多个案例</h3>
		<p class="tip">v-model绑定其他值（v-model:msg,通过emit('update:msg',value)事件更新</p>
		<div class="border p-1 bg-gray-200 mb-2">
			<span>来自父组件的msg：</span> <span>{{ msg }}</span>
		</div>
		<el-button type="warning" @click="updateMsg">更新msg</el-button>
	</doc>
</template>
<script setup lang="ts">
type prop = {
	modelValue: number;
	msg?: string;
};

const props = withDefaults(defineProps<prop>(), {
	modelValue: 0,
	msg: '',
});
const { modelValue, msg } = toRefs(props);

const emit = defineEmits(['update:modelValue', 'update:msg']);
const change = () => {
	emit('update:modelValue', modelValue.value - 1);
};

const updateMsg = () => {
	emit('update:msg', 'msg更新了');
};
</script>
<style scoped lang="scss"></style>
