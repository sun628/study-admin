<template>
	<!-- <Suspense>
    <template v-slot:default>
      <component :is="LayoutComponents[themeConfig.layout]"></component>
    </template>
    <template v-slot:fallback>
      <Loading></Loading>
    </template>
  </Suspense> -->
	<component :is="LayoutComponents[themeConfig.layout]"></component>
	<ThemeDrawer />
</template>
<script setup lang="ts">
// import Loading from '@/components/Loading/index.vue';

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
