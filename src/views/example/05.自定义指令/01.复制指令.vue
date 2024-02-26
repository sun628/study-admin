<template>
	<div class="w-full h-full flex flex-col items-center">
		<span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
		<div class="box-content">
			<el-input v-model="data" placeholder="请输入内容" style="width: 500px">
				<template #append>
					<el-button v-copy="data">复制</el-button>
				</template>
			</el-input>
		</div>
	</div>
</template>

<script setup lang="ts" name="copyDirect">
import { ref } from 'vue';

const data = ref<string>('我是被复制的内容 🍒 🍉 🍊');
</script>

<style scoped lang="scss">
.text {
	margin: 20px 0 30px;
	font-size: 23px;
	font-weight: 700;
	color: var(--el-text-color-regular);
}
</style>
