<template>
	<div class="lyrics-container">
		<audio ref="AudioRef" class="hidden" :src="audioInfo.src" controls @timeupdate="handleTimeUpdate"></audio>
		<div class="lyrics">
			<div v-for="(line, index) in lyrics" :key="line.time" class="lyric-line" :class="{ highlight: currentIndex === index }">
				{{ line.lyric }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { getLyricApi } from '@/api/music/index';
const AudioRef = ref<HTMLAudioElement | null>(null);
const audioInfo = ref({
	poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
	name: '此时此刻',
	author: '许巍',
	src: 'https://music.163.com/song/media/outer/url?id=436346833.mp3',
});

//播放音乐
const play = () => {
	AudioRef.value?.play();
};

// 停止音乐
const pause = () => {
	AudioRef.value?.pause();
};
interface ILyric {
	time: number;
	lyric: string;
	uid: number;
}

interface IReturnLyric {
	lyric: ILyric[];
	tlyric?: ILyric[];
}
const currentIndex = ref(0);
const lyrics = ref<Array<ILyric>>([]);

// 监听歌曲播放时间变化
const handleTimeUpdate = (e: any) => {
	const currentTime = e.target.currentTime; //当前播放器时间
	for (let i = 0; i < lyrics.value.length; i++) {
		if (currentTime >= lyrics.value[i].time && (!lyrics.value[i + 1] || currentTime < lyrics.value[i + 1].time)) {
			currentIndex.value = i; // 更新当前播放歌词行的索引
			break;
		}
	}
};

// 获取歌词歌词
const getLyric = async () => {
	const res = await getLyricApi({ id: 436346833 });
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
	width: auto;
	height: 100%;
	height: -webkit-fill-available;
	overflow-y: auto;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	opacity: 0.8;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.lyrics {
	font-size: 20px;
	text-align: center;
	height: 100%;
}

.lyric-line {
	animation: scroll 5s linear infinite;
}

.highlight {
	animation-play-state: paused; /* 暂停高亮行的滚动动画 */
	font-weight: bold;
	color: var(--el-color-primary);
}

// @keyframes scroll {
// 	0% {
// 		transform: translateY(0);
// 	}

// 	100% {
// 		transform: translateY(-100%);
// 	}
// }
</style>
