<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
			<template #title>
				<el-icon v-if="subItem.meta.icon">
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<svg-icon v-if="subItem.meta.localSvgIcon" class="text-xl flex-shrink-0 m-1" :name="subItem.meta.localSvgIcon"></svg-icon>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menu-list="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
			<el-icon v-if="subItem.meta.icon">
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps<{ menuList: Menu.MenuOptions[] }>();
const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.isLink) window.open(subItem.isLink, '_blank');
	router.push(subItem.path);
};
</script>
<style lang="scss" scoped>
.svg-icon {
	color: var(--el-color-primary);
}
.icon-hooks {
	margin-top: -5px;
}
.icon-typescript {
	background-color: var(--el-color-primary);
	color: #191a20;
	margin-top: -3px;
	margin-left: 3px;
}
</style>
