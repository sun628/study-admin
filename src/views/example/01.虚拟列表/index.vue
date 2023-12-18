<template>
	<div class="VirtualList">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<tip title>
						<span class="mr-2">通过<tag>vueuse</tag>的<tag>useVirtualList</tag>实现</span>
						<el-link type="primary">地址</el-link>
					</tip>
					<el-button type="primary" @click="toggleClick">Toggle Even/Odd</el-button>
				</div>
			</template>
			<div class="infinite-list" v-bind="containerProps" style="height: 300px">
				<ul v-bind="wrapperProps">
					<li v-for="item in list" :key="item.index" class="infinite-list-item">
						<span>Row: {{ item.data }}</span>
						<el-button type="primary" @click="item.data++">add</el-button>
					</li>
				</ul>
			</div>
		</el-card>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<Tip title>通过<tag>element-plus</tag>的<tag>Virtualized Table</tag>实现</Tip>
				</div>
			</template>
			<div style="height: 400px">
				<el-auto-resizer>
					<template #default="{ height, width }">
						<el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
					</template>
				</el-auto-resizer>
			</div>
		</el-card>
	</div>
</template>
<script setup lang="ts">
import { useVirtualList, useToggle } from '@vueuse/core';
defineOptions({
	name: 'VirtualList',
});

const [isEven, toggle] = useToggle();
const allItems = Array.from(Array(99999).keys());
const filteredList = computed(() => allItems.filter((i) => (isEven.value ? i % 2 === 0 : i % 2 === 1)));
const toggleClick = () => toggle();
const { list, containerProps, wrapperProps } = useVirtualList(filteredList, {
	itemHeight: 22,
});

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
	Array.from({ length }).map((_, columnIndex) => ({
		...props,
		key: `${prefix}${columnIndex}`,
		dataKey: `${prefix}${columnIndex}`,
		title: `Column ${columnIndex}`,
		width: 150,
	}));

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
	Array.from({ length }).map((_, rowIndex) => {
		return columns.reduce(
			(rowData, column, columnIndex) => {
				rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
				return rowData;
			},
			{
				id: `${prefix}${rowIndex}`,
				parentId: null,
			}
		);
	});

const columns = generateColumns(10);
const data = generateData(columns, 200);
</script>

<style scoped lang="scss">
.infinite-list {
	height: 300px;
	padding: 0;
	margin: 0;
	list-style: none;
	.infinite-list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		height: 50px;
		background: var(--el-color-primary-light-9);
		margin: 10px;
		color: var(--el-color-primary);
	}
	.infinite-list-item + .list-item {
		margin-top: 10px;
	}
}
</style>
