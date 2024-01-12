import { shallowRef, onMounted, onUnmounted, onDeactivated, toRef } from 'vue';
import * as echarts from 'echarts';
import { useDebounceFn } from '@vueuse/core';

type SetOptionFunction = {
	(options: echarts.EChartsOption, notMerge?: boolean, lazyUpdate?: boolean): void;
	(options: echarts.EChartsOption, opts?: echarts.SetOptionOpts): void;
};

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} chartRef Echarts实例 (必传)
 * @returns {Object} chartInstance 实例 和 setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart);
 * */
export default function useECharts(chartRef: Ref<HTMLElement | null>): {
	chartInstance: Ref<echarts.ECharts | null>;
	setOption: SetOptionFunction;
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
	 * @param {echarts.EChartsOption} options 图表配置项参数
	 * @param {boolean | echarts.SetOptionOpts} notMergeOrOpts 是否合并配置项 ; 如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
	 * @param {boolean} lazyUpdate 在设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。如果为 true，则会在下一个 animation frame 中，才更新图表。
	 * @param {boolean} silent 阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
	 */
	const setOption: SetOptionFunction = (options: echarts.EChartsOption, notMergeOrOpts?: boolean | echarts.SetOptionOpts, lazyUpdate?: boolean) => {
		onMounted(() => {
			if (typeof notMergeOrOpts === 'boolean') {
				chartInstance.value?.setOption(options, notMergeOrOpts, lazyUpdate);
			} else {
				chartInstance.value?.setOption(options, notMergeOrOpts || {});
			}
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
