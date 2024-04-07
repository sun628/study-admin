<template>
	<mv-table :table-data="tableData" :columns="columns" :pagination="pagination">
		<template #operation="{ row, $index }">
			<el-button size="small" type="primary" @click="handleEdit($index, row)">编辑</el-button>
		</template>

		<template #date="{ row }">
			<span>{{ row.date }}</span>
		</template>
	</mv-table>
</template>

<script setup lang="ts">
import MvTable from '@/components/mv-table/index.vue';
defineOptions({
	name: 'AssemblyTable',
});

interface User {
	date: string;
	name: string;
	address: string;
}

const tableData = ref<User[]>([
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
]);

const pagination = reactive({
	currentPage: 1,
	pageSize: 10,
	total: 1000,
	layout: 'total, prev, pager, next, sizes, jumper', // 组件布局，子组件名用逗号分隔
	pageSizeOptions: [10, 20, 50, 100], // 每页数量选项
	onSizeChange: (val) => onSizeChange(val), // 改变每页数量时更新显示
	onCurrentChange: (val) => onCurrentChange(val), // 改变页码时更新显示
	onChange: (current, pageSize) => onPageChange(current, pageSize), // current-page 或 page-size 更改时触发
});

/**
 * @description 改变每页数量时更新显示
 * @param {numebr} pageSize - 每页数量
 **/
const onSizeChange = (pageSize: number) => {
	console.log('🚀 ~ onSizeChange ~ pageSize', pageSize);
	pagination.pageSize = pageSize;
};

/**
 * @description 改变页码时更新显示
 * @param {number} current - 当前页码
 **/
const onCurrentChange = (current: number) => {
	console.log('🚀 ~ onCurrentChange ~ current', current);
	pagination.currentPage = current;
};

/**
 * @description current-page 或 page-size 更改时触发
 * @param {number} page - 当前页码
 * @param {number} pageSize - 每页数量
 **/
const onPageChange = (page: number, pageSize: number) => {
	console.log('🚀 ~ onPageChange ~ page, pageSize', page, pageSize);
	pagination.currentPage = page;
	pagination.pageSize = pageSize;
};

const columns = [
	{
		prop: 'date',
		label: '日期',
		width: '180',
	},
	{
		prop: 'name',
		label: '姓名',
		width: '180',
	},
	{
		prop: 'address',
		label: '地址',
	},
	{
		prop: 'operation',
		label: '操作',
	},
];

const handleEdit = (index: number, row: User) => {
	console.log(index, row);
};
</script>

<style scoped lang="scss"></style>
