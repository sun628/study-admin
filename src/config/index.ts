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

export const successCode = [200, 201, 204, 10000];

// * 项目配置项

// api地址
export const API = import.meta.env.VUE_APP_API;

// music api地址
export const MUSIC_API = import.meta.env.VUE_APP_MUSIC_API;
