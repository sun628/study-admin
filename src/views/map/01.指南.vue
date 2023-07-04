<template>
	<div class="map w-full h-full relative">
		<el-card class="absolute z-10 top-0 w-full">
			<el-button type="primary" @click="addMarkerClick">添加marker</el-button>
			<el-button type="primary" @click="removeMarkerClick">移除marker</el-button>
		</el-card>
		<div id="MvMap" class="w-full h-full"></div>
	</div>
</template>
<script setup lang="ts">
import { initMap } from '@/hooks/useMap';
const map = shallowRef();
const marker = shallowRef();
const addMarkerClick = () => {
	marker.value = new map.value.Marker({
		position: [116.39, 39.9],
		title: '北京',
	});
};
const removeMarkerClick = () => {
	map.value.remove(marker.value);
};
onMounted(() => {
	initMap('MvMap', {
		zoom: 11,
		viewMode: '3D',
	}).then((AMap) => {
		map.value = AMap;
	});
});
</script>

<style scoped lang="scss"></style>
