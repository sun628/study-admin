<template>
	<div class="home">
		<el-row :gutter="20" class="mb-5">
			<el-col :span="12">
				<el-card class="w-full h-full">
					<template #header>
						<div class="card-header">
							<span>Card name</span>
							<el-button class="button" text>Operation button🐞 🍏</el-button>
						</div>
					</template>
					<el-timeline>
						<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:icon="activity.icon"
							:type="activity.type"
							:color="activity.color"
							:size="activity.size"
							:hollow="activity.hollow"
							:timestamp="activity.timestamp"
						>
							{{ activity.content }}
						</el-timeline-item>
					</el-timeline>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
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
				</el-card>
			</el-col>
		</el-row>

		<el-row>
			<el-card class="w-full">
				<mv-table :data="tableData" stripe style="width: 100%" size="large">
					<el-table-column prop="label" label="技术栈">
						<template #default="{ row }">
							<div :class="{ 'highlight-keywords': isKeyword(row.label) }" @click="handleClickLink(row.label)">
								<el-link type="primary">{{ row.label }}</el-link>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="link" label="官方文档">
						<template #default="{ row }">
							<el-link :href="row.link" target="_blank">{{ row.link }}</el-link>
						</template>
					</el-table-column>
				</mv-table>
			</el-card>
		</el-row>
	</div>
</template>
<script setup lang="ts">
// import type { ElTimelineItem } from 'element-plus';
import { ElTimelineItem } from 'element-plus';
import mittBus from '@/utils/mittBus';
import { isKeyword } from '@/hooks/useHighlightKeywords';
import MvTable from '@/components/mv-table/index.vue';
import { MoreFilled } from '@element-plus/icons-vue';
import { DefineComponent } from 'vue';

const gitee_url = 'https://gitee.com/nuanyang163/study-admin';

const tableData = ref([
	{
		label: 'vue3',
		link: 'https://v3.cn.vuejs.org/',
	},
	{
		label: 'vue-router',
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
		label: 'vite',
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
		label: 'eslint',
		link: 'https://eslint.bootcss.com/',
	},
	{
		label: 'prettier',
		link: 'https://prettier.io/',
	},
]);

interface ElTimelineItemProps {
	icon?: DefineComponent | string;
	type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
	color?: string;
	size?: 'normal' | 'large';
	hollow?: boolean;
	timestamp?: string;
	content?: string;
}
// type ElTimelineItemProps = InstanceType<typeof ElTimelineItem>['$props'];

const activities = ref<Array<ElTimelineItemProps>>([
	{
		content: 'Custom icon',
		timestamp: '2018-04-12 20:46',
		size: 'large',
		type: 'primary',
		icon: markRaw(MoreFilled),
	},
	{
		content: 'Custom color',
		timestamp: '2018-04-03 20:46',
		color: '#0bbd87',
	},
	{
		content: 'Custom size',
		timestamp: '2018-04-03 20:46',
		size: 'large',
	},
	{
		content: 'Custom hollow',
		timestamp: '2018-04-03 20:46',
		type: 'primary',
		hollow: true,
	},
	{
		content: 'Default node',
		timestamp: '2018-04-03 20:46',
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
