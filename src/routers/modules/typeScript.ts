import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const routerArray = [];
const name = 'typeScript';
const routers = import.meta.glob('../../views/type-script/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/type-script\//, '').replace(/.vue/, '');
	const newPath = '/type-script/' + newName.substring(0, 2);
	routerArray.push({
		path: newPath,
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

// type-script模块
const tsRouter = [
	{
		path: '/type-script',
		component: Layout,
		name: name,
		redirect: '/type-script/01',
		children: routerArray,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
		},
	},
];

export default tsRouter;
