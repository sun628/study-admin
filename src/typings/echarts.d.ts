import { XAXisComponentOption, YAXisComponentOption } from 'echarts';

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

type EChartsOption = echarts.EChartsOption;

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

export { BaseOption, ChartType, LineECOption, BarECOption, Options, PieECOption, FunnelOption, GaugeECOption, EChartsOption, ChartsEvents };
