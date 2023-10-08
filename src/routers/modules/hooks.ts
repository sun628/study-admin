import { Layout, filterModuleRoutes } from '@/routers/utils';
import { MatchMenu } from '@/enums/configEnum';
// 使用示例
const name = 'hooks';
const routerArray = filterModuleRoutes(name);

console.log('routerArray', routerArray);

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
