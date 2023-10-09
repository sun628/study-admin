import { Layout, filterModuleRoutes } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';
const name = 'map';

// map模块
const mapRouter = [
	{
		path: '/map',
		component: Layout,
		name: name,
		children: filterModuleRoutes(name),
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
