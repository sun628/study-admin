<template>
	<div id="mv-map" class="w-full h-full relative">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
// import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, shallowRef, provide } from 'vue';
import { initMap, loadMapUI } from '@/hooks/useMap';
import { MAP_OPTIONS } from '@/config';

defineOptions({
	name: 'MvMap',
});
const map = shallowRef<AMap.Map | null>(null);
provide('MvMap', map);
const emit = defineEmits(['map-load']);
// const cityCodes = [320903, 320685, 321283, 321281, 321012, 321202, 320902, 321204, 320682]; // 市级行政区划代码
const cityCodes = 320000;

/**
 * @description 获取地图实例
 * @returns {Object} map 地图实例
 */
const getMap = () => {
	return map.value;
};

onMounted(async () => {
	map.value = await initMap('mv-map', MAP_OPTIONS);
	loadMapUI(map.value, cityCodes);
	emit('map-load', map.value as AMap.Map);
});
defineExpose({
	getMap,
});
</script>

<style scoped lang="scss"></style>
