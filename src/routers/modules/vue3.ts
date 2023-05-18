import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

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
const name = 'vue3';
const pages: Array<Page> = [
	{
		name: '介绍',
		component: () => import('@/views/vue3/01.介绍/index.vue'),
	},
	{
		name: '响应式API',
		children: [
			{ name: '核心', component: () => import('@/views/vue3/02.响应式API/核心/index.vue') },
			{ name: '工具', component: () => import('@/views/vue3/02.响应式API/工具/index.vue') },
			{ name: '进阶', component: () => import('@/views/vue3/02.响应式API/进阶/index.vue') },
		],
	},
	{
		name: 'ref系列',
		children: [
			{ name: '用法', component: () => import('@/views/vue3/02.ref系列/index.vue') },
			{ name: '实现原理', component: () => import('@/views/vue3/02.ref系列/Implement.vue') },
		],
	},
	{ name: 'reactive系列', component: () => import('@/views/vue3/03.reactive系列/index.vue') },
	{ name: 'to系列', component: () => import('@/views/vue3/04.to系列/index.vue') },
	{ name: 'computed', component: () => import('@/views/vue3/05.computed/index.vue') },
	{ name: 'watch', component: () => import('@/views/vue3/06.watch/index.vue') },
	{ name: 'watchEffect', component: () => import('@/views/vue3/07.watchEffect/index.vue') },
	{
		name: '组件通信',
		component: () => import('@/views/vue3/08.组件通信/index.vue'),
	},
];

//递归路由
const recursionRouter = (routers: Array<Page>, path = '/vue3') => {
	const arr: Array<Page> = routers.map((item, index) => {
		const newIndex = (index + 1).toString().padStart(2, '0');
		const newPath = `${path}/${newIndex}`;
		const newName = '/vue3/' + item.name;
		return {
			path: newPath,
			name: newName,
			component: item.component,
			children: item.children ? recursionRouter(item.children, newPath) : [],
			meta: item.meta || {
				keepAlive: true,
				requiresAuth: true,
				title: item.name,
				key: newPath,
			},
		};
	});
	return arr;
};

// vue3模块
const vue3Router = [
	{
		path: '/vue3',
		component: Layout,
		name: name,
		redirect: '/vue3/01',
		children: recursionRouter(pages),
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'vuejs',
		},
	},
];

export default vue3Router;
