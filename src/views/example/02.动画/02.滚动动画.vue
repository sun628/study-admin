<template>
	<div class="scrolling-animations">
		<el-row class="flex-center mb-3">
			<el-col :span="12" class="digital-container flex-center mb-3">
				<!-- 数字滚动 -->
				<DigitalScroll ref="DigitalScrollRef" :value="numberVal" :loop="true" :count="6" />
			</el-col>
		</el-row>
		<el-row class="flex-center mb-3">
			<el-col class="flex-center flex-nowrap">
				<span class="whitespace-nowrap">输入数字：</span>
				<el-input-number v-model="numberVal" class="mr-4" />
				<el-button type="primary" @click="start">翻转一圈</el-button>
			</el-col>
		</el-row>
		<el-row class="mb-3">
			<h2>属性</h2>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="name" label="属性名" />
				<el-table-column prop="description" label="说明" />
				<el-table-column prop="type" label="类型" />
				<el-table-column prop="defaultValue" label="默认值" />
			</el-table>
		</el-row>

		<el-row class="mb-3">
			<h2>源代码</h2>
			<Highlight :code="code"></Highlight>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import DigitalScroll from '@/components/digital-scroll/index.vue';
import code from '@/components/digital-scroll/index.vue?raw';
import { useCompRef } from '@/hooks/useCompRef';
const tableData = ref([
	{
		name: 'value',
		description: '数字滚动的值',
		type: 'number',
		defaultValue: 0,
	},
	{
		name: 'colHeight',
		description: '每个数字的高度',
		type: 'number',
		defaultValue: 40,
	},
	{
		name: 'count',
		description: '数字的位数',
		type: 'number',
		defaultValue: 6,
	},
	{
		name: 'loop',
		description: '是否循环滚动',
		type: 'boolean',
		defaultValue: false,
	},
	{
		name: 'digitalsList',
		description: '获取数字列表',
		type: 'Array<number>',
		defaultValue: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`,
	},
]);
const numberVal = ref(0);

// type DigitalScrollType = InstanceType<typeof DigitalScroll>;

const DigitalScrollRef = useCompRef(DigitalScroll);

const start = () => {
	DigitalScrollRef.value?.start();
};
</script>

<style scope lang="scss">
.digital-container {
	background-color: #020b44;
}
</style>
