<template>
	<mv-table :table-data="tableData" :columns="columns">
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
interface User {
	date: string;
	name: string;
	address: string;
}

const tableData: User[] = [
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
];

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

// 假设这是您的初始数组，您希望从中推导 prop 类型
const initialColumns = [
	{ prop: 'date', label: '日期' },
	{ prop: 'name', label: '姓名' },
	{ prop: 'address', label: '地址' },
];

// 定义一个辅助类型，用于从数组中提取 prop 的类型
type ExtractPropType<T extends { prop: any }> = T['prop'];

// 定义一个泛型函数，它接受您的数组并仅用于推导类型
// 这个函数实际上并不需要执行任何操作
function createColumns<T extends { prop: any }>(columns: T[]): T[] {
	return columns;
}

// 使用您的初始数组调用这个函数，TS 将推导出 prop 的类型
const columns1 = createColumns(initialColumns);

// 现在，您可以定义一个新的类型，该类型的 prop 属性被约束为 initialColumns 中所有 prop 值的类型
type Column = {
	prop: ExtractPropType<(typeof columns1)[number]>;
	label: string;
	width?: string;
};

// 示例：这个对象符合 Column 类型
const newColumn: Column = {
	prop: 'date22', // 正确，'date' 是 initialColumns 中一个 prop 的值
	label: '新日期',
};
</script>

<style scoped lang="scss"></style>
