<template>
	<highlightjs v-copy="code" :autodetect="auto" :language="lang" :code="code"></highlightjs>
</template>
<script setup lang="ts">
const props = defineProps({
	code: {
		type: String,
		default: '',
	},
	lang: {
		type: String,
		default: '',
	},
});
const auto = computed(() => {
	// 如果 lang 不是默认值，则 auto 为 false，否则为 true
	return props.lang === '';
});
</script>

<style scoped lang="scss">
/* 语法高亮 */
.hljs-container {
	position: relative;
	display: block;
	width: 600px;
	padding: 30px 5px 2px;
	overflow-x: hidden;
	line-height: 20px;
	text-align: left;
	background: #21252b;
	box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

/** 3个点 */
.hljs-container::before {
	position: absolute;
	top: 10px;
	left: 15px;
	width: 12px;
	height: 12px;
	overflow: visible;
	font-weight: 700;
	font-size: 16px;
	line-height: 12px;
	white-space: nowrap;
	text-indent: 75px;
	background-color: #fc625d;
	border-radius: 16px;
	box-shadow:
		20px 0 #fdbc40,
		40px 0 #35cd4b;
	content: attr(codetype);
}
pre {
	margin-bottom: 5px;
}

/** 滚动条 */
:deep(.hljs) {
	overflow-x: auto;
	border-radius: 8px;
	background-color: #292d3e;
	position: relative;
	.copy {
		position: absolute;
		top: 10px;
		right: 10px;
		color: #ccc;
		background-color: #343848;
		padding: 5px 8px;
		cursor: pointer;
		&:hover {
			color: #1890ff;
		}
	}
}

:deep(.hljs::-webkit-scrollbar) {
	width: 12px !important;
	height: 12px !important;
}

:deep(.hljs::-webkit-scrollbar-thumb) {
	height: 30px !important;
	background: #d1d8e6;
	background-clip: content-box;
	border: 2px solid transparent;
	border-radius: 19px;
	opacity: 0.8;
}

:deep(.hljs::-webkit-scrollbar-thumb:hover) {
	background: #a5b3cf;
	background-clip: content-box;
	border: 2px solid transparent;
}

:deep(.hljs::-webkit-scrollbar-track-piece) {
	width: 30px;
	height: 30px;
	background: #333;
}

:deep(.hljs-comment) {
	color: #2f9427;
	// color: var(--el-color-primary);
}
::-webkit-scrollbar-button {
	display: none;
}
</style>
