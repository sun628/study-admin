import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { Layout, filterModuleRoutes } from '@/routers/constant';
import { MatchMenu } from '@/routers/configEnum';
// * 导入所有router

const metaRouters = import.meta.glob('./modules/*.ts', { eager: true });
// * 处理路由表
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach((item) => {
	Object.keys(metaRouters[item] as object).forEach((key) => {
		routerArray.push(...(metaRouters[item] as any)[key]);
	});
});

/**
 * @description 路由配置简介（💢没有使用动态路由，路由全部配置在本地，需要使用动态路由请自行改造）
 * @param path ==> 路由路径
 * @param name ==> 路由名称
 * @param redirect ==> 路由重定向
 * @param component ==> 路由组件
 * @param meta ==> 路由元信息
 * @param meta.requireAuth ==> 是否需要权限验证
 * @param meta.keepAlive ==> 是否需要缓存该路由
 * @param meta.title ==> 路由标题
 * @param meta.key	==> 路由key,用来匹配按钮权限
 * */
export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: { name: 'login' },
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			requiresAuth: false,
			title: '登录页',
			key: 'login',
		},
	},
	{
		path: '/typeScript',
		component: Layout,
		name: 'typeScript',
		redirect: '/typeScript/01',
		children: filterModuleRoutes('typeScript'),
		meta: {
			menuIndex: MatchMenu['typeScript'],
			keepAlive: true,
			requiresAuth: false,
			title: 'typeScript',
			key: 'typeScript',
			localSvgIcon: 'typescript',
			transitionName: 'fade-transform',
		},
	},
	{
		path: '/hooks',
		component: Layout,
		name: 'hooks',
		children: filterModuleRoutes('hooks'),
		meta: {
			menuIndex: MatchMenu['hooks'],
			keepAlive: true,
			requiresAuth: false,
			title: 'hooks',
			key: 'hooks',
			localSvgIcon: 'hooks',
		},
	},
	{
		path: '/example',
		component: Layout,
		name: 'example',
		children: filterModuleRoutes('example'),
		meta: {
			menuIndex: MatchMenu['example'],
			keepAlive: true,
			requiresAuth: false,
			title: '功能',
			key: 'example',
			localSvgIcon: 'example',
		},
	},
	{
		path: '/electron',
		component: Layout,
		name: 'electron',
		children: filterModuleRoutes('electron'),
		meta: {
			menuIndex: MatchMenu['electron'],
			keepAlive: true,
			requiresAuth: false,
			title: 'electron',
			key: 'electron',
			localSvgIcon: 'logo-electron',
		},
	},
	{
		path: '/map',
		component: Layout,
		name: 'map',
		children: filterModuleRoutes('map'),
		meta: {
			menuIndex: MatchMenu['map'],
			keepAlive: true,
			requiresAuth: false,
			title: '地图',
			key: 'map',
			localSvgIcon: 'map-logo',
		},
	},
	...routerArray,
	// {
	// 	// 找不到路由重定向到404页面
	// 	path: '/:pathMatch(.*)',
	// 	redirect: { name: '404' },
	// },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
