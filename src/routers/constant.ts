import { MatchMenu } from '@/enums/configEnum';

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

// 获取所有的路由
const viewRouters = import.meta.glob('../views/**/*.vue');

/**
 * @description 过滤模块路由  TODO: 处理一级路由
 * @param {string} moduleName 模块名
 * @returns {Array} 路由数组
 **/
export function filterModuleRoutes(moduleName: keyof typeof MatchMenu, metaConfig?: RouterMeta) {
	const routerArray = [];

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
