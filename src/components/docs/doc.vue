<template>
	<div class="doc mb-6" v-bind="$attrs" :title="title">
		<h2 v-if="title" class="text-3xl">{{ title }}</h2>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: '',
	},
});
</script>

<style scoped lang="scss">
.doc {
	width: 100%;
	:deep(.tip) {
		padding: 8px 16px;
		background-color: var(--block-tip-bg-color);
		border-radius: 4px;
		border-left: 5px solid var(--el-color-primary);
		margin: 10px 0;
		font-size: 1rem;
	}

	:deep(p) {
		width: fit-content;
		margin: 5px 0px;
		background: linear-gradient(to right, #ec695c, var(--el-color-primary)) no-repeat right bottom;
		background-size: 0 2px;
		transition: background-size 1300ms;
		cursor: pointer;
	}
	:deep(p:hover) {
		background-position-x: left;
		background-size: 100% 2px;
	}
}
</style>
