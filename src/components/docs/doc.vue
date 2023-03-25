<template>
	<div class="doc my-4">
		<h2>{{ title }}</h2>
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
	h2 {
		font-weight: 700;
		line-height: 30px;
		height: 30px;
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
