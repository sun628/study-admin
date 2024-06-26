import { RouteRecordRaw } from 'vue-router';

// 错误页面模块
const errorRouter: Array<RouteRecordRaw> = [
	{
		path: '/403',
		name: '403',
		component: () => import('@/components/error/403.vue'),
		meta: {
			requiresAuth: true,
			title: '403页面',
			key: '403',
		},
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/error/404.vue'),
		meta: {
			requiresAuth: false,
			title: '404页面',
			key: '404',
		},
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/components/error/500.vue'),
		meta: {
			requiresAuth: false,
			title: '500页面',
			key: '500',
		},
	},
];

export default errorRouter;
