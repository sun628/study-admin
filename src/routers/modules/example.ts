import { Layout, recursionRouter } from '@/routers/constant';
import { MatchMenu } from '@/routers/configEnum';

const name = 'example';

const pages = [
	{
		name: '01.虚拟列表',
		component: () => import('@/views/example/01.虚拟列表/index.vue'),
	},
	{
		name: '02.动画',
		children: [
			{ name: '01.数字动画', component: () => import('@/views/example/02.动画/01.数字动画.vue') },
			{ name: '02.滚动动画', component: () => import('@/views/example/02.动画/02.滚动动画.vue') },
		],
	},
	{
		name: '03.Promise实现',
		component: () => import('@/views/example/03.Promise实现/index.vue'),
	},
];

// exampleRouter
const exampleRouter = [
	{
		path: '/example',
		component: Layout,
		name: 'example',
		children: recursionRouter(pages, name),
		meta: {
			menuIndex: MatchMenu['example'],
			keepAlive: false,
			requiresAuth: false,
			title: '功能',
			key: 'example',
			localSvgIcon: 'example',
		},
	},
];

export default exampleRouter;