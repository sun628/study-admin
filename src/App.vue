<template>
	<el-config-provider :size="assemblySize" :locale="zhCn">
		<router-view :key="path"></router-view>
	</el-config-provider>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/store';
import { MenuStore } from '@/store/modules/menu';
import { useTheme } from '@/hooks/useTheme';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { useRouter } from 'vue-router';
import { computed, watch } from 'vue';

import * as echarts from 'echarts';
// echarts
provide('echarts', echarts);
// 配置全局组件大小 (small/default(medium)/large)
const assemblySize = computed(() => globalStore.assemblySize);
const globalStore = GlobalStore();
const menuStore = MenuStore();
// 使用主题
useTheme();

const router = useRouter();
const routes = router.options.routes;
const path = computed(() => router.currentRoute.value.fullPath);

// 数组过滤成菜单--根据meta.index排序
const filterArray = (arr: any) => {
	let tempArr = arr.filter((item: any) => {
		return item?.meta?.index || item?.meta?.index === 0;
	});
	return tempArr.sort((a: any, b: any) => {
		return a.meta.index - b.meta.index;
	});
};

// 监听当前路由的name变化
watch(
	() => routes,
	(routers) => {
		const menuList = filterArray(routers);
		menuStore.setMenuList(menuList);
	},
	{ immediate: true }
);
</script>
