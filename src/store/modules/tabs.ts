import { defineStore } from 'pinia';
import { TabPaneProps } from 'element-plus';
import { TabsState } from '../interface';
import { HOME_URL, ROUTER_WHITE_LIST } from '@/config';
import piniaPersistConfig from '@/config/piniaPersist';
import router from '@/routers/index';

// TabsStore
export const TabsStore = defineStore({
	id: 'TabsState',
	state: (): TabsState => ({
		tabsMenuValue: HOME_URL, // 可以直接使用 route.path
		tabsMenuList: [{ title: '首页', path: HOME_URL, icon: 'home-filled', close: false }],
	}),
	getters: {},
	actions: {
		// Go Home
		async goHome() {
			router.push(HOME_URL);
			this.tabsMenuValue = HOME_URL;
		},
		// Add Tabs
		async addTabs(tabItem: TabsOptions) {
			// not add tabs white list
			if (ROUTER_WHITE_LIST.includes(tabItem.path)) return;
			const tabInfo: TabsOptions = {
				title: tabItem.title,
				path: tabItem.path,
				close: tabItem.close,
			};
			if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabInfo);
			}
			this.setTabsMenuValue(tabItem.path);
		},
		// Remove Tabs
		async removeTabs(tabPath: string) {
			let tabsMenuValue = this.tabsMenuValue;
			const tabsMenuList = this.tabsMenuList;
			if (tabsMenuValue === tabPath) {
				tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
					if (!nextTab) return;
					tabsMenuValue = nextTab.path;
					router.push(nextTab.path);
				});
			}
			this.tabsMenuValue = tabsMenuValue;
			this.tabsMenuList = tabsMenuList.filter((item) => item.path !== tabPath);
		},
		// Change Tabs
		async changeTabs(tabItem: TabPaneProps) {
			this.tabsMenuList.forEach((item) => {
				if (item.title === tabItem.label) router.push(item.path);
			});
		},
		// Set TabsMenuValue
		async setTabsMenuValue(tabsMenuValue: string) {
			this.tabsMenuValue = tabsMenuValue;
		},

		// Set TabsMenuList
		async setTabsMenuList(tabsMenuList: TabsOptions[]) {
			this.tabsMenuList = tabsMenuList;
		},

		// Close MultipleTab
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter((item) => {
				return item.path === tabsMenuValue || item.path === HOME_URL;
			});
		},
	},
	persist: piniaPersistConfig('TabsState'),
});
