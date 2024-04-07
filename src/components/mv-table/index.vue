<template>
	<div class="mv-table">
		<el-table :data="tableData" v-bind="$attrs">
			<el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
				<template v-if="$slots[column.prop]" #default="scope">
					<slot :name="column.prop" v-bind="scope"></slot>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-if="pagination"
			class="pagination"
			:layout="layout"
			:page-sizes="pagination.pageSizeOptions"
			:current-page="pagination.currentPage"
			:page-size="pagination.pageSize"
			:total="pagination.total"
			:disabled="pagination.disabled"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		>
		</el-pagination>
	</div>
</template>
<script setup lang="ts" generic="T, U extends TableColumn">
import { TableColumn, TableProps } from './type';
defineOptions({
	name: 'MvTable',
});

// const emit = defineEmits<{
// 	onPageChange: [current: number, pageSize: number];
// }>();

const props = withDefaults(defineProps<TableProps<T, U>>(), {
	tableData: () => [],
	columns: () => [],
	pagination: () => {
		return {
			currentPage: 1,
			pageSize: 10,
			total: 0,
			disabled: false,
			hideOnSinglePage: false,
			layout: 'total, prev, pager, next, sizes, jumper',
			pageSizeOptions: [10, 20, 50, 100],
			onChange: () => {},
			onSizeChange: () => {},
			onCurrentChange: () => {},
		};
	},
});
const { tableData, columns, pagination } = toRefs(props);

const layout = computed(() => pagination.value.layout || 'total, prev, pager, next, sizes, jumper');

const handleSizeChange = (pageSize: number) => {
	const { currentPage, onSizeChange, onChange } = pagination.value;
	onSizeChange && onSizeChange(pageSize);
	onChange && onChange(currentPage, pageSize);
};

const handleCurrentChange = (current: number) => {
	const { pageSize, onCurrentChange, onChange } = pagination.value;
	onCurrentChange && onCurrentChange(current);
	onChange && onChange(current, pageSize);
};

// 使用映射类型从数组中提取 prop 值的联合类型
type PropUnion = (typeof columns.value)[number]['prop'];

// 动态生成的 Slots 类型
type Slots<PropUnion extends string> = {
	[K in PropUnion]: (props: { row: T; $index: number }) => any;
};

defineSlots<Slots<PropUnion>>();
</script>
<style scoped lang="scss">
.pagination {
	margin-top: 20px;
}
</style>
