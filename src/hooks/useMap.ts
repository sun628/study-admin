import '@amap/amap-jsapi-types';
import AMapLoader from '@amap/amap-jsapi-loader';
import { MAP_KEY } from '@/config';
/**
 * @description 初始化地图
 * @param {string} id 地图容器id
 * @param {Object} mapOptions 地图配置
 */
export const initMap = (id: string | HTMLDivElement, mapOptions: Partial<AMap.MapOptions> | undefined) => {
	return new Promise<AMap.Map>((resolve, reject) => {
		AMapLoader.load({
			key: MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
			version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
			plugins: [], //插件列表
			AMapUI: {
				version: '1.1',
				plugins: ['geo/DistrictExplorer'],
			},
		})
			.then((AMap) => {
				const map = new AMap.Map(id, mapOptions);
				resolve(map);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

let borderPolygon: AMap.Polygon | null = null;
/**
 * @description 加载地图UI组件
 * @param {AMap.Map} map 地图实例
 * @returns {number | ConcatArray<number>} cityCodes 城市编码
 **/
export const loadMapUI = (map: AMap.Map, cityCodes: number | ConcatArray<number>) => {
	const countryCode = 100000; // 全国
	const provCodes: string | any[] = [];
	function getAllRings(feature: any) {
		const coords = feature.geometry.coordinates;
		const rings: any[] = [];
		for (let i = 0, len = coords.length; i < len; i++) {
			rings.push(coords[i][0]);
		}
		return rings;
	}
	function getLongestRing(feature: any) {
		const rings = getAllRings(feature);
		rings.sort((a, b) => {
			return b.length - a.length;
		});
		return rings[0];
	}
	AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer: any) => {
		const districtExplorer = new DistrictExplorer({
			map: map,
		});
		if (typeof cityCodes === 'number') {
			cityCodes = [cityCodes];
		}
		// 全国省市区数据
		districtExplorer.loadMultiAreaNodes(
			// 只需加载全国和市，全国的节点包含省级
			[countryCode].concat(cityCodes),
			function (_error: any, areaNodes: string | any[]) {
				if (!areaNodes) return;
				const countryNode = areaNodes[0];
				const cityNodes = areaNodes.slice(1);
				const path: number[] = [];
				// 首先放置背景区域，这里是大陆的边界
				path.push(getLongestRing(countryNode.getParentFeature()));
				for (let i = 0, len = provCodes.length; i < len; i++) {
					// 逐个放置需要镂空的省级区域
					// eslint-disable-next-line prefer-spread
					path.push.apply(path, getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])));
				}
				for (let i = 0, len = cityNodes.length; i < len; i++) {
					// 逐个放置需要镂空的市级区域
					// eslint-disable-next-line prefer-spread
					path.push.apply(path, getAllRings(cityNodes[i].getParentFeature()));
				}
				// 绘制带环多边形
				if (borderPolygon) {
					map.remove(borderPolygon);
					borderPolygon = null;
				}
				// https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
				borderPolygon = new (AMap.Polygon as any)({
					bubble: true,
					lineJoin: 'round',
					strokeColor: '#59A1BC', // 线颜色
					strokeOpacity: 0.8, // 线透明度
					strokeWeight: 2, // 线宽
					fillColor: '#000000', // 填充色
					fillOpacity: 0.35, // 填充透明度
					map: map,
					path: path,
				});
			}
		);
	});
};

/**
 * @description 添加点标记
 * @param {AMap.MarkerOptions} opts 点标记参数
 * @param {Function} callback 点标记点击事件
 * @returns {AMap.Marker} 点标记对象
 */
export const addMarker = (opts: AMap.MarkerOptions, callback: (event: { target: AMap.Marker }) => void) => {
	const marker = new AMap.Marker({
		position: opts.position,
		icon: opts.icon, // 添加 Icon 实例
		cursor: 'pointer',
		...opts,
	});
	if (callback) marker.on('click', callback);
	return marker;
};

/**
 * 构造折线对象，支持 lineString 和 MultiLineString
 * @param {AMap.PolylineOptions} opts 折线参数
 * @returns {AMap.Polyline} 折线对象
 */
export const addPolyline = (opts: AMap.PolylineOptions) => {
	return new AMap.Polyline({
		path: opts.path,
		cursor: 'pointer', // 指定鼠标悬停时的鼠标样式，自定义cursor
		...opts,
	});
};

/**
 * @description 信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸。 * // [亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/infowindow/default-style-infowindow)
 * @name InfoWindow
 * @extends {OverlayDOM}
 * @param {InfoOptions} opts 信息窗体参数
 * @param {boolean} opts.isCustom 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
 * @param {boolean} opts.autoMove 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
 * @param {number[]} opts.avoid autoMove 为 true 时，自动平移到视野内后的上右下左的避让宽度。默认值：[20, 20, 20, 20]
 * @param {boolean} opts.closeWhenClickMap 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
 * @param {String|HTMLElement} opts.content 显示内容，可以是HTML要素字符串或者HTMLElement对象, [自定义窗体示例](https://lbs.amap.com/api/jsapi-v2/example/infowindow/custom-style-infowindow)
 * @param {Size} opts.size 信息窗体尺寸（isCustom为true时，该属性无效）
 * @param {string} opts.anchor 信息窗体锚点。默认值：'bottom-center'。可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
 * @param {Vector|Pixel} opts.offset 信息窗体显示位置偏移量。默认基准点为信息窗体的底部中心。默认值: [0, 0]
 * @param {Vector|LngLat} opts.position 信息窗体显示基点位置
 * @example
 * const infoWindow = createInfoWindow('这是一个自定义的信息窗体');
 * infoWindow.open(map, map.getCenter());
 */
export const createInfoWindow = (options: string | AMap.InfoOptions): AMap.InfoWindow => {
	if (typeof options === 'string') {
		return new AMap.InfoWindow({
			isCustom: true, // 使用自定义窗体
			content: options, // 信息窗体的内容可以是任意 html 片段
			offset: new AMap.Pixel(16, -45),
		});
	} else {
		return new AMap.InfoWindow(options);
	}
};

/**
 * @description 海量点类
 * @name MassMarks
 * @extends {AMap.Event}
 * @param {MassData[]} data 海量点数据参数
 * @param {LngLat} data.lnglat 经纬度
 * @param {number} data.style 样式索引值
 * @param {MassMarkersOptions[]} opts 海量点参数
 * @param {number} opts.zIndex 图标 url
 * @param {number} opts.opacity 图标显示大小
 * @param {Vector2} opts.zooms 旋转角度
 * @param {string} opts.cursor 锚点位置
 * @param {MassMarkersStyleOptions | MassMarkersStyleOptions[]} opts.style 点展示优先级
 * @param {string} opts.style.url 图标 url
 * @param {Vector2 | Size} opts.style.size 图标显示大小
 * @param {number} opts.style.rotation 旋转角度
 * @param {pixel} opts.style.anchor 锚点位置
 * @param {number} opts.style.zIndex 点展示优先级，默认为使用样式的索引值。
 * @example
 * // 创建 MassMarks 实例，[亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/marker/massmarks)
 * var massMarks = new AMap.MassMarks(data, {
 *     opacity: 0.8,
 *     zIndex: 111,
 *     cursor: 'help',
 *     style: style,
 * });
 * // 将海量点实例添加到地图上
 * map.add(massMarks);
 */
export const addMassMarkers = (data: AMap.MassData[], opts: AMap.MassMarkersOptions, callback: (e: Event) => void) => {
	const massMarks = new AMap.MassMarks(data, opts);
	if (callback) massMarks.on('click', callback);
	return massMarks;
};
