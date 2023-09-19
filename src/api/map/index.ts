import request from '@/utils/request';
export namespace mapApi {
	export interface ReqHighWayVideo {
		parameters: object;
	}
}
/**
 *
 * 获取音乐api接口集合
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export const getHighWayVideosApi = (data = { parameters: {} }) => {
	return request.service({
		url: '/FLOW_AC/rttraffic/gisData/getVideoList',
		method: 'POST',
		data,
		headers: { Unit: 'NJY_OLM' },
	});
};
export const getVideoUrlApi = (data: { cameraNum: string }) => {
	return request.service({
		url: '/FLOW_AC/rttraffic/gisData/getVideoPlayAddress',
		method: 'POST',
		data: {
			parameters: data,
		},
		headers: { Unit: 'NJY_OLM' },
	});
};
