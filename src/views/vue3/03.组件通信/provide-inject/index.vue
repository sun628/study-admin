<template>
	<el-row>
		<doc title="父组件" class="flex-1"></doc>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<child ref="childRef" />
	</el-row>
</template>

<script setup lang="ts">
import child from './child.vue';

let parentDataValue = ref(11111);
provide('parentData', parentDataValue);
</script>

<style scoped lang="scss"></style>
