<template>
	<div id="MvMap"></div>
</template>
<script setup lang="ts">
//高德地图
import { initMap } from '@/hooks/useMap';

onMounted(async () => {
	const { map, AMap } = await initMap('MvMap');
	console.log(map, AMap);
});
</script>

<style scoped lang="scss">
#MvMap {
	width: 100%;
	height: 100%;
}
</style>
