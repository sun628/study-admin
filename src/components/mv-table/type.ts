// 列配置项
export type TableColumn = {
	prop: string;
	label: string;
	[propName: string]: any;
};

export type TableProps<T, U extends TableColumn> = {
	// 数据源
	tableData: T[];
	// 渲染列配置项
	columns: U[];
};
