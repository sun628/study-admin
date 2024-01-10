import { shallowRef, onMounted, onUnmounted, onDeactivated, toRef } from 'vue';
import * as echarts from 'echarts';
import { useDebounceFn } from '@vueuse/core';

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} chartRef Echarts实例 (必传)
 * @returns {Object} chartInstance 实例 和 setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart);
 * */
export default function useECharts(chartRef: Ref<HTMLElement | null>): {
	chartInstance: Ref<echarts.ECharts | null>;
	setOption: (options: echarts.EChartsOption) => void;
} {
	const chartInstance = shallowRef<echarts.ECharts | null>(null);

	const initChart = () => {
		try {
			if (!chartRef.value) {
				throw new Error('Echarts instance is not defined.');
			}
			chartInstance.value = echarts.getInstanceByDom(chartRef.value) || echarts.init(chartRef.value);
		} catch (error) {
			console.error('Error initializing chart:', error);
		}
	};

	/**
	 * @description 设置配置项
	 * @param {Object} 图表配置项参数
	 */
	const setOption = (options: echarts.EChartsOption) => {
		onMounted(() => {
			chartInstance.value?.setOption(options);
		});
	};

	const resizeChart = useDebounceFn(() => {
		chartInstance.value?.resize();
	}, 500);

	const addEventListeners = () => {
		window.addEventListener('resize', resizeChart);
	};

	const removeEventListeners = () => {
		window.removeEventListener('resize', resizeChart);
	};

	const onDestroy = () => {
		removeEventListeners();
		chartInstance.value?.dispose();
		chartInstance.value = null;
	};

	onMounted(initChart);
	onMounted(addEventListeners);
	onUnmounted(onDestroy);
	onDeactivated(onDestroy);

	return { chartInstance: toRef(chartInstance), setOption };
}
