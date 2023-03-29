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
import { initMap, addMarker, removeMarker } from '@/hooks/useMap';
const map = shallowRef();

const markers = ref();
//添加marker
const addMarkerClick = () => {
	if (markers.value) {
		removeMarker(map.value, markers.value);
	}
	const markerOptions = [
		{ position: [116.405467, 39.907761], title: '北京' },
		{ position: [116.397428, 39.90923], title: '北京' },
	];
	markers.value = addMarker(map.value, markerOptions);
};
//移除marker
const removeMarkerClick = () => {
	removeMarker(map.value, markers.value);
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
