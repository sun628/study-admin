import { Layout, recursionRouter } from '@/routers/constant';
import { MatchMenu } from '@/routers/configEnum';

const name = 'assembly';

const pages = [
	{
		name: '01.表格',
		component: () => import('@/views/assembly/01.table/index.vue'),
	},
	{
		name: '02.弹窗',
		component: () => import('@/views/assembly/02.dialog/index.vue'),
	},
];
// vue3模块
const assemblyRouter = [
	{
		path: '/assembly',
		component: Layout,
		name: name,
		redirect: '/assembly/01',
		children: recursionRouter(pages, name),
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: '公共组件',
			key: name,
			localSvgIcon: 'vuejs',
			transitionName: 'fade-transform',
		},
	},
];

export default assemblyRouter;
