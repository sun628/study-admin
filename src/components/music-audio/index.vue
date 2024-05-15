<template>
	<div class="lyrics-container">
		<!-- <audio ref="AudioRef" class="hidden" :src="src" controls @timeupdate="handleTimeUpdate"></audio> -->
		<audio ref="AudioRef" class="hidden" :src="src" v-bind="$attrs" @timeupdate="handleTimeUpdate"></audio>
		<teleport to="body">
			<transition name="slide-fade">
				<div v-if="lyrics.length && visible" ref="lyricDiv" class="lyricDiv">
					<ul ref="lyric" class="lyrics">
						<li v-for="(item, index) in lyrics" :key="item.uid" class="lyric-line">
							<p :class="{ active: currentIndex === index }" :style="currentIndex === index ? gradBg : ''">
								{{ item.lyric }}
							</p>
						</li>
					</ul>
				</div>
			</transition>
		</teleport>
	</div>
</template>
<script setup lang="ts">
import { getLyricApi, getSongUrlApi } from '@/api/music/index';
import { useGlobalStore } from '@/store/modules/global';
import { HOME_URL } from '@/config';
// 获取路由
import { useRoute } from 'vue-router';
const route = useRoute();
const visible = computed(() => route.path === HOME_URL);

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

const props = defineProps({
	// 是否显示动画
	animation: {
		type: Boolean,
		default: true,
	},
	musicId: {
		type: Number,
		default: 2154955484,
	},
});

let src = ref('');

const orginLyric =
	'[00:00.00] 原唱 : 周兴哲\n[00:01.00] 作词 : 周兴哲/吴易纬\n[00:02.00] 作曲 : 周兴哲\n[00:03.00] 编曲 : 姜禹\n[00:04.00] 演唱设计 : 石行@维伴音乐\n[00:05.00] 制作人 : 刘卓@维伴音乐\n[00:06.00] 音乐总监 : 刘卓@维伴音乐\n[00:07.00] 音响总监 : 何飚\n[00:08.00] 音乐混音 : 林梦洋\n[00:09.00] 鼓 : 卢炜@维伴音乐\n[00:10.00] 打击乐 : 刘效松@维伴音乐\n[00:11.00] 贝斯 : 李九君@维伴音乐\n[00:12.00] 吉他 : 金天@维伴音乐\n[00:13.00] 钢琴 : 傅一峥@维伴音乐\n[00:14.00] 键盘 : 李海郡@维伴音乐\n[00:15.00] Program : 郎梓朔@维伴音乐\n[00:16.00] 合音编写 : 石行@维伴音乐\n[00:17.00] 合音 : 石行@维伴音乐/马思莹@维伴音乐/邢晏侨@维伴音乐\n[00:18.00] 录音 : 黄可爱@维伴音乐\n[00:19.00] 乐队统筹 : 张伊然@维伴音乐\n[00:27.09]你说蓝色是你最爱的颜色\n[00:30.51]你说如果没有爱那又如何\n[00:33.39]怎么了你怎么了\n[00:40.59]看过你曾经最灿烂的笑容\n[00:43.83]看过你紧紧拥抱爱的面孔\n[00:46.77]怎么了你消失了\n[00:53.61]是不是我错了搞错了\n[00:56.16]天灰了雨下着凝望着你走了\n[00:59.49]都回不去了像从前快乐\n[01:07.14]怎么能轻易说要结束（说要结束）\n[01:13.83]怎么会让你抱着我哭（抱着我哭）\n[01:20.25]太努力的我们最后用力给祝福\n[01:27.12]怎么看你笑着我却心如刀割\n[01:33.84]原来我们都一样顽固\n[01:39.69]怎么会谁都绝口不提要幸福\n[01:46.74]再也不能牵着你走未来每一步\n[01:53.76]我们怀念什么失去爱那一刻才晓得\n[02:03.90]你说蓝色是你最爱的颜色\n[02:07.17]你说如果没有爱那又如何\n[02:10.05]怎么了你怎么了\n[02:17.13]看过你曾经最灿烂的笑容\n[02:20.49]看过你紧紧拥抱爱的面孔\n[02:23.40]怎么了你消失了\n[02:30.42]是不是我错了搞错了\n[02:32.79]越爱着越痛着苦笑着你走了\n[02:36.27]我们约好了要比我快乐\n[02:43.83]怎么能轻易说要结束\n[02:50.46]怎么会让你抱着我哭\n[02:56.79]太努力的我们最后用力给祝福\n[03:03.81]祝福我最爱的遇见更爱你的\n[03:09.75]飞翔着\n[03:10.95]我不想说你不会懂请别可怜我\n[03:17.01]受伤的我究竟需要\n[03:20.46]一个人多少年去度过\n[03:23.79]我不想说你不会懂请别可怜我\n[03:30.45]谁说我一定要永远笑着\n[03:33.42]我不想（不想）\n[03:40.77]怎么能轻易说要结束\n[03:47.01]怎么会让你抱着我哭\n[03:53.34]太努力的我们最后用力给祝福\n[04:00.48]祝福我最爱的能永远飞翔着\n[04:07.14]原来我们都一样顽固\n[04:12.99]怎么会谁都绝口不提要幸福\n[04:20.10]再也不能牵着你走未来每一步\n[04:27.15]我们怀念什么失去爱那一刻\n[04:33.09]才晓得\n[04:40.65]才晓得\n';
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const AudioRef = ref<HTMLAudioElement | null>(null);

const gradBg = ref('');

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
const play = async () => {
	if (!AudioRef.value) return new Error('AudioRef is not defined or has no value.');
	if (lyrics.value.length === 0) getLyric();
	try {
		const res = await getSongUrlApi({ id: props.musicId, type: 'songid' });
		src.value = res.song_url;
		await nextTick();
		AudioRef.value.play();
		currentIndex.value = -1;
		if (props.animation) {
			requestId = requestAnimationFrame(updateLyrics);
		}
	} catch (error) {
		if (globalStore.themeConfig.audio) {
			const autoPlayAfterClick = () => {
				document.removeEventListener('click', autoPlayAfterClick);
				play();
			};
			document.addEventListener('click', autoPlayAfterClick);
		}
		console.error(error);
	}
};

// 停止音乐
const pause = () => {
	AudioRef.value?.pause();
	cancelAnimationFrame(requestId);
};

const lyrics = ref<Array<ILyric>>([]);

// 监听歌曲播放时间变化
const handleTimeUpdate = (e: Event) => {
	// const currentTime = (e.target as HTMLAudioElement).currentTime; //当前播放器时间
	scrollToCurrentLine();

	// for (let i = 0; i < lyrics.value.length; i++) {
	// 	if (currentTime >= lyrics.value[i].time && (!lyrics.value[i + 1] || currentTime  < lyrics.value[i + 1].time)) {
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
		if (lyric.value) {
			lyric.value.style.transform = `translateY(${scrollY}px)`;
		}
	}
};

// 获取歌词歌词
const getLyric = async () => {
	// const res = await getLyricApi({ id: props.musicId });
	formatMusicLyrics(orginLyric);
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

defineExpose({
	play,
	pause,
});
</script>

<style scoped lang="scss">
.lyrics-container {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	@include respondTo('pc') {
		justify-content: flex-end;
	}
}

.lyricDiv {
	overflow-y: auto;
	text-align: center;
	min-width: 400px;
	font-size: 16px;
	overflow-y: auto;
	position: fixed;
	z-index: 999;
	padding: 20px 0px;
	top: 100px;
	right: 0px;
	right: 10px;
	height: calc(100% - 120px);
	margin: auto;
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
		height: 28px;
		line-height: 28px;
	}
	.active {
		font-weight: bold;
		font-size: 18px;
		color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
	}
}
.slide-fade-enter-active {
	transition: all 1.5s ease-out;
}

.slide-fade-leave-active {
	transition: all 1.5s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(40px);
	opacity: 0;
}
</style>
