import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types';

/**
 * 初始化地图
 * @param id 地图容器id
 * @param MapOptions 地图配置
 * @returns
 */
export const initMap = (id = 'MvMap', MapOptions: AMap.MapOptions = {}) => {
	return new Promise<{ map: AMap.Map }>((resolve, reject) => {
		AMapLoader.load({
			key: 'd64a526f93c64d766b15ffbdd5aeac7d', // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: [], //插件列表
		})
			.then((AMap) => {
				const map = new AMap.Map(id, {
					zoom: 11, //级别
					center: [116.397428, 39.90923], //中心点坐标
					...MapOptions,
				});
				resolve(map);
			})
			.catch((e) => {
				console.log('高德地图错误', e);
				reject(e);
			});
	});
};

/**
 * @method {*} addMarker 添加点标记
 * @param {*} map 地图实例
 * @param {Array} markerOptions 需要定位的点经纬度集合，结构如 [{ position:[116.405467, 39.907761] ,title:'广州'}]
 * @param {Function} callback 点标记点击事件回调
 * @returns 点标记集合markers
 */
export const addMarker = (map: AMap.Map, markerOptions: any[], callback?: (e: any) => void) => {
	const markers = markerOptions.map((item: AMap.MarkerOptions) => {
		const mark: AMap.Marker = new AMap.Marker(item);
		if (callback) mark.on('click', callback);
		return mark;
	});
	map.add(markers);
	return markers;
};

/**
 * @method {*} removeMarker 移除点标记
 * @param {*} map 地图实例
 * @param {Array} markers 由addMarker返回的点标记集合
 */
export const removeMarker = (map: AMap.Map, markers: Array<AMap.Marker>) => {
	map.remove(markers);
};
/**
 * 信息窗体
 * @param {*} map 地图实例
 * @param {Array} center 经纬度 [116.397389,39.909466]
 * @param {String} content 信息窗体内容
 */
export const showInfoWindow = (map: AMap.Map, center: AMap.Vector2, content: any) => {
	const infoWindow = new AMap.InfoWindow({
		content: content,
	});
	infoWindow.open(map, center);
	return infoWindow;
};
