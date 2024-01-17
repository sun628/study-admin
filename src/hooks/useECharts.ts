import { shallowRef, onMounted, onDeactivated, toRef } from 'vue';
// import { useDebounceFn } from '@vueuse/core';
import { resizeObserverManager } from '@/utils/ResizeObserverManager';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, GaugeChart } from 'echarts/charts';
import type { XAXisComponentOption, YAXisComponentOption, EChartsOption, SetOptionOpts } from 'echarts'; // 导入 EChartsOption 类型
import {
	TitleComponent,
	LegendComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	ToolboxComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { ECElementEvent, SelectChangedPayload, HighlightPayload } from 'echarts/types/src/util/types';

import {
	TitleComponentOption,
	TooltipComponentOption,
	GridComponentOption,
	DatasetComponentOption,
	AriaComponentOption,
	AxisPointerComponentOption,
	LegendComponentOption,
} from 'echarts/components'; // 组件
import {
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	LineSeriesOption,
	PieSeriesOption,
	FunnelSeriesOption,
	GaugeSeriesOption,
} from 'echarts/charts';

type SetOptionFunction = {
	(options: EChartsOption, notMerge?: boolean, lazyUpdate?: boolean): void;
	(options: EChartsOption, opts?: SetOptionOpts): void;
};

/**
 * @description 使用 Echarts (添加图表响应式)
 * @param {Element} chartRef Echarts实例 (必传)
 * @param {EChartsOption} options 图表配置项参数 (可选) 不传的话需要在外部通过 setOption 设置
 * @returns {Object} chartInstance 实例 和 setOption 设置图表配置项
 * @example const {  setOption } = useECharts(myChart, options);
 * */
export default function useECharts(chartRef: Ref<HTMLElement | null>, options?: EChartsOption) {
	echarts.use([
		BarChart,
		LineChart,
		BarChart,
		PieChart,
		GaugeChart,
		TitleComponent,
		LegendComponent,
		TooltipComponent,
		GridComponent,
		DatasetComponent,
		TransformComponent,
		LabelLayout,
		UniversalTransition,
		CanvasRenderer,
		ToolboxComponent,
	]);
	const isInitialResize = ref(true); // 新增标志，判断是否是首次触发ResizeObserver
	const chartInstance = shallowRef<echarts.ECharts | null>(null);
	const initChart = () => {
		if (!chartRef.value) {
			console.error('Echarts container element is not defined.');
			return;
		}
		chartInstance.value = echarts.getInstanceByDom(chartRef.value) || echarts.init(chartRef.value);
		options && chartInstance.value?.setOption(options);
		resizeObserverManager.observe(chartRef.value, resizeChart);
	};

	/**
	 * @description 设置配置项
	 * @param {echarts.EChartsOption} options 图表配置项参数
	 * @param {boolean | echarts.SetOptionOpts} notMergeOrOpts 是否合并配置项 ; 如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
	 * @param {boolean} lazyUpdate 在设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。如果为 true，则会在下一个 animation frame 中，才更新图表。
	 * @param {boolean} silent 阻止调用 setOption 时抛出事件，默认为 false，即抛出事件。
	 */
	const setOption: SetOptionFunction = (options: EChartsOption, notMergeOrOpts?: boolean | SetOptionOpts, lazyUpdate?: boolean) => {
		if (!chartInstance.value) {
			return console.warn('Echarts instance is not defined.');
		}
		if (typeof notMergeOrOpts === 'boolean') {
			chartInstance.value.setOption(options, notMergeOrOpts, lazyUpdate);
		} else {
			chartInstance.value.setOption(options, notMergeOrOpts || {});
		}
	};

	const resizeChart = () => {
		try {
			if (isInitialResize.value) {
				isInitialResize.value = false; // 首次触发后设置为false
				return; // 忽略首次触发
			}
			chartInstance.value?.resize();
		} catch (error) {
			console.error('Error resizing chart:', error);
		}
	};
	const cleanup = () => {
		if (chartRef.value) {
			resizeObserverManager.unobserve(chartRef.value, resizeChart);
		}
		if (chartInstance.value) {
			chartInstance.value.dispose();
			chartInstance.value = null;
		}
	};

	onMounted(initChart);
	onBeforeUnmount(cleanup); // 必须在 onBeforeUnmount 钩子中调用 cleanup 函数，否则chartRef会被置为 null
	onDeactivated(cleanup);
	return { chartInstance: toRef(chartInstance), setOption };
}

type Options = LineECOption | BarECOption | PieECOption | FunnelOption;

type BaseOptionType =
	| XAXisComponentOption
	| YAXisComponentOption
	| TitleComponentOption
	| TooltipComponentOption
	| LegendComponentOption
	| GridComponentOption;

type BaseOption = echarts.ComposeOption<BaseOptionType>;

type LineECOption = echarts.ComposeOption<LineSeriesOption | BaseOptionType>;

type BarECOption = echarts.ComposeOption<BarSeriesOption | BaseOptionType>;

type PieECOption = echarts.ComposeOption<PieSeriesOption | BaseOptionType>;

type FunnelOption = echarts.ComposeOption<FunnelSeriesOption | BaseOptionType>;

type GaugeECOption = echarts.ComposeOption<GaugeSeriesOption | GridComponentOption>;

type ChartType = 'bar' | 'line' | 'pie' | 'gauge';

// echarts事件
namespace ChartsEvents {
	// 鼠标事件类型
	type MouseEventType = 'click' | 'dblclick' | 'mousedown' | 'mousemove' | 'mouseup' | 'mouseover' | 'mouseout' | 'globalout' | 'contextmenu'; // 鼠标事件类型
	type MouseEvents = {
		[key in Exclude<MouseEventType, 'globalout' | 'contextmenu'> as `chart${Capitalize<key>}`]: ECElementEvent;
	};
	// 其他的事件类型极参数
	interface Events extends MouseEvents {
		globalout: ECElementEvent;
		contextmenu: ECElementEvent;
		selectchanged: SelectChangedPayload;
		highlight: HighlightPayload;
		legendselected: {
			// 图例选中后的事件
			type: 'legendselected';
			// 选中的图例名称
			name: string;
			// 所有图例的选中状态表
			selected: {
				[name: string]: boolean;
			};
		};
		// ... 其他类型的事件在这里定义
	}

	// echarts所有的事件类型
	type EventType = keyof Events;
}

export type { BaseOption, ChartType, LineECOption, BarECOption, Options, PieECOption, FunnelOption, GaugeECOption, EChartsOption, ChartsEvents };
