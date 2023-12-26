<template>
	<div class="Layout-vertical" :class="{ mobile: deviceType === 'mobile' }">
		<el-container>
			<el-aside width="200px" :class="{ 'aside-collapse': !isCollapse }" @click="toggleClick">
				<div class="menu" :style="{ width: menuWidth }">
					<div class="logo flex-center">
						<img src="@/assets/vite.svg" alt="logo" />
						<span v-show="!isCollapse">天外来物</span>
					</div>
					<el-scrollbar>
						<el-menu :default-active="activeMenu" :collapse="isCollapse" active-text-color="#ffd04b" background-color="#191a20" text-color="#bdbdc0">
							<SubMenu :menu-list="menuList" />
						</el-menu>
					</el-scrollbar>
				</div>
			</el-aside>
			<el-container>
				<el-header>
					<ToolBarLeft />
					<ToolBarRight />
				</el-header>
				<Main />
			</el-container>
		</el-container>
	</div>
</template>
<script setup lang="ts">
import { MenuStore } from '@/store/modules/menu';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import Main from '@/layouts/components/Main/index.vue';
import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
import { useDeviceType } from '@/hooks/useDeviceType';
defineOptions({
	name: 'LayoutVertical',
});

const route = useRoute();
const menuStore = MenuStore();
const activeMenu = computed(() => route.path);
const menuList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);
const { deviceType } = useDeviceType();
if (deviceType.value === 'mobile') {
	menuStore.isCollapse = true; // 移动端默认不展示
}

const menuWidth = computed(() => {
	if (deviceType.value === 'mobile') {
		return menuStore.isCollapse ? '0' : '220px';
	} else if (deviceType.value === 'ipad') {
		return menuStore.isCollapse ? '65px' : '220px';
	} else {
		return menuStore.isCollapse ? '65px' : '220px';
	}
});

const toggleClick = (e: Event) => {
	// 防止点击菜单时也触发
	if (e.currentTarget === e.target) {
		menuStore.isCollapse = !menuStore.isCollapse;
	}
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
