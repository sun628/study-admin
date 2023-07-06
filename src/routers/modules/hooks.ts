import { Layout } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const routerArray = [];
const name = 'hooks';
const routers = import.meta.glob('../../views/hooks/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/hooks\//, '').replace(/.vue/, '');
	const newPath = '/hooks/' + newName;
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
const hooksRouter = [
	{
		path: '/hooks',
		component: Layout,
		name: name,
		children: routerArray,
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'hooks',
		},
	},
];

export default hooksRouter;
