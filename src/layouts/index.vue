<template>
	<component :is="LayoutComponents[themeConfig.layout]"></component>
	<ThemeDrawer />
</template>
<script setup lang="ts">
import { GlobalStore } from '@/store';
import ThemeDrawer from './components/ThemeDrawer/index.vue';
import LayoutVertical from './Layout-vertical/index.vue';
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const LayoutComponents: any = {
	vertical: LayoutVertical,
	horizontal: defineAsyncComponent(() => import('./Layout-horizontal/index.vue')),
};
</script>
<style scoped lang="scss"></style>
