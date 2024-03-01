<template>
	<div class="audio">
		<SvgIcon name="music" :class="{ 'muisc-rotate': isPlay }" @click="playMusic()"></SvgIcon>
		<music-audio id="music-audio" ref="MusicAudioRef" :music-id="2127872173" loop />
	</div>
</template>
<script setup lang="ts">
import MusicAudio from '@/components/music-audio/index.vue';

const isPlay = ref(false);

type MusicAudioType = InstanceType<typeof MusicAudio> | null;

//音乐组件实例
const MusicAudioRef = ref<MusicAudioType>(null);

// 播放音乐
const playMusic = () => {
	isPlay.value = !isPlay.value;
	if (MusicAudioRef.value === null) {
		isPlay.value = false;
		return;
	}
	isPlay.value ? MusicAudioRef.value.play() : MusicAudioRef.value.pause();
};
</script>

<style scoped lang="scss">
.icon-music {
	font-size: 20px;
	color: var(--el-color-primary);
	cursor: pointer;
}
.muisc-rotate {
	animation: rotation 8s linear infinite;
}

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(-360deg);
	}
}
</style>
