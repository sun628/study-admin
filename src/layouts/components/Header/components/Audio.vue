<template>
	<svg-icon name="music" :class="{ 'muisc-rotate': playAudio }" @click="rotate()"></svg-icon>
	<!-- <iframe
		frameborder="no"
		border="0"
		marginwidth="0"
		marginheight="0"
		width="330"
		height="86"
		src="//music.163.com/outchain/player?type=2&id=436346833&auto=1&height=66"
	></iframe> -->
</template>
<script setup lang="ts">
const playAudio = ref(false);
const rotate = () => {
	playAudio.value = !playAudio.value;
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
