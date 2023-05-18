<template>
	<div>
		<el-table ref="ElTabeRef" :data="data" style="width: 100%" v-bind="$attrs">
			<!-- <template #empty>
			<slot name="empty"></slot>
		</template> -->
			<template v-for="(value, name) in $slots" :key="name" #[name]="slotData">
				<slot :name="name" v-bind="slotData || {}"></slot>
			</template>
		</el-table>
	</div>
</template>
<script setup lang="ts">
import type { ElTable } from 'element-plus';
export interface TableProps {
	data: object[]; // table的数据
}

interface instanceProps {
	[key: string]: any;
}

const props = withDefaults(defineProps<TableProps>(), {
	data: () => [],
});
const proxy = getCurrentInstance()?.proxy;
const ElTabeRef = ref();
// let instance: instanceProps = {};
onMounted(() => {
	//这种写法会报警告，需要测试
	// const entries = Object.entries(ElTabeRef.value as InstanceType<typeof ElTable>);
	// for (const [key, value] of entries) {
	// 	instance[key] = value;
	// }
	// console.log('instance', instance);
});
</script>

<!-- <script lang="ts">
export default {
	props: {
		tableData: {
			type: Array,
			default: () => [],
		},
	},
	mounted() {
		console.log(222, this.$refs.ProTabe);
		const entries = Object.entries(this.$refs.ProTabe as any);
		console.log('entries', typeof entries);
		for (const [key, value] of entries) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			this[key] = value;
		}
	},
};
</script> -->

<style scoped lang="scss"></style>
