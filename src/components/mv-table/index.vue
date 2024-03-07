<template>
	<el-table :data="tableData" v-bind="$attrs">
		<el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
			<template v-if="$slots[column.prop]" #default="scope">
				<slot :name="column.prop" v-bind="scope"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts">
defineOptions({
	name: 'MvTable',
});

interface TableData {
	[propName: string]: any;
}

interface Column {
	prop: string;
	label: string;
	[propName: string]: any;
}

export interface Props {
	tableData: TableData[];
	columns: Column[];
}

const props = withDefaults(defineProps<Props>(), {
	tableData: () => [],
	columns: () => [],
});

const { tableData, columns } = toRefs(props);
</script>

<style scoped lang="scss"></style>
