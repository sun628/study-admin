import { Layout } from '@/routers/constant';

const routerArray = [];
const name = '/electron/';
const routers = import.meta.glob('../../views/electron/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/electron\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: name + newPath,
		name: name + newName,
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: newName,
			key: name + +newPath,
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
		children: routerArray,
		meta: {
			menuIndex: 1,
			keepAlive: true,
			requiresAuth: false,
			title: 'electron',
			key: 'electron',
		},
	},
];
export default electronRouter;
