<template>
	<doc title="子组件">
		<p class="tip">TIP:默认情况下，setup 组件是关闭的，通过模板 ref 获取组件的公共实例。如果需要公开，需要通过defineExpose API 公开。</p>
		<highlight :code="childRefCode" />
	</doc>
	<el-dialog v-model="dialogVisible" title="我是子组件的弹窗" width="30%" center>
		<span> It should be noted that the content will not be aligned in center by default </span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { childRefCode } from './code';
let dialogVisible = ref(false);

const openDialog = () => {
	dialogVisible.value = true;
};
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss">
.child {
	width: 100px;
	height: 100px;
	background-color: red;
}
</style>
