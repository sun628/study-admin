<template>
	<el-table :data="data" v-bind="$attrs">
		<el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
			<template v-if="$slots[column.prop]" #default="scope">
				<slot :name="column.prop" v-bind="scope"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts">
import { ElTable } from 'element-plus';
interface TableData {
	[propName: string]: any;
}
interface Column {
	prop: string;
	label: string;
	[propName: string]: any;
}

defineProps<{
	data: TableData[];
	columns: Column[];
}>();

//获取用户信息
</script>

<style scoped lang="scss"></style>
