import { Layout, filterModuleRoutes } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const name = 'hooks';
const routerArray = filterModuleRoutes(name);

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
			localSvgIcon: name,
		},
	},
];

export default hooksRouter;
