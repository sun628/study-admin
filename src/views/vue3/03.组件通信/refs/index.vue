<template>
	<el-row>
		<doc title="父组件" class="flex-1">
			<highlight :code="refCode" />
			<el-button type="primary" class="mb-2" @click="openChildDialog">点击打开子组件的弹窗</el-button>
			<highlight :code="refCode1" />
		</doc>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<child ref="childRef" />
	</el-row>
</template>
<script setup lang="ts">
import child from './child.vue';
import type { Ref } from 'vue';
import { refCode, refCode1 } from './code';
const childRef: Ref<InstanceType<typeof child> | null> = ref(null);

const openChildDialog = () => {
	childRef.value?.openDialog();
};
</script>

<style scoped lang="scss"></style>
