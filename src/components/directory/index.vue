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
import { useDebounceFn } from '@vueuse/core';
import { useEventListener } from '@/hooks/event';
defineOptions({
	name: 'Directory',
});

export type DirectoryData = { link?: string | number; label: string }[];

export type DirectoryProps = {
	data: DirectoryData;
};

const props = withDefaults(defineProps<DirectoryProps>(), {
	data: () => [] as DirectoryData,
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
	el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
	activeName.value = row.label;
};

const topRange = 300; // 距离顶部多少距离时，激活目录
let elementArr: Element[] = [];
const scrollHander = useDebounceFn((e) => {
	const rects = elementArr.map((item) => item.getBoundingClientRect()); // 获取元素的位置信息
	console.log('🚀 ~ file: index.vue:57 ~ scrollHander ~ rects:', rects);
	for (let i = 0; i < rects.length; i++) {
		const rect = rects[i];
		const element = elementArr[i];
		if (rect.top > 0 && rect.top < topRange) {
			activeName.value = element.getAttribute('title') || '';
			break;
		} else if (rect.top < 0 && rects[i + 1]?.top > document.documentElement.clientHeight) {
			activeName.value = element.getAttribute('title') || '';
			break;
		}
	}
}, 100);

onMounted(() => {
	elementArr = Array.from(document.querySelectorAll('.doc'));
});
useEventListener(window, 'scroll', scrollHander, { capture: true });
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
