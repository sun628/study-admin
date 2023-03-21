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
	h2 {
		font-weight: 700;
		line-height: 30px;
		height: 30px;
	}
	:deep(p) {
		margin: 5px 0px;
	}
}
</style>
