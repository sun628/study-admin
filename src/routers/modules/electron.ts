import { Layout } from '@/routers/constant';

const routerArray = [];
const routers = import.meta.glob('../../views/electron/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/electron\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: '/electron/' + newPath,
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
// electron模块
const electronRouter = [
	{
		path: '/electron',
		component: Layout,
		name: 'electron',
		redirect: '/electron/01',
		children: routerArray,
		meta: {
			index: 1,
			keepAlive: true,
			requiresAuth: false,
			title: 'electron',
			key: 'electron',
		},
	},
];
export default electronRouter;
