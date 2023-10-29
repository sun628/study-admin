<template>
	<div id="home" class="home">
		<div class="layer1"></div>
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="layer4"></div>
		<div class="layer5"></div>
		<div class="lyrics-title">
			<span v-for="(item, index) in lyricTitle.split('')" :key="index">{{ item }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global';
import { useTheme } from '@/hooks/useTheme';
const themeConfig = computed(() => globalStore.themeConfig);
const globalStore = useGlobalStore();
const { useDark } = useTheme();
const isDark = themeConfig.value.isDark;

const lyricTitle = '你就像天外来物一样';

/**
 * @description 使用暗黑主题
 * @param {boolean} isDark - 是否使用暗黑主题
 **/
useDark(true);

function handleBeforeUnload(event: Event) {
	if (!isDark) useDark(false);
}

onBeforeMount(() => {
	window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
	if (!isDark) useDark(false);
	window.removeEventListener('beforeunload', handleBeforeUnload);
});
</script>

<style lang="scss">
#home {
	background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
	width: 100%;
	height: 100%;
	user-select: none;
	overflow: hidden;
	.lyrics-title {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		font-family: 'lato', sans-serif;
		font-weight: 500;
		font-size: 50px;
		letter-spacing: 10px;
		width: fit-content;
		height: fit-content;
		span {
			color: transparent;
			animation: spread 2s ease-in-out infinite alternate;
			background: linear-gradient(#fff, #38495a);
			background-clip: text;
			-webkit-background-clip: text;
		}
		@include respondTo('mobile') {
			display: flex;
			flex-direction: column;
			right: 10px !important;
			left: auto !important;
			font-size: 28px !important;
		}
	}
	@function getShadow($n) {
		$shadows: '#{random(100)}vw #{random(100)}vh #fff';
		@for $i from 2 through $n {
			$shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
		}
		@return unquote($shadows);
	}
	$duartion: 400s;
	$count: 1000;
	@for $i from 1 through 5 {
		$duartion: floor(calc($duartion / 2));
		$count: floor(calc($count / 2));
		.layer#{$i} {
			$size: #{$i}px;
			$duration: 20s;
			position: fixed;
			width: $size;
			height: $size;
			border-radius: 50%;
			left: 0;
			top: 0;
			box-shadow: getShadow($count);
			animation: moveUp $duration linear infinite;
			&::after {
				content: '';
				position: fixed;
				left: 0;
				top: 100vh;
				width: $size;
				height: $size;
				border-radius: inherit;
				box-shadow: inherit;
			}
		}
	}
}

@keyframes moveUp {
	100% {
		transform: translateY(-100vh);
	}
}
@keyframes spread {
	to {
		color: var(--el-color-primary);
		text-shadow: 20px 0 70px var(--el-color-primary);
	}
}
@for $i from 1 through 9 {
	#home .lyrics-title {
		span:nth-child(#{$i}) {
			animation-delay: ($i - 1) * 0.2s;
		}
	}
}
</style>
