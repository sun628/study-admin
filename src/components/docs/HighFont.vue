<template>
	<span :style="{ color: color }" v-bind="$attrs">
		<slot></slot>
	</span>
</template>
<script setup lang="ts">
defineProps({
	color: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
span {
	color: var(--el-color-primary);
}
</style>
