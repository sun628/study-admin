<template>
	<div class="home">
		<el-image :src="homIcon" class="w-full h-full block"></el-image>
	</div>
</template>
<script setup lang="ts">
import homIcon from '@/assets/images/logo.jpg';
// import { useMusicApi } from '@/api/music';
// const { getsongListApi } = useMusicApi();
//获取音乐歌词
// const getsongList = async () => {
// 	const id = 412902950;
// 	const res = await getsongListApi(id);
// };
// getsongList();
</script>

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
