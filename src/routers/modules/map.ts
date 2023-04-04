import { Layout } from '@/routers/constant';

const routerArray = [];
const name = '/map/';
const routers = import.meta.glob('../../views/map/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/map\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: name + newPath,
		name: name + newName,
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: newName,
			key: name + newPath,
		},
		component: routers[i],
	});
}
// map模块
const mapRouter = [
	{
		path: '/map',
		component: Layout,
		name: 'map',
		children: routerArray,
		meta: {
			menuIndex: 4,
			keepAlive: true,
			requiresAuth: false,
			title: '地图',
			key: 'map',
		},
	},
];
export default mapRouter;
