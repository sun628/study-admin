import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
	{
		path: '/home',
		component: Layout,
		redirect: '/home/index',
		name: 'home',
		children: [
			{
				path: '/home/index',
				name: 'welcome',
				component: () => import('@/views/home/index.vue'),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: 'welcome',
					key: 'welcome',
				},
			},
		],
		meta: {
			keepAlive: true,
			requiresAuth: false,
			title: '主页',
			key: 'home',
			menuIndex: 0,
		},
	},
];

export default homeRouter;
