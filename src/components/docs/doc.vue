<template>
	<div v-bind="$attrs" ref="DocRef" class="doc mb-6" :title="title">
		<h2 v-show="title" class="text-3xl">
			<font class="pointer doc-font" @click="scrollToView()"> # </font>
			<span>{{ title }}</span>
		</h2>
		<div class="doc-content">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useHighlightKeywords } from '@/hooks/useHighlightKeywords';
import mittBus from '@/utils/mittBus';
export interface DocProps {
	title?: string; // table的数据
	keywords?: 'words' | 'keywords';
}
const props = withDefaults(defineProps<DocProps>(), {
	title: '',
	keywords: undefined,
});

const { title } = toRefs(props);
const DocRef: Ref<HTMLElement | null> = ref(null);
const scrollToView = () => {
	const el = document.querySelector(`[title="${title.value}"]`);
	el && el.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
};
useHighlightKeywords(DocRef, (value: string) => {
	mittBus.emit('keywordSearchByMitt', value);
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
	:deep(.doc-font:hover),
	:deep(.doc-font:focus) {
		color: var(--el-color-primary-light-5);
	}
}
</style>
@/utils/useKeywords @/utils/useKeywords
