<template>
	<el-row>
		<doc title="父组件" class="flex-1">
			<el-button type="primary" @click="openChildDialog">点击打开子组件的弹窗</el-button>
		</doc>
		<el-divider>
			<el-icon><star-filled /></el-icon>
		</el-divider>
		<child ref="childRef" />
	</el-row>
</template>
<script setup lang="ts">
import child from './child.vue';
const childRef = ref();

const openChildDialog = () => {
	childRef.value.openDialog();
};
onMounted(() => {
	console.log('childRef---openDialog', childRef.value.openDialog);
});
</script>

<style scoped lang="scss"></style>
