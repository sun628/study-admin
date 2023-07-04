<template>
	<div class="menu-search-dialog">
		<i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleOpen"></i>
		<el-dialog v-model="isShowSearch" destroy-on-close :modal="false" :show-close="false" fullscreen @click="closeSearch">
			<el-autocomplete
				ref="menuInputRef"
				v-model="searchMenu"
				value-key="path"
				placeholder="菜单搜索 ：支持菜单名称、路径"
				:fetch-suggestions="searchMenuList"
				@select="handleClickMenu"
				@click.stop
			>
				<template #prefix>
					<el-icon>
						<Search />
					</el-icon>
				</template>
				<template #default="{ item }">
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					<span>{{ item.meta.title }}</span>
				</template>
			</el-autocomplete>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { getFlatArr } from '@/utils/util';
import { MenuStore } from '@/store/modules/menu';
import mittBus from '@/utils/mittBus';
const router = useRouter();
const menuStore = MenuStore();
const menuList = computed((): Menu.MenuOptions[] => getFlatArr(menuStore.menuList));

const searchMenuList = (queryString: string, cb: (results: Menu.MenuOptions[]) => void) => {
	const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
	cb(results);
};

// 打开搜索菜单
const isShowSearch = ref(false);
const menuInputRef = ref();
const searchMenu = ref('');
const handleOpen = () => {
	isShowSearch.value = true;
	searchMenu.value = '';
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};

// 搜索窗关闭
const closeSearch = () => {
	isShowSearch.value = false;
};

// 筛选菜单
const filterNodeMethod = (queryString: string) => {
	return (restaurant: Menu.MenuOptions) => {
		return (
			restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
			restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
		);
	};
};

// 点击菜单跳转
const handleClickMenu = (menuItem: Record<string, any>) => {
	searchMenu.value = '';
	if (menuItem.isLink) window.open(menuItem.isLink, '_blank');
	closeSearch();
	router.push(menuItem.path);
};

/**
 * @description: 通过mittBus触发的搜索
 * @param content 搜索内容
 */
const keywordSearch = (content: string) => {
	isShowSearch.value = true;
	searchMenu.value = content;
	nextTick(() => {
		setTimeout(() => {
			menuInputRef.value.focus();
		});
	});
};
onMounted(() => {
	mittBus.on('keywordSearchByMitt', keywordSearch);
});

onBeforeUnmount(() => {
	mittBus.off('keywordSearchByMitt');
});
</script>

<style scoped lang="scss">
/* 菜单搜索样式 */
.menu-search-dialog {
	:deep(.el-dialog) {
		background-color: rgb(0 0 0 / 50%);
		border-radius: 0 !important;
		box-shadow: unset !important;
		.el-dialog__header {
			border-bottom: none !important;
		}
	}
	:deep(.el-autocomplete) {
		position: absolute;
		top: 100px;
		left: 50%;
		width: 560px;
		transform: translateX(-50%);
	}
}
.el-autocomplete__popper {
	.el-icon {
		position: relative;
		top: 2px;
		font-size: 16px;
	}
	span {
		margin: 0 0 0 10px;
		font-size: 14px;
	}
}
</style>
