import { MatchMenu } from '@/enums/configEnum';
import { RouteRecordRaw } from 'vue-router';
const viewRouters = import.meta.glob('../views/**/*.vue');

/**
 * @description: default layout
 */
export const Layout = () => import('@/layouts/index.vue');
// export const Layout = () => import("@/layouts/indexAsync.vue");

interface RouterMeta {
	keepAlive: boolean;
	requiresAuth: boolean;
	title: string;
	key: string;
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
 * @description 过滤模块路由  TODO: 处理一级路由
 * @param {string} moduleName 模块名
 * @returns {Array<RouteRecordRaw>} 路由数组
 **/
export function filterModuleRoutes(moduleName: keyof typeof MatchMenu, metaConfig?: RouterMeta): Array<RouteRecordRaw> {
	// 获取所有的路由

	const routerArray: Array<RouteRecordRaw> = [];

	const routers = Object.fromEntries(Object.entries(viewRouters).filter(([key]) => key.startsWith(`../views/${moduleName}/`)));

	for (const i in routers) {
		const newName = i.replace(new RegExp(`../views/${moduleName}/`), '').replace(/.vue/, '');
		const newPath = `/${moduleName}/${newName}`;
		const defaultMeta: RouterMeta = {
			keepAlive: true,
			requiresAuth: true,
			title: newName,
			key: newPath,
		};
		const meta = { ...defaultMeta, ...metaConfig }; // 合并默认 meta 和传入的 metaConfig
		routerArray.push({
			path: newPath,
			name: newName,
			meta: meta,
			component: routers[i],
		});
	}
	return routerArray;
}

/**
 * @description 递归路由
 **/
export const recursionRouter = (routers: Array<Page>, path: string) => {
	const arr: Array<Page> = routers.map((item, index) => {
		const newIndex = (index + 1).toString().padStart(2, '0');
		const newPath = `/${path}/${newIndex}`;
		const newName = `/${path}/${String(item.name)}`;
		return {
			path: newPath,
			name: newName,
			component: item.component,
			children: item.children ? recursionRouter(item.children, `${path}/${newIndex}`) : [],
			meta: item.meta || {
				keepAlive: true,
				requiresAuth: true,
				title: item.name,
				key: newPath,
			},
		};
	});
	console.log(arr);

	return arr;
};
