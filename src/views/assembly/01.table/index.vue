<template>
	<mv-table :table-data="tableData" :columns="columns">
		<template #operation="scope">
			<el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
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
</script>

<style scoped lang="scss"></style>
