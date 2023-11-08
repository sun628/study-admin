<template>
	<div id="mv-map" class="w-full h-full relative">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
// import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, shallowRef, provide } from 'vue';
import '@amap/amap-jsapi-types'; // 高德地图类型声明
import { initMap, loadMapUI } from '@/hooks/useMap';

defineOptions({
	name: 'MvMap',
});
const map = shallowRef<AMap.Map | null>(null);
provide('MAP', map);
const emit = defineEmits(['map-load']);

const cityCodes = [320903, 320685, 321283, 321281, 321012, 321202, 320902, 321204, 320682]; // 市级行政区划代码

const MapOptions: AMap.MapOptions = {
	center: [120.075917, 32.61237],
	animateEnable: true,
	zoomEnable: true,
	rotateEnable: true,
	// mapStyle: 'amap://styles/85131399e7fcecf474bc27c6f056263d',
	zoom: 10,
	viewMode: '3D',
};

/**
 * @description 获取地图实例
 * @returns {Object} map 地图实例
 */
const getMap = () => {
	return map.value;
};

onMounted(async () => {
	map.value = await initMap('mv-map', MapOptions);
	loadMapUI(map.value, cityCodes);
	emit('map-load', map.value as AMap.Map);
});
defineExpose({
	getMap,
});
</script>

<style scoped lang="scss"></style>
