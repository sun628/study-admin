import { shallowRef, onMounted, onUnmounted, onDeactivated } from 'vue';
import * as echarts from 'echarts';
import { useDebounceFn } from '@vueuse/core';

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} myChart Echarts实例 (必传)
 * @returns {Object} chartInstance 实例
 * @returns {function} setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart);
 * */
export default function useECharts(chartRef: Ref<HTMLElement>) {
	const chartInstance = shallowRef<echarts.ECharts | null>(null);
	const initChart = () => {
		const chart = echarts.getInstanceByDom(chartRef.value); // 获取已有实例
		if (chart) {
			chartInstance.value = chart;
		} else {
			chartInstance.value = echarts.init(chartRef.value); // 创建实例
		}
	};

	const setOption = (options: echarts.EChartsOption) => {
		if (chartInstance.value) {
			try {
				chartInstance.value.setOption(options, true);
			} catch (error) {
				console.error('Error setting chart options:', error);
			}
		} else {
			console.error('Error setting chart options: chartInstance.value is null');
		}
	};

	// Debounced resize function
	const resizeChart = useDebounceFn(() => {
		if (chartInstance.value) {
			try {
				chartInstance.value.resize();
			} catch (error) {
				console.error('Error resizing chart:', error);
			}
		} else {
			console.error('Error resizing chart: chartInstance.value is null');
		}
	}, 500);

	const addEventListeners = () => {
		window.addEventListener('resize', resizeChart);
	};

	const removeEventListeners = () => {
		window.removeEventListener('resize', resizeChart);
	};

	const onDestroy = () => {
		removeEventListeners();

		if (chartInstance.value) {
			chartInstance.value.dispose();
			chartInstance.value = null;
		}
	};
	onMounted(() => {
		if (!chartInstance.value) {
			initChart();
		}
		addEventListeners();
	});

	// 防止 echarts 页面 keepAlive 时，还在继续监听页面
	onDeactivated(() => {
		onDestroy();
	});

	onUnmounted(() => {
		onDestroy();
	});

	return { chartInstance, setOption };
}
