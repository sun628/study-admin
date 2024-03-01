<template>
	<div class="card content-box">
		<span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
		<el-button v-throttle="throttleClick" type="primary">节流按钮 (每隔1S秒后执行)</el-button>
	</div>
</template>

<script setup lang="ts" name="throttleDirect">
import { ElMessage } from 'element-plus';
const throttleClick = () => {
	ElMessage.success('我是节流按钮触发的事件 🍍🍓🍌');
};
</script>

<style scoped lang="scss">
.text {
	margin: 20px 0 30px;
	font-size: 23px;
	font-weight: 700;
	color: var(--el-text-color-regular);
}
</style>
