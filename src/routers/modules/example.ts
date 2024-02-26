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
		name: '03.源码实现',
		children: [
			{ name: 'Promise实现', component: () => import('@/views/example/03.源码实现/01.Promise实现.vue') },
			{ name: 'call、apply、bind', component: () => import('@/views/example/03.源码实现/02.call、apply、bind.vue') },
		],
	},
	{
		name: '04.echarts',
		children: [
			{ name: '01.第三方VChart', component: () => import('@/views/example/04.echarts/01.vue-chart.vue') },
			{ name: '02.useECharts', component: () => import('@/views/example/04.echarts/02.useECharts.vue') },
		],
	},
	{
		name: '05.自定义指令',
		children: [
			{ name: '01.复制指令', component: () => import('@/views/example/05.自定义指令/01.复制指令.vue') },
			{ name: '02.水印指令', component: () => import('@/views/example/05.自定义指令/02.水印指令.vue') },
		],
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
