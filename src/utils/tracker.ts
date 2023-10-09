import Tracker from 'nuanyang-tracker';

// 自定义类型，合并 Tracker 类的构造函数参数与配置对象参数类型
type TrackerOptions = ConstructorParameters<typeof Tracker>[0];

const trackerOptions: TrackerOptions = {
	uuid: '',
	requestUrl: 'http://localhost:9000/api/track',
	historyTracker: false,
	hashTracker: false,
	domTracker: true,
	jsError: true,
	sdkVersion: '1.0.0',
};

const tracker = new Tracker(trackerOptions);

export default tracker;
