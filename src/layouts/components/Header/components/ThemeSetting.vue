<template>
	<div class="theme-setting">
		<i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
	</div>
</template>

<script setup lang="ts">
import mittBus from '@/hooks/useMitt';
const openDrawer = () => {
	mittBus.emit('openThemeDrawer');
};
</script>
