<template>
	<div class="home">
		<el-image :src="homIcon"></el-image>
		<div class="content">
			<!-- <iframe
				frameborder="no"
				border="0"
				marginwidth="0"
				marginheight="0"
				width="330"
				height="86"
				src="//music.163.com/outchain/player?type=2&id=1463165983&auto=1&height=66"
			></iframe> -->
		</div>
	</div>

	<!-- <audio ref="audio" controls :src="SongUrl"></audio> -->
</template>
<script setup lang="ts">
import homIcon from '@/assets/images/logo.jpg';
import { useMusicApi } from '@/api/music';
const { getsongListApi } = useMusicApi();
const SongUrl =
	'https://m804.music.126.net/20230316155852/852a678216338166bd5b0193483d0f7c/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/22671932825/d020/fca0/f4a5/9a3a9cd316ec86ba349c997e5259901d.mp3?authSecret=00000186e956e8dd12bb0aa463571245';

//获取音乐歌词
const getsongList = async () => {
	const id = 412902950;
	const res = await getsongListApi(id);
	console.log(111, res);
	//music.163.com/api/song/lyric?id=412902950&lv=1&kv=1&tv=-1
};
getsongList();
</script>

<style scoped lang="scss">
.home {
	width: calc(100% + 24px);
	height: calc(100% + 20px);
	position: relative;
	margin: -10px -12px;
	:deep(.el-image) {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}
	.content {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
}
</style>
