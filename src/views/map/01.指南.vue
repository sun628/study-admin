<template>
	<div class="map w-full h-full">
		<el-card>
			<el-button @click="markerAdd()">添加marker</el-button>
			<el-button @click="markerRemove()">移除marker</el-button>
		</el-card>
		<div id="map-container" class="w-full h-full"></div>
	</div>
</template>
<script setup lang="ts">
let map: any = shallowRef(null);
let marker: any = null;
const markerAdd = () => {
	if (marker) {
		map.value.remove(marker);
	}
	marker = new AMap.Marker({
		position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
		title: '北京',
	});
	// 将创建的点标记添加到已有的地图实例：
	map.value.add(marker);
};
// 移除marker
const markerRemove = () => {
	map.value.remove(marker);
};
onMounted(() => {
	nextTick(() => {
		map.value = new AMap.Map('map-container', {
			zoom: 11, //级别
			center: [116.397428, 39.90923], //中心点坐标
			viewMode: '3D', //使用3D视图
		});
	});
});
</script>

<style scoped lang="scss"></style>
