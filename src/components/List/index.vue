<template>
	<ul v-bind="$attrs">
		<slot></slot>
		<li v-for="(item, index) in data" :key="index">
			{{ item }}
		</li>
	</ul>
</template>
<script lang="ts" setup>
defineProps({
	data: {
		type: Array as () => string[],
		default: () => [],
	},
});
// const emit = defineEmits(['click']);
// const ItemClick: ListEmits = (item) => {
// 	console.log('click');
// 	emit('click', item);
// };
</script>
<style scoped lang="scss">
ul {
	width: 100%;
	height: 100%;
	list-style: inside;
	li {
		margin: 5px 0;
		padding: 5px 10px;
		color: var(--el-color-warning);
	}
}
</style>
