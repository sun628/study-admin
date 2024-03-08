<template>
	<el-table :data="tableData" v-bind="$attrs">
		<el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
			<template v-if="$slots[column.prop]" #default="scope">
				<slot :name="column.prop" v-bind="scope"></slot>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup lang="ts" generic="T, U extends TableColumn">
import { TableColumn, TableProps } from './type';
defineOptions({
	name: 'MvTable',
});

const props = withDefaults(defineProps<TableProps<T, U>>(), {
	tableData: () => [],
	columns: () => [],
});
const { tableData, columns } = toRefs(props);

// 使用映射类型从数组中提取 prop 值的联合类型
type PropUnion = (typeof columns.value)[number]['prop'];

// 动态生成的 Slots 类型
type Slots<PropUnion extends string> = {
	[K in PropUnion]: (props: { row: T; $index: number }) => any;
};
defineSlots<Slots<PropUnion>>();
</script>
