import { defineStore, createPinia } from 'pinia';
import piniaPersistConfig from './piniaPersist';
import { DEFAULT_PRIMARY } from '@/config';
import { GlobalState, ThemeConfigProp, AssemblySizeProp } from './interface';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: 'GlobalState',
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		token: '',
		// userInfo
		userInfo: '',
		// element组件大小
		assemblySize: 'default', //'large' | 'default' | 'small'
		themeConfig: {
			// 布局切换 ==>  纵向：vertical | 横向：horizontal
			layout: 'vertical',
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 面包屑导航
			breadcrumb: true,
			// 标签页
			tabs: true,
			// 页脚
			footer: false,
		},
	}),
	getters: {},

	actions: {
		// setToken
		setToken(token: string) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize: AssemblySizeProp) {
			this.assemblySize = assemblySize;
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProp) {
			this.themeConfig = themeConfig;
		},
	},
	persist: piniaPersistConfig('GlobalState'),
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
