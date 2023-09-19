<template>
	<div class="map w-full h-full relative">
		<el-card class="absolute z-10 top-0 w-full">
			<el-button type="primary" @click="addMarkerHandle">添加marker</el-button>
			<el-button type="primary" @click="updateMarkerHandle">更新marker图标</el-button>
			<el-button type="primary" @click="removeMarkerHandle">移除marker</el-button>
		</el-card>
		<!-- <div id="MvMap" class="w-full h-full"></div> -->
		<MvMap class="w-full h-full" @map-load="mapLoad" />
	</div>
</template>
<script setup lang="ts">
import MvMap from '@/components/mv-map/index.vue';
import { addMarker } from '@/hooks/useMap';

const map = shallowRef<AMap.Map>();
let marker: AMap.Marker | null = null;
const markerClick = (e: Event) => {
	console.log('markerClick', e);
};
const addMarkerHandle = () => {
	marker && marker.setMap(null);
	marker = addMarker(
		{
			icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
			position: [116.406315, 39.908775],
			offset: new AMap.Pixel(-13, -30),
			map: map.value,
		},
		markerClick
	);
};
const updateMarkerHandle = () => {
	marker && marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png');
};
const removeMarkerHandle = () => {
	marker && marker.setMap(null);
	marker = null;
};

const mapLoad = (val: AMap.Map) => {
	map.value = val;
};
</script>

<style scoped lang="scss"></style>
