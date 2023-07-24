<template>
	<el-table ref="ElTabeRef" :data="data" style="width: 100%" v-bind="$attrs">
		<!-- <template #empty>
			<slot name="empty"></slot>
		</template> -->
		<template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
			<slot :name="name" v-bind="slotData || {}"></slot>
		</template>
	</el-table>
</template>
<script setup lang="ts">
export interface TableProps {
	data: Array<object>; // table的数据
}
const props = withDefaults(defineProps<TableProps>(), {
	data: (): Array<object> => [],
});
const { data } = toRefs(props);
const ElTabeRef = ref();
</script>

<style scoped lang="scss"></style>
