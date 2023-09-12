<template>
	<div id="home" class="home">
		<div class="layer1"></div>
		<div class="layer2"></div>
		<div class="layer3"></div>
		<div class="layer4"></div>
		<div class="layer5"></div>
		<div class="title">
			<span>你</span>
			<span>就</span>
			<span>像&nbsp;</span>
			<span>天</span>
			<span>外</span>
			<span>来</span>
			<span>物</span>
			<span>一</span>
			<span>样</span>
		</div>
		<ul></ul>
	</div>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global';
import { useTheme } from '@/hooks/useTheme';
import { getLyricApi } from '@/api/music';
const themeConfig = computed(() => globalStore.themeConfig);
const globalStore = useGlobalStore();
const { useDark } = useTheme();
const isDark = themeConfig.value.isDark;
useDark(true);
function handleBeforeUnload(event: Event) {
	if (!isDark) useDark(false);
}
window.addEventListener('beforeunload', handleBeforeUnload);
onBeforeUnmount(() => {
	if (!isDark) useDark(false);
	window.removeEventListener('beforeunload', handleBeforeUnload);
});

// 歌词
let lyrics: any[] = [];
const getLyric = async () => {
	const res = await getLyricApi({ id: 436346833 });
	console.log('getLyric', res.lyric);
	// lyrics = res.lyric.split('\n');
};
getLyric();

/**
 * @description 滚动歌词
 **/
function rollingLyric() {
	console.log(222222222);
	let expressions = [];
	let times = [];
	const reg = /\[(\d{2}:\d{2}\.\d{2})\].*/;
	lyrics.forEach((line) => {
		if (reg.exec(line) !== null) {
			console.log(reg.exec(line));
			const arr = reg.exec(line);
			// times.push(arr[1]);
		}
	});

	// 处理歌词行
}
rollingLyric();
</script>

<style lang="scss">
#home {
	background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
	width: 100%;
	height: 100%;
	user-select: none;
	.title {
		position: fixed;
		top: 50%;
		left: 0;
		right: 0;
		text-align: center;
		font-family: 'lato', sans-serif;
		font-weight: 500;
		font-size: 50px;
		letter-spacing: 10px;
		margin-top: -60px;
		span {
			color: transparent;
			animation: spread 1s ease-in-out infinite alternate;
			background: linear-gradient(#fff, #38495a);
			background-clip: text;
			-webkit-background-clip: text;
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
	#home .title {
		span:nth-child(#{$i}) {
			animation-delay: ($i - 1) * 0.1s;
		}
	}
}
</style>
