import { customRef } from 'vue';

/**
 * @description 自定义防抖Ref
 * @param value 数据值
 * @param delay 延迟时间
 * @returns value
 */
export const useDebouncedRef = (value: number | string, delay: number = 300) => {
	let timer: any;
	return customRef((track, trigger) => {
		return {
			get: () => {
				track();
				return value;
			},
			set: (newVal: any) => {
				timer && clearTimeout(timer);
				timer = setTimeout(() => {
					trigger();
					value = newVal;
				}, delay);
			},
		};
	});
};

// 自定义节流Ref
export const useThrottledRef = (value: number | string, delay: number = 300) => {
	let timer: NodeJS.Timeout | null = null;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(newVal) {
				if (!timer) {
					timer = setTimeout(() => {
						trigger();
						value = newVal;
						timer = null;
					}, delay);
				}
			},
		};
	});
};
