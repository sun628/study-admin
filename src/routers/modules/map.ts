import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';
const routerArray = [];
const name = 'map';
const routers = import.meta.glob('../../views/map/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/map\//, '').replace(/.vue/, '');
	const newPath = '/map/' + newName.substring(0, 2);
	routerArray.push({
		path: newPath,
		name: name + newName,
		meta: {
			keepAlive: true,
			requiresAuth: true,
			title: newName,
			key: newPath,
		},
		component: routers[i],
	});
}
// map模块
const mapRouter = [
	{
		path: '/map',
		component: Layout,
		name: name,
		children: routerArray,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: '地图',
			key: name,
			localSvgIcon: 'map-logo',
		},
	},
];
export default mapRouter;
