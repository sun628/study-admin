import { Layout } from '@/routers/constant';

const routerArray = [];
const routers = import.meta.glob('../../views/echarts/*.vue');
for (const i in routers) {
	const newName = i.replace(/..\/..\/views\/echarts\//, '').replace(/.vue/, '');
	const newPath = newName.substring(0, 2);
	routerArray.push({
		path: '/echarts/' + newPath,
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
const echartsRouter = [
	{
		path: '/echarts',
		component: Layout,
		name: 'echarts',
		redirect: '/echarts/01',
		children: routerArray,
		meta: {
			index: 4,
			keepAlive: true,
			requiresAuth: false,
			title: 'echarts',
			key: 'echarts',
		},
	},
];
export default echartsRouter;
