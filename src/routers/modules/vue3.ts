import { Layout, recursionRouter } from '@/routers/constant';
import { MatchMenu } from '@/routers/configEnum';

const name = 'vue3';

const pages = [
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
		name: '组件通信',
		component: () => import('@/views/vue3/03.组件通信/index.vue'),
	},
	{
		name: '组件v-model',
		component: () => import('@/views/vue3/04.组件v-model/index.vue'),
	},
	{
		name: '渲染机制',
		component: () => import('@/views/vue3/05.渲染机制/index.vue'),
	},
];

// vue3模块
const vue3Router = [
	{
		path: '/vue3',
		component: Layout,
		name: name,
		redirect: '/vue3/01',
		children: recursionRouter(pages, name),
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'vuejs',
			transitionName: 'fade-transform',
		},
	},
];

export default vue3Router;
