<template>
	<doc title="父组件" class="flex-1">
		<el-button type="primary" @click="count++">更新传给子组件的数据</el-button>
		<h2>count：{{ count }}</h2>
	</doc>
	<el-divider>
		<el-icon><star-filled /></el-icon>
	</el-divider>
	<doc title="子组件" class="flex-1">
		<child :count="count" @update-count="updateCount"></child>
	</doc>
</template>

<script setup lang="ts">
import Child from './child.vue';
let count = ref(0);

const updateCount = (val: number) => {
	count.value = val;
};
</script>
