import router from '@/routers/router';
import NProgress from '@/config/nprogress';
import { TABS_WHITE_LIST } from '@/config';
import { GlobalStore } from '@/store';
import { AxiosCanceler } from '@/api/helper/axiosCancel';

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	NProgress.start();
	// * 在跳转路由之前，清除所有的请求
	// axiosCanceler.removeAllPending();
	// * 判断当前路由是否需要访问权限

	if (!to.matched.some((record) => record.meta.requiresAuth)) return next();

	if (TABS_WHITE_LIST.includes(to.path)) {
		next(); //白名单直接跳转
	} else {
		const globalStore = GlobalStore();
		const token = globalStore.token;
		if (token === null || token === '') {
			next('/login');
		} else {
			next();
		}
		// NProgress.done();
		// return;
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
