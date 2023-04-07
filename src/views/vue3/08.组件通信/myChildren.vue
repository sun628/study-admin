<template>
	<div class="my-children m-full h-full">
		<h2>我是子组件</h2>
		<el-button type="primary" @click="handleClick">点击我</el-button>
		<el-input placeholder="Please input" />
	</div>
</template>
<script setup lang="ts">
const props = defineProps({
	modelValue: {
		type: Object,
		default: () => ({}),
	},
});
const handleClick = () => {
	// eslint-disable-next-line vue/no-mutating-props
	props.modelValue.inputValue = '我是子组件的点击事件';
};
</script>

<style scoped lang="scss"></style>
