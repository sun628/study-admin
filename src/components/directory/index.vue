<template>
	<el-card class="box-card">
		<template #header>
			<div class="card-header font-bold text-xl">
				<slot name="header">
					<span>目录</span>
				</slot>
			</div>
		</template>
		<div v-for="(item, index) in data" :key="index" :class="{ active: activeName === item.label }" @click="scrollToView(item)">
			<span class="pointer leading-8">{{ index + 1 }}. {{ item.label }}</span>
		</div>
	</el-card>
</template>
<script setup lang="ts">
defineOptions({
	name: 'Directory',
});
export type DirectoryProps = {
	data: { link?: string | number; label: string }[];
};

const props = withDefaults(defineProps<DirectoryProps>(), {
	data: () => [],
});
const { data } = toRefs(props);

const activeName = ref(data.value[0]?.label);

/**
 * @description 把某元素滚动到页面顶部
 * @param {DirectoryProps['data'][number]} row
 * @param {string} row.link - 跳转链接
 * @param {string} row.label - 当link不存在时，根据label查找元素提供滚动
 **/
const scrollToView = (row: DirectoryProps['data'][number]) => {
	// 判断是否开启了link,如果有则根据link查找元素,否则根据title查找元素
	let el: HTMLElement | null;
	if (row.link) {
		el = document.querySelector(`[link="${row.link}"]`);
	} else {
		el = document.querySelector(`[title="${row.label}"]`);
	}
	console.log('🚀 ~ file: index.vue:44 ~ scrollToView ~ el:', el);
	el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
	activeName.value = row.label;
};
</script>

<style scoped lang="scss">
.box-card {
	position: sticky;
	top: 10px;
	min-width: 205px;
	.active {
		color: var(--el-color-primary);
		background-color: #f0f0f5;
	}
}
</style>
