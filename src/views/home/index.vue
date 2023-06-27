<template>
	<el-card class="home"></el-card>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.home {
	width: 100%;
	height: 100%;
	position: relative;
	:deep(.el-image) {
		object-fit: cover;
		width: calc(100% + 24px);
		height: calc(100% + 20px);
		margin: -10px -12px;
	}
}
</style>
