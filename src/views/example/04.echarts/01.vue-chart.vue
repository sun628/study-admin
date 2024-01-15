<template>
	<el-card class="w-full h-full" header="通过第三方vue-chart实现  pnpm i vue-chart">
		<v-chart class="chart" :option="option" autoresize />
	</el-card>
</template>

<script setup>
// pnpm i vue-chart
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

// provide(THEME_KEY, 'dark');

const option = ref({
	title: {
		text: 'Traffic Sources',
		left: 'center',
	},
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	legend: {
		orient: 'vertical',
		left: 'left',
		data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
	},
	series: [
		{
			name: 'Traffic Sources',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [
				{ value: 335, name: 'Direct' },
				{ value: 310, name: 'Email' },
				{ value: 234, name: 'Ad Networks' },
				{ value: 135, name: 'Video Ads' },
				{ value: 1548, name: 'Search Engines' },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
		},
	],
});
</script>

<style scoped lang="scss">
.el-card {
	display: flex;
	flex-direction: column;
	:deep(.el-card__body) {
		flex: 1;
		.chart {
			height: 100%;
		}
	}
}
</style>
