import { Layout, filterModuleRoutes } from '@/routers/constant';
import { MatchMenu } from '@/enums/configEnum';

const name = 'typeScript';

// type-script模块
const tsRouter = [
	{
		path: '/typeScript',
		component: Layout,
		name: name,
		redirect: '/typeScript/01',
		children: filterModuleRoutes(name),
		meta: {
			menuIndex: MatchMenu[name],
			keepAlive: true,
			requiresAuth: false,
			title: name,
			key: name,
			localSvgIcon: 'typescript',
			transitionName: 'fade-transform',
		},
	},
];

export default tsRouter;
