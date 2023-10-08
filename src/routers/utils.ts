const viewRouters = import.meta.glob('../views/**/*.vue');

/**
 * @description: default layout
 */
// export const Layout = () => import("@/layouts/indexAsync.vue");
export const Layout = () => import('@/layouts/index.vue');

/**
 * @description 过滤模块路由
 * @param {string} moduleName 模块名
 * @returns {Array} 路由数组
 **/
export function filterModuleRoutes(moduleName: string) {
	const routerArray = [];

	const routers = Object.fromEntries(Object.entries(viewRouters).filter(([key]) => key.startsWith(`../views/${moduleName}/`)));

	for (const i in routers) {
		const newName = i.replace(new RegExp(`../views/${moduleName}/`), '').replace(/.vue/, '');
		const newPath = `/${moduleName}/${newName}`;
		routerArray.push({
			path: newPath,
			name: newName,
			meta: {
				keepAlive: true,
				requiresAuth: true,
				title: newName,
				key: newPath,
			},
			component: routers[i],
		});
	}
	return routerArray;
}
