<template>
	<component :is="LayoutComponents[themeConfig.layout]"></component>
	<ThemeDrawer />
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/store/modules/global';
import ThemeDrawer from './components/ThemeDrawer/index.vue';
import LayoutVertical from './Layout-vertical/index.vue';
import LayoutHorizontal from './Layout-horizontal/index.vue';

defineOptions({
	name: 'Layouts',
});
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const LayoutComponents: any = {
	vertical: LayoutVertical,
	horizontal: LayoutHorizontal,
};
</script>
<style scoped lang="scss"></style>
