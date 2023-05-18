import { customRef } from 'vue';

export function useDebouncedRef<T = any>(value: T, delay = 200) {
	let timeout: string | number | NodeJS.Timeout | undefined;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					value = newValue;
					trigger();
				}, delay);
			},
		};
	});
}
