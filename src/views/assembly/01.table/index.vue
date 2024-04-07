<template>
	<div class="assembly-table">
		<doc title="属性">
			<mv-table v-model:pagination="pagination" :data="tableData" :columns="columns" :row-class-name="tableRowClassName">
				<template #type="{ row }">
					<el-tag>{{ row.type }}</el-tag>
				</template>
				<template #default="{ row }">
					<span>{{ row.default || '—' }}</span>
				</template>
				<template #operation="{ row, $index }">
					<el-button size="small" type="primary" @click="handleEdit($index, row)">编辑</el-button>
				</template>

				<template #date="{ row }">
					<span>{{ row.property }}</span>
				</template>
			</mv-table>
		</doc>
	</div>
</template>

<script setup lang="ts">
import MvTable, { PaginationProps } from '@/components/mv-table';
defineOptions({
	name: 'AssemblyTable',
});

interface User {
	property: string;
	description: string;
	type: string;
	default?: string;
}
const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
	if (rowIndex % 2 === 0) {
		return 'warning-row';
	} else return 'success-row';
};

const columns = [
	{
		prop: 'property',
		label: '属性名',
		'min-width': 200,
	},
	{
		prop: 'description',
		label: '说明',
		'min-width': 400,
	},
	{
		prop: 'type',
		label: '类型',
	},
	{
		prop: 'default',
		label: '默认值',
	},
	{
		prop: 'operation',
		label: '操作',
	},
];
const tableData = ref<User[]>([
	{
		property: '表格props透传',
		description: '使用方式与 el-table 保持一致,支持插槽和columns配置的方式',
		type: '——',
	},
	{
		property: 'v-model:pagination',
		description: '使用方式与 el-pagination 保持一致',
		type: 'PaginationProps',
	},
]);

const pagination = reactive<PaginationProps>({
	currentPage: 1,
	pageSize: 10,
	total: 999,
	layout: 'total, prev, pager, next, sizes, jumper',
	background: true, // 是否显示背景色
	onSizeChange: (val: number) => onSizeChange(val), // 改变每页数量时更新显示
	onCurrentChange: (val: number) => onCurrentChange(val), // 改变页码时更新显示
	onChange: (current: number, pageSize: number) => onPageChange(current, pageSize), // current-page 或 page-size 更改时触发
});

/**
 * @description 改变每页数量时更新显示
 * @param {numebr} pageSize - 每页数量
 **/
const onSizeChange = (pageSize: number) => {
	console.log('🚀 ~ onSizeChange ~ pageSize', pageSize);
};

/**
 * @description 改变页码时更新显示
 * @param {number} current - 当前页码
 **/
const onCurrentChange = (current: number) => {
	console.log('🚀 ~ onCurrentChange ~ current', current);
};

/**
 * @description current-page 或 page-size 更改时触发
 * @param {number} page - 当前页码
 * @param {number} pageSize - 每页数量
 **/
const onPageChange = (page: number, pageSize: number) => {
	console.log('🚀 ~ onPageChange ~ page, pageSize', page, pageSize);
};

const handleEdit = (index: number, row: User) => {
	console.log(index, row);
	console.log('pagination', pagination);
};
</script>

<style scoped lang="scss">
.assembly-table {
	width: 100%;
	height: 100%;
	background-color: var(--el-bg-color);
}
:deep(.el-table) {
	.warning-row {
		--el-table-tr-bg-color: var(--el-color-warning-light-9);
	}
	.success-row {
		--el-table-tr-bg-color: var(--el-color-success-light-9);
	}
}
</style>
