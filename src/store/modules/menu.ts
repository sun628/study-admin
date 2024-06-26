import { defineStore } from 'pinia';
import { MenuState } from '../interface';
import piniaPersistConfig from '@/config/piniaPersist';

// MenuStore
export const MenuStore = defineStore({
	id: 'MenuState',
	state: (): MenuState => ({
		// menu collapse
		isCollapse: false,
		// menu List
		menuList: [],
	}),
	getters: {},
	actions: {
		async setCollapse(collapse?: boolean) {
			// 判断collapse是否为布尔值
			if (typeof collapse == 'boolean') {
				this.isCollapse = collapse;
			} else {
				this.isCollapse = !this.isCollapse;
			}
		},
		async setMenuList(menuList: Menu.MenuOptions[]) {
			this.menuList = menuList;
		},
	},
	persist: piniaPersistConfig('MenuState'),
});
