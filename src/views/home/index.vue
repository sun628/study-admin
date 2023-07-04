<template>
	<el-card class="home">
		<el-descriptions title="介绍" size="large" border :column="2">
			<el-descriptions-item label="gitee地址">
				<el-link type="primary" :href="gitee_url" target="_blank">{{ gitee_url }}</el-link>
			</el-descriptions-item>
			<el-descriptions-item label="居住地">中国</el-descriptions-item>
			<el-descriptions-item label="微信">nuanyang16333</el-descriptions-item>
			<el-descriptions-item label="标签">
				<el-tag class="mr-3">vue3</el-tag>
				<el-tag class="mr-3">TypeScript</el-tag>
				<el-tag class="mr-3">vite</el-tag>
			</el-descriptions-item>
			<el-descriptions-item label="项目"
				>写一个用来<font class="font-bold">学习</font>以及可以<font>CV</font>的系统。（练习两年半，只会cv）</el-descriptions-item
			>
		</el-descriptions>
		<el-table :data="tableData" stripe style="width: 100%" size="large">
			<el-table-column prop="label" label="技术栈">
				<template #default="{ row }">
					<div :class="{ 'highlight-keywords': isKeyword(row.label) }" @click="handleClickLink(row.label)">
						<el-link type="primary">{{ row.label }}</el-link>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="tip" label="介绍"></el-table-column>
			<el-table-column prop="link" label="官方文档">
				<template #default="{ row }">
					<el-link :href="row.link" target="_blank">{{ row.link }}</el-link>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>
<script setup lang="ts">
import mittBus from '@/utils/mittBus';
import { isKeyword } from '@/hooks/useHighlightKeywords';
const gitee_url = 'https://gitee.com/nuanyang163/study-admin';
const tableData = ref([
	{
		label: 'vue3',
		link: 'https://v3.cn.vuejs.org/',
		tip: 'vue3到底有哪些优势？',
	},
	{
		label: 'vue-router',
		link: 'https://next.router.vuejs.org/zh/',
		tip: '路由这东西确实挺神奇的，en……',
	},
	{
		label: 'Pinia',
		link: 'https://pinia.esm.dev/',
		tip: '专门为vue3设计的更轻量级、更简单的状态管理库',
	},
	{
		label: 'TypeScript',
		link: 'https://www.typescriptlang.org/',
		tip: 'javaScript的超集（牛逼确实牛逼，就是不会）',
	},
	{
		label: 'vite',
		link: 'https://cn.vitejs.dev/',
		tip: '下一代的前端工具链',
	},
	{
		label: 'element-plus',
		link: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
		tip: '我反正觉得比ant-design-vue好用,至少写虚拟列表不收费',
	},
	{
		label: 'tailwindcss',
		link: 'https://www.tailwindcss.cn/',
		tip: '本质上是一个工具集,可以在 HTML 代码上实现任何 UI 设计（褒贬不一）',
	},
	{
		label: 'vueuse',
		link: 'https://vueuse.org/',
		tip: '提供了一系列复用的、函数式的Vue 3 Composition API',
	},
	{
		label: 'sass',
		link: 'https://www.sass.hk/',
		tip: '跟less比到底有哪些优势呢？',
	},
	{
		label: 'axios',
		link: 'https://axios-http.com/',
		tip: '简历别再写封装axios了，反正我肯定不信',
	},

	{
		label: 'node.js：需要v16版本以上',
		link: 'https://nodejs.org/zh-cn/',
		tip: '如果安装失败了，请看看版本',
	},
	{
		label: 'echarts 5.4.2',
		link: 'https://echarts.apache.org/zh/index.html',
		tip: '大屏写了两年半，还是记不住那该死的api',
	},
	{
		label: 'mitt',
		link: '	https://github.com/developit/mitt',
		tip: '一个轻量级用来解决组件通信的库,类似vue2的eventBus',
	},
	{
		label: 'electron',
		link: 'https://www.electronjs.org/',
		tip: '用来构建桌面应用程序',
	},
	{
		label: 'highlight.js',
		link: 'https://highlightjs.org/',
		tip: '代码高亮',
	},
	{
		label: 'eslint',
		link: 'https://eslint.bootcss.com/',
		tip: '代码检查',
	},
	{
		label: '格式化：prettier',
		link: 'https://prettier.io/',
		tip: '代码格式化',
	},
]);

/**
 * @description 点击技术栈跳转到搜索页面
 * @param {Object} label 技术栈名称
 **/
function handleClickLink(label: string) {
	isKeyword(label) && mittBus.emit('keywordSearchByMitt', label);
}
</script>

<style scoped lang="scss"></style>
