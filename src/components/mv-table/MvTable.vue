<template>
	<div class="mv-table">
		<el-table :data="data" v-bind="$attrs">
			<template v-if="columns">
				<el-table-column v-for="column in columns" :key="column.prop" v-bind="column">
					<template v-if="$slots[column.prop]" #default="scope">
						<slot :name="column.prop" v-bind="scope"></slot>
					</template>
				</el-table-column>
			</template>
			<template v-if="isEmpty(columns)" #default="scope">
				<slot v-bind="scope"></slot>
			</template>
		</el-table>

		<el-pagination
			v-if="pagination"
			v-bind="pagination"
			v-model:current-page="pagination.currentPage"
			v-model:page-size="pagination.pageSize"
			:layout="pageLayout"
			:total="pagination.total"
			class="pagination"
		>
			<slot name="pagination"></slot>
		</el-pagination>
	</div>
</template>
<script setup lang="ts" generic="T, U extends TableColumn">
import { isEmpty } from '@/utils/is';
import { TableColumn, TableProps, PaginationProps } from './type';

const props = withDefaults(defineProps<TableProps<T, U>>(), {
	data: () => [],
	columns: () => [],
});

const { data, columns } = toRefs(props);

const pagination = defineModel<PaginationProps>('pagination', {
	default: () => undefined,
});

const pageLayout = computed(() => pagination.value?.layout || 'total, prev, pager, next, sizes, jumper');

// 使用映射类型从数组中提取 prop 值的联合类型
type PropUnion = (typeof columns.value)[number]['prop'];

// 动态生成的 Slots 类型
type Slots<PropUnion extends string> = {
	[K in PropUnion]: (props: { row: T; $index: number }) => any;
} & {
	pagination?: (props: object) => any;
};
defineSlots<Slots<PropUnion>>();
</script>
<style scoped lang="scss">
.pagination {
	margin-top: 10px;
	padding-left: 10px;
}
</style>
