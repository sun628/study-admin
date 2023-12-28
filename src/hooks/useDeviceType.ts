import { ref, Ref } from 'vue';
import { useEventListener } from '@/hooks/useEventListener';
import { DeviceType } from '@/enums';

/**
 * @description 检查设备类型
 * @returns {DeviceType} deviceType 设备类型 'mobile' | 'ipad' | 'desktop'
 * @example const { deviceType } = useDeviceType();
 * @example if (deviceType.value === 'mobile') { ... }
 **/
export function useDeviceType(): { deviceType: Ref<DeviceType> } {
	const deviceType: Ref<DeviceType> = ref(DeviceType.Desktop);

	function updateDeviceType(): void {
		const width: number = window.innerWidth;
		if (width <= 767) {
			deviceType.value = DeviceType.Mobile;
		} else if (width <= 991) {
			deviceType.value = DeviceType.Ipad;
		} else {
			deviceType.value = DeviceType.Desktop;
		}
	}

	updateDeviceType();

	useEventListener(window, 'resize', updateDeviceType);

	return { deviceType };
}
