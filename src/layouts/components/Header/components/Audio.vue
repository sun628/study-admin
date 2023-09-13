<template>
	<div class="muisc-aduio">
		<svg-icon name="music" :class="{ 'muisc-rotate': playMusic }" @click="play()"></svg-icon>
	</div>
</template>
<script setup lang="ts">
import mittBus from '@/hooks/useMitt';
const playMusic = ref(false);
const play = () => {
	playMusic.value = !playMusic.value;
	mittBus.emit('mitt-playMusic', playMusic.value);
};

const handleTimeUpdate = (e: Event) => {
	const currentTime = (e.target as HTMLAudioElement).currentTime;
	console.log('handleTimeUpdate', currentTime);
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
