<template>
	<div>
		<svg-icon name="music" :class="{ 'muisc-rotate': themeConfig.audio }" @click="playMusic()"></svg-icon>
	</div>
	<music-audio ref="MusicAudioRef" class="music-aduio" loop :visible="false" />
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global';
import MusicAudio from '@/components/music-audio/index.vue';
import { HOME_URL } from '@/config';

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const route = useRoute();

// 是否显示音乐组件
const visible = computed(() => {
	return route.path === HOME_URL; // 只有在首页才显示音乐组件
});

//音乐组件实例
const MusicAudioRef = ref<HTMLAudioElement | null>(null);

// 播放音乐
const playMusic = () => {
	themeConfig.value.audio = !themeConfig.value.audio;
	try {
		if (themeConfig.value.audio) {
			MusicAudioRef.value?.play();
		} else {
			MusicAudioRef.value?.pause();
		}
	} catch (error) {
		console.log(22, error);
		// const autoPlayAfterClick = () => {
		// 	if (!MusicAudioRef.value) return console.error('未获取到音乐组件实例');
		// 	MusicAudioRef.value.play();
		// 	document.removeEventListener('click', autoPlayAfterClick);
		// };
		// document.addEventListener('click', autoPlayAfterClick);
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
