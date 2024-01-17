<template>
	<div class="echarts-example w-full h-full">
		<el-card header="通过hooks实现echarts">
			<div ref="myChat" class="w-full h-80"></div>
			<div ref="myChat1" class="w-full h-80"></div>
		</el-card>

		<el-card header="代码">
			<Highlight :code="useEchartsCode" />
		</el-card>
	</div>
</template>

<script setup lang="ts">
import useECharts from '@/hooks/useECharts';
import useEchartsCode from './02.useECharts.vue?raw';
import { EChartsOption } from 'echarts';

const myChat = ref<HTMLElement | null>(null);
const myChat1 = ref<HTMLElement | null>(null);

const option: EChartsOption = {
	title: {
		text: 'Stacked Line',
	},
	tooltip: {
		trigger: 'axis',
	},
	legend: {
		data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true,
	},
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			name: 'Email',
			type: 'line',
			stack: 'Total',
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: 'Union Ads',
			type: 'line',
			stack: 'Total',
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: 'Video Ads',
			type: 'line',
			stack: 'Total',
			data: [150, 232, 201, 154, 190, 330, 410],
		},
		{
			name: 'Direct',
			type: 'line',
			stack: 'Total',
			data: [320, 332, 301, 334, 390, 330, 320],
		},
		{
			name: 'Search Engine',
			type: 'line',
			stack: 'Total',
			data: [820, 932, 901, 934, 1290, 1330, 1320],
		},
	],
};
// const { chartInstance, setOption } = useECharts(myChat, option);
const myChatObj1 = useECharts(myChat, option);
const myChatObj2 = useECharts(myChat1, option);

onMounted(() => {
	// 下面这种实现方式也行
	// setOption(option);
	// setOption(option, true, false); // 使用第一种参数形式
	// setOption(option, { notMerge: true, replaceMerge: 'dataset', lazyUpdate: false }); // 使用第二种参数形式
});
</script>

<style scoped lang="scss"></style>
