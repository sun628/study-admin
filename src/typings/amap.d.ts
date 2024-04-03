// 将声明文件通过 include/import/typeRoots 等方式引入
// in amap.d.ts
import 'amap-jsapi-v2-types';

declare global {
	// ts namespace/interface 会合并声明
	namespace AMap {
		// 目前大多数类型声明，出于避免严格考虑，采用 type 而不是 interface
		// 建议扩展新类型并使用
		export type ExtraMarkerOptions = AMap.MarkerOptions & {
			newProperties: string;
		};
		export class ExtraMarker extends AMap.Marker {
			constructor(opt?: ExtraMarkerOptions);
			newMethod(): void;
		}
	}

	// 对 amap type 做扩展
	namespace AMapUI {
		export type SimpleMarkerOptions = Omit<AMap.MarkerOptions, 'content'> & {
			iconTheme?: string;
			iconStyle?: string | object;
			iconLabel?: string | object;
			showPositionPoint?: boolean | object;
			containerClassNames?: string;
		};
	}
}
