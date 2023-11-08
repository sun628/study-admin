<template>
	<span :style="{ color: color }" v-bind="$attrs" class="tag">
		<span v-if="text" class="tag">{{ text }}</span>
		<slot></slot>
	</span>
</template>
<script setup lang="ts">
defineProps({
	color: {
		type: String,
		default: '',
	},
	text: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
.tag {
	background-color: var(--el-color-primary-light-9);
	border-color: var(--el-color-primary-light-8);
	color: var(--el-color-primary);
	display: inline-flex;
	justify-content: center;
	align-items: center;
	vertical-align: middle;
	height: 24px;
	padding: 0 9px;
	line-height: 1;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	box-sizing: border-box;
	white-space: nowrap;
}
</style>
