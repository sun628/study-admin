import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';
// 首页模块
const name = 'home';
const homeRouter: Array<RouteRecordRaw> = [
	{
		path: '/home',
		component: Layout,
		redirect: '/home/index',
		name: name,
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
			localSvgIcon: 'home',
			key: name,
			menuIndex: MatchMenu[name],
		},
	},
];

export default homeRouter;
