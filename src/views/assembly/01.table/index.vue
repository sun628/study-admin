<template>
	<div class="assembly-table">
		<Tip>基于el-table 和 el-pagination 二次封装, 支持原有组件的属性 ，事件 ，方法，拓展了<tag>columns</tag>配置项, <tag>pagination</tag>配置项</Tip>
		<mv-table ref="MvTableRef" :data="tableData" :columns="columns" :row-class-name="tableRowClassName">
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

		<!-- 插槽 -->
		<mv-table v-model:pagination="pagination" :data="slotsData">
			<el-table-column prop="name" label="插槽名" />
			<el-table-column prop="description" label="说明" />
			<template #pagination>
				<span class="font-bold">自定义分页内容：</span>
			</template>
		</mv-table>

		<el-button type="primary" @click="getInstance">获取表格实例</el-button>
	</div>
</template>

<script setup lang="ts">
import MvTable, { PaginationProps, MvTableInstance } from '@/components/mv-table';

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
const MvTableRef = ref<MvTableInstance>();

/**
 * @description 获取表格实例
 **/
const getInstance = () => {
	console.log('getInstance----', MvTableRef.value?.getInstance());
	return MvTableRef.value?.getInstance();
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

const slotsData = ref([
	{
		name: 'pagination',
		description: '自定义分页内容 设置文案，需要在 layout 中列出 slot',
	},
]);

const pagination = reactive<PaginationProps>({
	currentPage: 1,
	pageSize: 10,
	total: 999,
	layout: 'slot,total, prev, pager, next, sizes, jumper',
	nextText: '下一页',
	popperClass: 'popper-class',
	background: true, // 是否显示背景色
	onSizeChange: (val: number) => console.log('onSizeChange ~ pageSize', val), // 改变每页数量时更新显示
	onCurrentChange: (val: number) => console.log('onCurrentChange ~ currentPage', val), // 改变页码时更新显示
	onChange: (current: number, pageSize: number) => onPageChange(current, pageSize), // current-page 或 page-size 更改时触发
});

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
