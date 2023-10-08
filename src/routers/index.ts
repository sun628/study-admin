import router from '@/routers/router';
import NProgress from '@/config/nprogress';
import { ROUTER_WHITE_LIST } from '@/config';
import { useUserStore } from '@/store/modules/user';
import { AxiosCanceler } from '@/api/helper/axiosCancel';
import tracker from '@/utils/tracker';
console.log('🚀 ~ file: index.ts:7 ~ tracker:', tracker.data);
const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	tracker.sendTracker({ path: to.path });
	const userStore = useUserStore();
	NProgress.start();
	// 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// 动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	// 判断当前路由是否需要访问权限
	if (!to.matched.some((record) => record.meta.requiresAuth)) return next();

	// 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();

	// 判断是否有 Token，没有重定向到 login 页面
	if (!userStore.token) return next({ path: '/login', replace: true });
	next();
});

router.afterEach((to) => {
	NProgress.done();
});

export default router;
