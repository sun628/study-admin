<template>
	<div class="assembly-dialog">
		<el-button type="primary" @click="openDialog">Open Dialog</el-button>
	</div>
</template>

<script setup lang="ts">
import useDialog from './useDialog';
defineOptions({
	name: 'AssemblyDialog',
});
const openDialog = () => {
	console.log('open dialog');
	useDialog(
		{
			title: 'Dialog Title',
			msg: 'Dialog Content',
		},
		(close) => {
			close();
		}
	);
};
</script>

<style scoped lang="less"></style>
