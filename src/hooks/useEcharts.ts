import { shallowRef, onMounted, onUnmounted, onDeactivated, toRefs } from 'vue';
import * as echarts from 'echarts';
import { useDebounceFn } from '@vueuse/core';

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} chartRef Echarts实例 (必传)
 * @returns {Object} chartInstance 实例
 * @returns {function} setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart);
 * */
export default function useECharts(chartRef: Ref<HTMLElement>) {
	const chartInstance = shallowRef<echarts.ECharts | null>(null);

	const initChart = () => {
		try {
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
		chartInstance.value?.setOption(options, true);
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

	return { ...toRefs({ chartInstance, setOption }) };
}
