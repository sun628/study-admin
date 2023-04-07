<template>
	<component :is="LayoutComponents[themeConfig.layout]"></component>
	<ThemeDrawer />
</template>
<script setup lang="ts">
import { GlobalStore } from '@/store';
import ThemeDrawer from './components/ThemeDrawer/index.vue';
import LayoutVertical from './Layout-vertical/index.vue';
import LayoutHorizontal from './Layout-horizontal/index.vue';
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const LayoutComponents: any = {
	vertical: LayoutVertical,
	horizontal: LayoutHorizontal,
};
</script>
<style scoped lang="scss"></style>
