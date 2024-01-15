import { shallowRef, onMounted, onUnmounted, onDeactivated, toRef } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, GaugeChart } from 'echarts/charts';
import type { XAXisComponentOption, YAXisComponentOption, EChartsOption, SetOptionOpts } from 'echarts'; // 导入 EChartsOption 类型
import { TitleComponent, LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components';
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
	]);
	const chartInstance = shallowRef<echarts.ECharts | null>(null);

	const initChart = () => {
		try {
			if (!chartRef.value) {
				throw new Error('Echarts instance is not defined.');
			}
			chartInstance.value = echarts.getInstanceByDom(chartRef.value) || echarts.init(chartRef.value);
			options && chartInstance.value?.setOption(options);
		} catch (error) {
			console.error('Error initializing chart:', error);
		}
	};

	/**
	 * @description 设置配置项
	 * @param {EChartsOption} options 图表配置项参数
	 * @param {boolean |SetOptionOpts} notMergeOrOpts 是否合并配置项 ; 如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
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

	onMounted(() => {
		initChart();
		addEventListeners();
	});
	onUnmounted(onDestroy);
	onDeactivated(onDestroy);

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
