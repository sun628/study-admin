<template>
	<div
		v-waterMarker="{ text: 'Watermark Direct 水印指令水印指令水印指令水印指令水印指令水印指令水印指令', textColor: 'rgba(180, 180, 180, 0.6)' }"
		class="w-full h-full flex"
	>
		<span class="text w-full text-center">水印指令 🍇🍇🍇🍓🍓🍓</span>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'WatermarkDirect',
});
</script>

<style scoped lang="scss">
.text {
	margin: 20px 0 30px;
	font-size: 23px;
	font-weight: 700;
	color: var(--el-text-color-regular);
}
</style>
