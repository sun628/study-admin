<template>
	<div>
		<SvgIcon name="music" :class="{ 'muisc-rotate': isPlay }" @click="playMusic()"></SvgIcon>
	</div>
	<music-audio :id="2064033095" ref="MusicAudioRef" class="music-aduio" loop :visible="visible" />
</template>
<script setup lang="ts">
import MusicAudio from '@/components/music-audio/index.vue';
import { HOME_URL } from '@/config';

const route = useRoute();
const isPlay = ref(false);

// 是否显示音乐组件
const visible = computed(() => {
	return route.path === HOME_URL; // 只有在首页才显示音乐组件
});

type MusicAudioType = InstanceType<typeof MusicAudio> | null;

//音乐组件实例
const MusicAudioRef = ref<MusicAudioType>(null);

// 播放音乐
const playMusic = () => {
	isPlay.value = !isPlay.value;
	if (isPlay.value) {
		MusicAudioRef.value?.play();
	} else {
		MusicAudioRef.value?.pause();
	}
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
.music-aduio {
	top: 100px;
	right: 10px;
	height: calc(100% - 120px);
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
