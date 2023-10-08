import { Layout } from '@/routers/utils';
import { MatchMenu } from '@/enums/configEnum';

const routerArray = [];
const name = 'nodejs';
const routers = import.meta.glob('../../views/nodejs/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/nodejs\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: '/nodejs/' + newPath,
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
// nodejs模块
const nodejsRouter = [
	{
		path: '/nodejs',
		component: Layout,
		name: name,
		redirect: '/nodejs/01',
		children: routerArray,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'Nodejs',
		},
	},
];

export default nodejsRouter;
