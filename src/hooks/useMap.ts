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
 * 点标记
 *
 * @public
 * @class Marker
 * @name Marker
 * @param {MarkerOptions} opts 点标记参数
 * @param {Map} opts.map 要显示该marker的地图对象
 * @param {Vector2|LngLat} opts.position 点标记在地图上显示的位置
 * @param {Icon | string} opts.icon 在点标记中显示的图标。可以传一个图标地址，也可以传Icon对象。有合法的content内容设置时，此属性无效。
 * @param {string | HTMLElement} opts.content 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
 * @param {string} opts.title 鼠标滑过点标记时的文字提示。不设置则鼠标滑过点标无文字提示。
 * @param {boolean} opts.visible 点标记是否可见，默认值：true
 * @param {number} opts.zIndex 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
 * @param {Vector2 | Pixel} opts.offset 点标记显示位置偏移量，默认值为[0,0]。Marker指定position后，默认以marker左上角位置为基准点（若设置了anchor，则以anchor设置位置为基准点），对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
 * @param {string | Vector2} opts.anchor 设置点标记锚点，可选值：'top-left','top-center','top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right' [相关示例](https://lbs.amap.com/api/jsapi-v2/example/marker/marker-anchor)
 * @param {number} opts.angle 点标记的旋转角度，，广泛用于改变车辆行驶方向。默认值：0
 * @param {boolean} opts.clickable 点标记是否可点击，默认值: true
 * @param {boolean} opts.draggable 设置点标记是否可拖拽移动，默认值：false
 * @param {boolean} opts.bubble 事件是否冒泡，默认为 false
 * @param {Vector2} opts.zooms 点标记显示的层级范围，超过范围不显示。默认值：zooms: [2, 20]
 * @param {string} opts.cursor 指定鼠标悬停时的鼠，默认值：'pointer'
 * @param {boolean} opts.topWhenClick 鼠标点击时marker是否置顶，默认false ，不置顶
 * @param {object} opts.label 添加文本标注
 * @param {string} opts.label.content 文本标注的内容
 * @param {Pixel | Vector2 | number[]} opts.label.offset 为偏移量。如设置了 direction，以 direction 方位为基准点进行偏移。
 * @param {string} opts.label.direction 文本标注方位 可选值：'top'|'right'|'bottom'|'left'|'center'，默认值: 'right'。
 * @param {any} opts.extData 用户自定义属 ，支持JavaScript API任意数据类型，如 Marker的id等。可将自定义数据保存在该属性上，方便后续操作使用。
 * @example
 * var marker = new AMap.Marker({
 *     position: new AMap.LngLat(116.397428, 39.90923),
 *     icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
 *     anchor: 'bottom-center',
 * });
 * map.add(marker);
 */
export const addMarker = (opts: AMap.MarkerOptions, callback?: (e: Event) => void) => {
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
 * @implements {Event}
 * @public
 * @param opts  {PolylineOptions}
 * @param {Array<LngLat>|Array<Array<LngLat>>} opts.path  polyline 路径，支持 lineString 和 MultiLineString
 * @param {number} [opts.zIndex=10]  多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示
 * @param {boolean}  [opts.bubble = false] 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）
 * @param {string} [opts.cursor] 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
 * @param {string } [opts.strokeColor = #00D3FC] 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
 * @param {number} [opts.strokeOpacity = 0.5]  轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.5
 * @param {number} [opts.strokeWeight = 2]  轮廓线宽度
 * @param {number} [opts.borderWeight = 2]	描边线宽度
 * @param {boolean} [opts.isOutline=false]  是否显示描边,默认false
 * @param {number} [opts.borderWeight = 1]	描边的宽度，默认为1
 * @param {string} [opts.outlineColor=#00B2D5] 线条描边颜色，此项仅在isOutline为true时有效，默认：#00B2D5
 * @param {boolean} [opts.draggable=false] 设置多边形是否可拖拽移动，默认为false
 * @param {object} [opts.extData]  用户自定义属性，支持JavaScript API任意数据类型，如Polygon的id等
 * @param {'solid'|'dashed'} [opts.strokeStyle = solid]  轮廓线样式，实线:solid，虚线:dashed
 * @param {number[]}  [opts.strokeDasharray] 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：
 * 实线：[0,0,0]
 * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
 * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
 * @param {'miter'|'round'|'bevel'} [opts.lineJoin = miter] 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
 * @param {'butt'|'round'|'square'} [opts.lineCap = butt] 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
 * @param {boolean} [opts.geodesic=false] 是否绘制成大地线，默认false
 * @param {boolean} [opts.showDir=false] 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
 * @export
 * @class Polyline
 * @classdesc 折线，支持单条和多条折线
 */
export const addPolyline = (opts: AMap.PolylineOptions) => {
	const polyline = new AMap.Polyline({
		path: opts.path,
		cursor: 'pointer', // 指定鼠标悬停时的鼠标样式，自定义cursor
		borderWeight: 3, // 描边的宽度，默认为1
		strokeWeight: 5, // 线条宽度，单位：像素
		strokeOpacity: 1, // 轮廓线透明度，取值范围[0,1]，0 表示完全透明，1表示不透明
		lineJoin: 'round', // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
		lineCap: 'round', // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
		...opts,
	});
	return polyline;
};

/**
 * 信息窗体，地图仅可同时展示一个信息窗体，推荐为信息窗体通过样式显示设置尺寸。 * // [亲手试一试](https://lbs.amap.com/api/jsapi-v2/example/infowindow/default-style-infowindow)
 *
 * @public
 * @export
 * @class InfoWindow
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
 * var infoWindow = new AMap.InfoWindow({
 *    content: '信息窗体',
 *    anchor: 'bottom-center',
 * });
 * // 在地图上打开信息窗体
 * infoWindow.open(map, [116.397389,39.909466]);
 */
export const openInfoWindow = (map: AMap.Map, opts: AMap.InfoOptions, position: AMap.Vector2) => {
	const infoWindow = new AMap.InfoWindow({
		content: '信息窗体内容',
		offset: new AMap.Pixel(0, -30),
		...opts,
	});
	infoWindow.open(map, position);
	return infoWindow;
};

/**
 * 海量点类
 * @public
 * @name MassMarks
 * @class MassMarks
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
