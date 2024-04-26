// ? 全局不动配置项 只做导出不做修改

// * 首页地址（默认）
export const HOME_URL = '/home/index';

// * 默认主题颜色
export const DEFAULT_PRIMARY = '#FF5C93';
// 登录页地址（默认）
export const LOGIN_URL = '/login';

// * Tabs（白名单地址，不需要添加到 tabs 的路由地址）
export const ROUTER_WHITE_LIST: string[] = ['/403', '/404', '/500', '/layout', '/login'];

// * 高德地图key
export const MAP_KEY = '916919393f49e9132baa000648891c5f';

// 安全密钥
export const SECURITY_JS_CODE = '';

export const successCode = [200, 201, 204, 10000];

// 地图配置项
export const MAP_OPTIONS: AMap.MapOptions = {
	center: [119.1521809038, 33.2218222997],
	animateEnable: true,
	zoomEnable: true,
	rotateEnable: true,
	zoom: 8,
	viewMode: '3D',
};
