<template>
	<div class="echarts-example w-full h-full">
		<el-card header="echarts实现">
			<div ref="myChat" style="width: 100%; height: 800px"></div>
		</el-card>
		<el-card header="代码">
			<Highlight :code="useEchartsCode" />
		</el-card>
	</div>
</template>

<script setup lang="ts">
import useECharts from '@/hooks/useECharts';
import useEchartsCode from './index.vue?raw';
const myChat = ref<HTMLElement | null>(null);

const option: echarts.EChartsOption = {
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
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line',
			areaStyle: {},
		},
	],
};
const { chartInstance, setOption } = useECharts(myChat);

// setOption(option);

// setOption(option, true, false); // 使用第一种参数形式

setOption(option, { notMerge: true, replaceMerge: 'dataset', lazyUpdate: false }); // 使用第二种参数形式
// onMounted(() => {
// 	console.log('chartInstance', chartInstance.value);
// });
</script>

<style scoped lang="scss"></style>
