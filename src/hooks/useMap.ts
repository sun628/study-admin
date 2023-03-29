import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';

interface Map {
	map: object;
	AMap: object;
}
/**
 * 初始化地图
 * @param id 地图容器id
 * @param config 地图配置
 * @returns
 * @example
 * const { map, AMap } = await initAMap('container', {
 *   zoom: 11, //级别
 *  center: [116.397428, 39.90923], //中心点坐标
 * );
 */
export const initMap = (id = 'MvMap', config = {}) => {
	return new Promise<Map>((resolve, reject) => {
		AMapLoader.load({
			key: 'd64a526f93c64d766b15ffbdd5aeac7d', // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: [], //插件列表
		})
			.then((AMap) => {
				const map = new AMap.Map(id, {
					zoom: 11, //级别
					center: [116.397428, 39.90923], //中心点坐标
					...config,
				});
				resolve({
					map,
					AMap,
				});
			})
			.catch((e) => {
				console.log('高德地图错误', e);
				reject(e);
			});
	});
};
