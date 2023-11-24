import { MatchMenu } from '@/routers/configEnum';
import { RouteRecordRaw } from 'vue-router';

// 获取所有的路由
const viewRouters = import.meta.glob('../views/**/*.vue');

/**
 * @description: default layout
 */
export const Layout = () => import('@/layouts/index.vue');
// export const Layout = () => import("@/layouts/indexAsync.vue");

interface RouterMeta {
	keepAlive?: boolean;
	requiresAuth?: boolean;
}

interface Page {
	name: string;
	component?: Component;
	children?: Array<Page>;
	meta?: {
		keepAlive: boolean;
		requiresAuth: boolean;
		title: string;
		key: string;
	};
}
/**
 * @description 默认 meta 配置
 * @param {boolean} keepAlive 是否缓存页面
 * @returns {boolean} requiresAuth 是否需要登录权限
 **/
const defaultMeta: RouterMeta = {
	keepAlive: true,
	requiresAuth: true,
};

/**
 * @description 过滤模块路由  TODO: 处理一级路由
 * @param {string} moduleName 模块名
 * @returns {Array<RouteRecordRaw>} 路由数组
 **/
export function filterModuleRoutes(moduleName: keyof typeof MatchMenu, metaConfig?: RouterMeta): Array<RouteRecordRaw> {
	const routerArray: Array<RouteRecordRaw> = [];

	const routers = Object.fromEntries(Object.entries(viewRouters).filter(([key]) => key.startsWith(`../views/${moduleName}/`)));

	for (const i in routers) {
		const newName = i.replace(new RegExp(`../views/${moduleName}/`), '').replace(/.vue/, '');
		const newPath = `/${moduleName}/${newName.split('.')[0]}`;

		const meta = { ...defaultMeta, ...metaConfig, title: newName, key: newPath }; // 合并默认 meta 和传入的 metaConfig
		routerArray.push({
			path: newPath,
			name: `/${moduleName}/${newName}`,
			meta: meta,
			component: routers[i],
		});
	}
	return routerArray;
}

/**
 * @description 递归路由
 * @param {Array<Page>} routers 路由数组
 * @param {string} path 路径
 * @returns {Array<Page>} 路由数组
 **/
export const recursionRouter = (routers: Array<Page>, path: string): Array<RouteRecordRaw> => {
	const arr: Array<RouteRecordRaw> = routers.map((item, index) => {
		const newIndex = (index + 1).toString().padStart(2, '0');
		const newPath = `/${path}/${newIndex}`;
		const newName = `/${path}/${String(item.name)}`;
		return {
			path: newPath,
			name: newName,
			component: item.component,
			children: item.children ? recursionRouter(item.children, `${path}/${newIndex}`) : [],
			meta: {
				...defaultMeta,
				title: item.name,
				key: newPath,
				...item.meta,
			},
		};
	});
	return arr;
};
