<template>
	<div class="HighWayVideo w-full h-full relative">
		<el-card class="absolute z-10 top-0 w-full">
			<el-button type="primary" @click="getHighWayVideos">获取视频</el-button>
		</el-card>
		<MvMap class="w-full h-full" @map-load="mapLoad">
			<div class="absolute z-10 top-20 flex w-full flex-wrap">
				<HighWayVideo
					v-for="item in highWayVideoList"
					:id="item.cameraCode"
					ref="HighWayVideoRefs"
					:key="item.cameraCode"
					@close-video="closeVideo"
				/>
			</div>
		</MvMap>
	</div>
</template>
<script setup lang="ts">
import MvMap from '@/components/mv-map/index.vue';
import HighWayVideo from '@/components/mv-map/component/HighWayVideo.vue';
import styleOffIcon from '@/assets/images/map/map-camera-offline.png';
import styleOnlineIcon from '@/assets/images/map/map-camera-online.png';
import { getHighWayVideosApi } from '@/api/map';
import { GPSchange } from '@/utils/WGS84_to_GCJ02';
const map = shallowRef<AMap.Map>();
interface highWayVideoItem {
	cameraName: string;
	cameraNo: string;
	cameraType: string;
	lat: string;
	lon: string;
	online: string;
	cameraCode: string;
}
let highWayVideoMarkerList: Array<highWayVideoItem> = [];
// 地图加载完成
const mapLoad = (val: AMap.Map) => {
	map.value = val;
	styleOnline = {
		url: styleOnlineIcon, // 图标地址
		size: new AMap.Size(16, 16), // 图标大小
		anchor: new AMap.Pixel(7, 7), // 图标显示位置偏移量，基准点为图标左上角
		rotation: 0,
	};
	styleOff = {
		url: styleOffIcon, // 图标地址
		size: new AMap.Size(16, 16), // 图标大小
		anchor: new AMap.Pixel(7, 7), // 图标显示位置偏移量，基准点为图标左上角
		rotation: 0,
	};
};

const getHighWayVideos = async () => {
	highWayVideoMarkerList = [];
	const res = await getHighWayVideosApi();
	highWayVideoMarkerList = res.data;
	drawHighWayVideoMarkerList();
};
let styleOff = {};
let styleOnline = {};
let highWayCameraMass = null;
let highWayVideoList = ref<Array<highWayVideoItem>>([]);
const HighWayVideoRefs = ref<InstanceType<typeof HighWayVideo>[]>([]);

// 绘制高速视频点位
const drawHighWayVideoMarkerList = () => {
	const videoStyleList = [styleOff, styleOnline];
	const videoList: AMap.MassData[] = highWayVideoMarkerList.map(function (curValue: highWayVideoItem) {
		const pos = GPSchange(curValue.lon, curValue.lat);
		const LngLat = new AMap.LngLat(pos[0], pos[1]);
		return {
			lnglat: LngLat,
			name: curValue.cameraName,
			markerObj: JSON.stringify(curValue),
			style: parseInt(curValue.online) === 1 ? 1 : 0,
		};
	});
	highWayCameraMass = new AMap.MassMarks(videoList, {
		opacity: 0.8,
		cursor: 'pointer',
		zIndex: 111, // 海量点图层叠加的顺序
		style: videoStyleList as AMap.MassMarkersStyleOptions[], // 设置样式对象
	});

	const marker = new AMap.Marker({
		content: ' ',
		map: map.value,
	});
	highWayCameraMass.on('click', (e) => {
		const obj = JSON.parse(e.data.markerObj);
		highWayVideoList.value.push(obj);
		nextTick(() => {
			HighWayVideoRefs.value[HighWayVideoRefs.value.length - 1]?.getVideoPlayUrl(obj);
		});
	});

	highWayCameraMass.on('mouseover', function (e) {
		marker.setPosition(e.data.lnglat);
		marker.setLabel({
			content: e.data.name,
			offset: new AMap.Pixel(-13, 30),
			direction: '',
		});
	});
	highWayCameraMass.on('mouseout', function (e) {
		marker.setLabel({
			content: '',
			offset: new AMap.Pixel(-13, 30),
			direction: '',
		});
	});

	// 将海量点添加至地图实例
	map.value && highWayCameraMass.setMap(map.value);
};

const closeVideo = (data: highWayVideoItem) => {
	const index = highWayVideoList.value.findIndex((item) => item.cameraCode === data.cameraCode);
	highWayVideoList.value.splice(index, 1);
};
</script>

<style scoped lang="scss"></style>
