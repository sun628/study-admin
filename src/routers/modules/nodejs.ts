import { Layout } from '@/routers/constant';

const routerArray = [];
const routers = import.meta.glob('../../views/nodejs/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/nodejs\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: '/nodejs/' + newPath,
		name: newName,
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: newName,
			key: newPath,
		},
		component: routers[i],
	});
}
// nodejs模块
const nodejsRouter = [
	{
		path: '/nodejs',
		component: Layout,
		name: 'nodejs',
		redirect: '/nodejs/01',
		children: routerArray,
		meta: {
			menuIndex: 3,
			keepAlive: true,
			requiresAuth: false,
			title: 'nodejs',
			key: 'nodejs',
		},
	},
];

export default nodejsRouter;
