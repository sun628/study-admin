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
			<el-descriptions-item label="项目">写一个用来学习以及可以<bold>cv</bold>的系统。（练习两年半，只会cv）</el-descriptions-item>
		</el-descriptions>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="label" label="技术栈">
				<template #default="{ row }">
					<el-link :href="row.link" target="_blank"> {{ row.label }}</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="link" label="官方文档">
				<template #default="{ row }">
					<el-link :href="row.link" target="_blank">{{ row.link }}</el-link>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>
<script setup lang="ts">
const gitee_url = 'https://gitee.com/nuanyang163/study-admin';
const tableData = ref([
	{
		label: 'vue 全家桶 vue3',
		link: 'https://v3.cn.vuejs.org/',
	},
	{
		label: 'vue-router 4.1.6',
		link: 'https://next.router.vuejs.org/zh/',
	},
	{
		label: 'Pinia',
		link: 'https://pinia.esm.dev/',
	},
	{
		label: 'TypeScript',
		link: 'https://www.typescriptlang.org/',
	},
	{
		label: 'vite构建工具',
		link: 'https://cn.vitejs.dev/',
	},
	{
		label: 'element-plus',
		link: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
	},
	{
		label: 'tailwindcss',
		link: 'https://www.tailwindcss.cn/',
	},
	{
		label: 'vueuse',
		link: 'https://vueuse.org/',
	},
	{
		label: 'sass',
		link: 'https://www.sass.hk/',
	},
	{
		label: 'axios',
		link: 'https://axios-http.com/',
	},

	{
		label: 'node.js：需要v16版本以上',
		link: 'https://nodejs.org/zh-cn/',
	},
	{
		label: 'echarts 5.4.2',
		link: 'https://echarts.apache.org/zh/index.html',
	},
	{
		label: 'mitt',
		link: '	https://github.com/developit/mitt',
	},
	{
		label: 'electron',
		link: 'https://www.electronjs.org/',
	},
	{
		label: 'highlight.js',
		link: 'https://highlightjs.org/',
	},
	{
		label: '代码检查：eslint',
		link: 'https://eslint.bootcss.com/',
	},
	{
		label: '格式化：prettier',
		link: 'https://prettier.io/',
	},
	{
		label: 'vercel',
		link: 'https://vercel.com/',
	},
]);
</script>

<style scoped lang="scss">
.home {
	width: 100%;
	height: 100%;
	position: relative;
	ul {
		border: 1px solid #d9d9d9;
		border-radius: 2px;
		text-align: center;
		li {
			padding: 8px 16px;
			border-bottom: 1px solid var(--el-border-color);
		}
	}
}
</style>
