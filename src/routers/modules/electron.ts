import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';
const routerArray = [];
const name = 'electron';
const routers = import.meta.glob('../../views/electron/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/electron\//, '').replace(/.vue/, '');
	const newPath = '/electron/' + newName.substring(0, 2);
	routerArray.push({
		path: newPath,
		name: name + '/' + newName,
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
		name: name,
		children: routerArray,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'logo-electron',
		},
	},
];
export default electronRouter;
