<template>
	<el-icon id="collapseIcon" class="collapse-icon" @click="menuStore.setCollapse()">
		<component :is="isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MenuStore } from '@/store/modules/menu';
import { useEventListener } from '@/hooks/useEventListener';
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);

// 监听浏览器窗口大小变化
window.addEventListener('resize', () => {
	if (window.innerWidth <= 768) {
		menuStore.setCollapse(true);
	} else {
		menuStore.setCollapse(false);
	}
});

useEventListener(window, 'resize', () => {
	console.log(11111);
});
</script>

<style scoped lang="scss">
.collapse-icon {
	margin-right: 20px;
	font-size: 22px;
	cursor: pointer;
	color: var(--el-text-color-primary);
}
</style>
