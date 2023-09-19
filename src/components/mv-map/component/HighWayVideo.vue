<template>
	<div v-show="isShow" id="HighWayVideo" class="HighWayVideo">
		<!-- 视频播放器 -->
		<video id="flvDom" ref="HighWayVideoRef" controls style="width: 100%; height: 100%"></video>
		<!-- id='video-container' -->
		<i class="video-close" @click="closeVideo"></i>
		<i class="video-fullscreen"></i>
	</div>
</template>

<script setup lang="ts">
import flvjs from 'flv.js';
import { getVideoUrlApi } from '@/api/map';
const isShow = ref(true); // 是否展示
let flvDataObj: { cameraCode: any } | null = null;
let flvPlayer: flvjs.Player | null = null; // 视频播放
const HighWayVideoRef = ref();

const emit = defineEmits(['close-video']);
/**
 * @description 获取视频播放地址
 * @param {String} videoId 视频id
 * @returns {void}
 **/
function getVideoPlayUrl(dataObj: { cameraCode: any }) {
	flvDataObj = dataObj;
	getVideoUrlApi({ cameraNum: dataObj.cameraCode }).then((res) => {
		if (res.data) {
			playVideo(res.data);
		}
	});
}

/**
 * @description 播放视频
 * @param { Object } data { url: '视频地址' }
 * @returns {void}
 **/
const playVideo = async (data: any) => {
	isShow.value = true;
	if (!flvjs.isSupported()) {
		var check1 = !!window.MediaSource;
		var check2 = false;
		if (check1 && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')) {
			check2 = true;
		}
		alert(
			'你的设备不支持flvjs。其中window.MediaSource：' +
				check1 +
				'。\n window.MediaSource.isTypeSupported(\'video/mp4; codecs="avc1.42E01E,mp4a.40.2"\'):' +
				check2
		);
	}
	if (flvPlayer) {
		flvPlayer.pause();
		flvPlayer.unload();
		flvPlayer.detachMediaElement();
		flvPlayer.destroy();
		flvPlayer = null;
	}
	// H5 video标签
	flvPlayer = flvjs.createPlayer(
		{
			type: 'flv',
			isLive: true, // 直播
			hasVideo: true, // 视频
			hasAudio: false, // 音频
			// autoplay        : true, // 自动播放
			// controls        : true, // 控件
			// url: _this.sData,  // 视频地址
			url: data, // 视频地址
			withCredentials: false, //
			cors: true,
		},
		{
			// seekType: 'range', // 搜索
			// enableWorker: true,// 分离线程加载数据
			enableStashBuffer: false, // 禁用IO存储缓冲区,解决卡顿的根本问题
			// stashInitialSize: 1,//指示IO存储缓冲区初始大小,默认是 384kb*/
			// lazyLoad: true,// 数据缓存量足够情况下停止加载。默认打开，这里会阻止实时加载。
			// lazyLoadMaxDuration: 60,// 缓存秒数
			// lazyLoadRecoverDuration: 20,// 更新覆盖描述
			deferLoadAfterSourceOpen: false, // 切换浏览器选项卡之后停止加载，false取消限制
			// autoCleanupSourceBuffer: true,
			// autoCleanupMaxBackwardDuration: 60,
			// autoCleanupMinBackwardDuration: 30,
			// statisticsInfoReportInterval: 1,
			// fixAudioTimestampGap: false,
		}
	);
	flvPlayer.attachMediaElement(HighWayVideoRef.value);
	flvPlayer.load(); // 手动加载数据
	flvPlayer.play(); // 开启播放e
};

/**
 * @description 关闭视频弹窗
 **/
function closeVideo() {
	// isShow.value = false;
	if (flvPlayer) {
		flvPlayer.pause();
		flvPlayer.unload();
		flvPlayer.detachMediaElement();
		flvPlayer.destroy();
		flvPlayer = null;
	}
	emit('close-video', flvDataObj);
}

defineExpose({
	getVideoPlayUrl,
});
</script>
<style lang="scss" scoped>
.HighWayVideo {
	width: 450px;
	height: 370px;
	position: relative;
	// top: 98px;
	// left: calc(25% + 40px);
	background: #000;
	cursor: pointer;
	margin-right: 10px;

	.video-fullscreen {
		width: 16px;
		height: 16px;
		cursor: pointer;
		background: url('@/assets/images/map/map-video-fullscreen.png') no-repeat;
		position: absolute;
		bottom: 10px;
		right: 10px;
		cursor: pointer;
		display: none;
	}

	.video-close {
		position: absolute;
		top: 11px;
		right: 11px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		cursor: pointer;
		background: url('@/assets/images/map/map-video-close.png') center center no-repeat;
		background-size: 100%;
		display: none;
	}
}
.HighWayVideo:hover .video-fullscreen {
	display: block;
}

.HighWayVideo:hover .video-close {
	display: block;
}
</style>
