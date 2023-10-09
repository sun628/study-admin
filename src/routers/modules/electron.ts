import { Layout, filterModuleRoutes } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const name = 'electron';

// electron模块
const electronRouter = [
	{
		path: '/electron',
		component: Layout,
		name: name,
		children: filterModuleRoutes(name),
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
