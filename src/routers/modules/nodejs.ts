import { Layout, recursionRouter } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const name = 'nodejs';

const pages = [
	{
		name: '介绍',
		component: () => import('@/views/nodejs/01.介绍/index.vue'),
	},
	{
		name: '内置模块',
		children: [{ name: 'http模块', component: () => import('@/views/nodejs/02.内置模块/01.http.vue') }],
	},
];
// nodejs模块
const nodejsRouter = [
	{
		path: '/nodejs',
		component: Layout,
		name: name,
		redirect: '/nodejs/01',
		children: recursionRouter(pages, name),
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'Nodejs',
		},
	},
];

export default nodejsRouter;
