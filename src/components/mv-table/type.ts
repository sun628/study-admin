// 列配置项
export type TableColumn = {
	prop: string;
	label: string;
	[propName: string]: any;
};

export type TableProps<T, U> = {
	// 数据源
	tableData: T[];
	// 渲染列配置项
	columns: U[] extends TableColumn[] ? U[] : TableColumn[];
	pagination?:
		| boolean
		| {
				currentPage: number; // 当前页数
				pageSize: number; // 每页显示条数
				total: number; // 总条数
				disabled?: boolean; // 是否禁用分页
				pageSizeOptions?: number[]; // 指定每页可以显示多少条
				onChange?: (current: number, size: number) => void;
				onCurrentChange?: (current: number, size: number) => void;
				onSizeChange?: (current: number, size: number) => void;
		  };
};
