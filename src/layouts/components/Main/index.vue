<template>
	<Tabs v-if="themeConfig.tabs" />
	<el-main class="layout-main">
		<router-view v-slot="{ Component, route }">
			<transition appear :name="route.meta.transitionName as string" mode="out-in">
				<keep-alive v-if="isRouterRefresh" :include="cacheRouter" :max="10">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<el-backtop target=".layout-main" />
	<el-footer v-if="themeConfig.footer">
		<Footer />
	</el-footer>
</template>
<script setup lang="ts">
import { ref, computed, nextTick, provide } from 'vue';
import { useGlobalStore } from '@/store/modules/global';
import cacheRouter from '@/routers/cacheRouter';
import Tabs from '@/layouts/components/Tabs/index.vue';
import Footer from '@/layouts/components/Footer/index.vue';
defineOptions({
	name: 'LayoutsMain',
});

// 刷新当前页面
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
// 刷新当前页面
const isRouterRefresh = ref(true);
const refreshCurrentPage = () => {
	isRouterRefresh.value = false;
	nextTick(() => {
		isRouterRefresh.value = true;
	});
};
provide('refresh', refreshCurrentPage);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
