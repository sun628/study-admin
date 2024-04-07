import exp from 'constants';

// 列配置项
export type TableColumn = {
	prop: string;
	label: string;
	[propName: string]: any;
};

export type PaginationProps = {
	currentPage: number;
	pageSize: number;
	total: number;
	background?: boolean;
	small?: boolean;
	pageCount?: number;
	pagerCount?: 5 | 7 | 9 | 11 | 13 | 15 | 17 | 19 | 21;
	defaultCurrentPage?: number;
	layout?: string;
	onSizeChange?: (pageSize: number) => void;
	onCurrentChange?: (currentPage: number) => void;
	onChange?: (currentPage: number, pageSize: number) => void;
};
export type TableProps<T, U> = {
	// 数据源
	data: T[];
	// 渲染列配置项
	columns?: U[] extends TableColumn[] ? U[] : TableColumn[];
	pagination?: PaginationProps;
};
