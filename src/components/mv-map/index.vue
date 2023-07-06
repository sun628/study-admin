<template>
	<div id="mv-map" class="w-full h-full relative">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, shallowRef, provide } from 'vue';
import '@amap/amap-jsapi-types'; // 高德地图类型声明
const map = shallowRef<AMap.Map | null>(null);
provide('MAP', map);
const emit = defineEmits(['map-load']);

const MapOptions: AMap.MapOptions = {
	zoom: 11, //级别
	center: [116.397428, 39.90923], //中心点坐标
};
/**
 * @description 初始化地图
 **/
const initMap = () => {
	AMapLoader.load({
		key: 'd64a526f93c64d766b15ffbdd5aeac7d', // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [], //插件列表
	})
		.then((AMap) => {
			map.value = new AMap.Map('mv-map', {
				zoom: 11, //级别
				center: [116.397428, 39.90923], //中心点坐标
			});
			console.log('map', map);
			emit('map-load', map.value as AMap.Map);
		})
		.catch((e) => {
			console.error(e); //加载错误提示
		});
};

/**
 * @description 获取地图实例
 * @returns {Object} map 地图实例
 */
const getMap = () => {
	return map.value;
};

onMounted(() => {
	initMap();
});
defineExpose({
	getMap,
});
</script>

<style scoped lang="scss"></style>
