import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';
const name = 'vue3';
const pageMoudles = import.meta.glob('../../views/vue3/**/page.ts', { eager: true, import: 'default' });
const compMoudles = import.meta.glob('../../views/vue3/**/index.vue');
const routers = Object.entries(pageMoudles).map(([pathPage, config]) => {
	const compPath = pathPage.replace(/page.ts/, 'index.vue');
	const name = pathPage.replace(/..\/..\/views/, '').replace(/\/page.ts/, '');
	const path = name.split('.')[0];
	return {
		path: path,
		name: name,
		component: compMoudles[compPath],
		meta: config,
	};
});
// vue3模块
const vue3Router = [
	{
		path: '/vue3',
		component: Layout,
		name: name,
		redirect: '/vue3/01',
		children: routers,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
		},
	},
];

export default vue3Router;
