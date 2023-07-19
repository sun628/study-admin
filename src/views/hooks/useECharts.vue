<template>
	<el-card>
		<doc title="使用ECharts(添加响应式)">
			<Highlight :code="EChartsCode" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const EChartsCode = `import { onMounted, onUnmounted, onDeactivated } from 'vue';
import * as echarts from 'echarts';
import { useDebounceFn } from '@vueuse/core';

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} myChart Echarts实例 (必传)
 * @returns {Object} chartInstance 实例
 * @returns {function} setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart);
 * */
export default function useECharts(myChart: Ref<HTMLElement>) {
	let chartInstance: echarts.ECharts | null = null;
	const initChart = () => {
		const chart = echarts.getInstanceByDom(myChart.value); // 获取已有实例
		if (chart) {
			chartInstance = chart;
		} else {
			chartInstance = echarts.init(myChart.value); // 创建实例
		}
	};

	const setOption = (options: echarts.EChartsOption): void => {
		chartInstance?.setOption(options, true);
	};

	// 防抖
	const resizeChart = useDebounceFn(() => {
		chartInstance?.resize();
	}, 500);

	const onDestroy = () => {
		window.removeEventListener('resize', resizeChart);
		chartInstance?.dispose();
		chartInstance = null; // 销毁实例
	};

	onMounted(() => {
		initChart();
		window.addEventListener('resize', resizeChart);
	});

	// 防止 echarts 页面 keepAlive 时，还在继续监听页面
	onDeactivated(() => {
		onDestroy();
	});

	onUnmounted(() => {
		onDestroy();
	});

	return { chartInstance, setOption };
}`;
</script>

<style scoped lang="scss"></style>
