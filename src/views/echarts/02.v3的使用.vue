<template>
	<div id="box" style="width: 100%; height: 400px">energy analysis</div>
</template>

<script setup lang="ts">
type EChartsOption = echarts.EChartsOption;
var option: EChartsOption;
onMounted(() => {
	change();
});
let echarts: any = inject('echarts');
const change = () => {
	const myChart = echarts.init(document.getElementById('box'));
	option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: [150, 230, 224, 218, 135, 147, 260],
				type: 'line',
			},
		],
	};
	option && myChart.setOption(option);
	// 根据页面大小自动响应图表大小
	window.addEventListener('resize', function () {
		myChart.resize();
	});
};
</script>

<style lang="scss" scoped></style>
