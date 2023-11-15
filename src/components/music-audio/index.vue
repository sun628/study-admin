<template>
	<div v-show="visible" class="lyrics-container">
		<!-- <audio ref="AudioRef" class="hidden" :src="src" controls @timeupdate="handleTimeUpdate"></audio> -->
		<audio ref="AudioRef" class="hidden" :src="src" v-bind="$attrs" @timeupdate="handleTimeUpdate"></audio>
		<div ref="lyricDiv" class="lyricDiv">
			<ul ref="lyric" class="lyrics">
				<li v-for="(item, index) in lyrics" :key="item.uid" class="lyric-line">
					<p :class="currentIndex === index ? 'active' : ''" :data-index="index" :style="currentIndex === index ? gradBg : ''">
						{{ item.lyric }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts">
import { getLyricApi } from '@/api/music/index';
import { useGlobalStore } from '@/store/modules/global';

defineOptions({
	name: 'MusicAudio',
});

interface ILyric {
	time: number;
	lyric: string;
	uid: number;
}

interface IReturnLyric {
	lyric: ILyric[];
	tlyric?: ILyric[];
}

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const AudioRef = ref<HTMLAudioElement | null>(null);
const src = 'https://music.163.com/song/media/outer/url?id=2064033095.mp3';
const gradBg = ref('');
const props = defineProps({
	// 是否显示音乐组件
	visible: {
		type: Boolean,
		default: false,
		required: true,
	},
	// 是否显示动画
	animation: {
		type: Boolean,
		default: true,
	},
});

const lyric = ref<HTMLDivElement | null>(null); // dom -  包含歌词标签的ul，高度很高，主要用于控制transform
const lyricDiv = ref<HTMLDivElement | null>(null); // dom - 高度固定的外层div，主要用于html结构
let requestId = 0; // requestAnimationFrame的id
const currentIndex = ref(-1); // 当前播放歌词行的索引

// 更新歌词
const updateLyrics = () => {
	let currentTime = (AudioRef.value?.currentTime || 0) + 0.6; // 加0.6s是为了让歌词提前显示
	if (currentTime == null || currentTime == undefined) return;
	for (let i = 0; i < lyrics.value.length; i++) {
		const nextLyric = lyrics.value[i + 1]; //获取下一个节点
		if (currentTime >= lyrics.value[i].time && (!nextLyric || currentTime < nextLyric.time)) {
			currentIndex.value = i;
			const time = nextLyric.time - lyrics.value[i].time;
			const cur_time = currentTime - lyrics.value[i].time;
			const percent = (cur_time / time) * 100;
			gradBg.value = `background-image: linear-gradient(to right, ${themeConfig.value.primary} ${percent}%, #fff ${percent}%);`;
			break;
		}
	}
	requestId = requestAnimationFrame(updateLyrics);
};

//播放音乐
const play = () => {
	if (!AudioRef.value) return new Error('AudioRef is not defined or has no value.');
	AudioRef.value
		.play()
		.then(() => {
			console.log('play');
			currentIndex.value = -1;
			if (props.animation) {
				requestId = requestAnimationFrame(updateLyrics);
			}
		})
		.catch((e) => {
			if (globalStore.themeConfig.audio) {
				globalStore.themeConfig.audio = false;
				const autoPlayAfterClick = () => {
					document.removeEventListener('click', autoPlayAfterClick);
					play();
				};
				document.addEventListener('click', autoPlayAfterClick);
			}
			console.log(e);
		});
};

// 停止音乐
const pause = () => {
	AudioRef.value?.pause();
	cancelAnimationFrame(requestId);
	console.log('cancelAnimationFrame', requestId);
};

onMounted(async () => {
	if (globalStore.themeConfig.audio) {
		await nextTick();
		play();
	}
});

const lyrics = ref<Array<ILyric>>([]);

// 监听歌曲播放时间变化
const handleTimeUpdate = (e: Event) => {
	const currentTime = (e.target as HTMLAudioElement).currentTime; //当前播放器时间
	scrollToCurrentLine();
	// for (let i = 0; i < lyrics.value.length; i++) {
	// 	if (currentTime >= lyrics.value[i].time && (!lyrics.value[i + 1] || currentTime < lyrics.value[i + 1].time)) {
	// 		currentIndex.value = i; // 更新当前播放歌词行的索引
	// 		break;
	// 	}
	// }
};

const scrollToCurrentLine = () => {
	if (!lyricDiv.value) return;
	const activeLine = lyricDiv.value.querySelector('.active') as HTMLLIElement;

	if (activeLine) {
		const containerHeight = lyricDiv.value.clientHeight;
		const activeLineOffsetTop = activeLine.offsetTop;
		const activeLineHeight = activeLine.clientHeight;
		if (activeLineOffsetTop < containerHeight / 2) return;
		const scrollY = -(activeLineOffsetTop - containerHeight / 2 + activeLineHeight / 2);
		console.log('scrollY:', scrollY);
		if (lyric.value) {
			lyric.value.style.transform = `translateY(${scrollY}px)`;
		}
	}
};
// 获取歌词歌词
const getLyric = async () => {
	const res = await getLyricApi({ id: 2064033095 });
	formatMusicLyrics(res.lyric);
};

/**
 * @description 格式化歌词
 **/
const formatMusicLyrics = (lyric?: string): IReturnLyric => {
	if (lyric === '') {
		return { lyric: [{ time: 0, lyric: '这个地方没有歌词！', uid: 520520 }] };
	}
	const lyricObjArr: ILyric[] = []; // 最终生成的歌词数组

	// 将歌曲字符串变成数组，数组每一项就是当前歌词信息
	const lineLyric: any = lyric?.split(/\n/);

	// 匹配中括号里正则的
	const regTime = /\d{2}:\d{2}.\d{2,3}/;

	// 循环遍历歌曲数组
	for (let i = 0; i < lineLyric?.length; i++) {
		if (lineLyric[i] === '') continue;
		const time: number = formatLyricTime(lineLyric[i].match(regTime)[0]);
		if (lineLyric[i].split(']')[1] !== '') {
			lyricObjArr.push({
				time: time,
				lyric: lineLyric[i].split(']')[1],
				uid: parseInt(Math.random().toString().slice(-6)),
			});
		}
	}
	lyrics.value = lyricObjArr;
	return {
		lyric: lyricObjArr,
	};
};

/**
 * @description 格式化时间
 **/
const formatLyricTime = (time: string) => {
	const regMin = /.*:/;
	const regSec = /:.*\./;
	const regMs = /\./;

	const min = parseInt((time.match(regMin) as any)[0].slice(0, 2));
	let sec = parseInt((time.match(regSec) as any)[0].slice(1, 3));
	const ms = time.slice((time.match(regMs) as any).index + 1, (time.match(regMs) as any).index + 3);
	if (min !== 0) {
		sec += min * 60;
	}
	return Number(sec + '.' + ms);
};
getLyric();

defineExpose({
	play,
	pause,
});
</script>

<style scoped lang="scss">
.lyrics-container {
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	position: fixed;
	z-index: 999;
	padding: 20px 0px;
	.lyricDiv {
		height: 100%;
		overflow-y: auto;
		text-align: center;
		text-align: center;
		height: 100%;
		min-width: 400px;
		font-size: 16px;
		overflow-y: auto;
		&::-webkit-scrollbar-thumb {
			visibility: hidden;
		}
		&:hover::-webkit-scrollbar-thumb {
			visibility: visible;
		}
	}
	.lyrics {
		transition: all 0.3s;
		.lyric-line {
			animation: scroll 5s linear infinite;
			color: rgba(255, 255, 255, 0.8);
		}

		.active {
			font-weight: bold;
			font-size: 18px;
			color: transparent;
			background-clip: text;
			-webkit-background-clip: text;
		}
	}
}
</style>
