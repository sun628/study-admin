import { onMounted, onUnmounted } from 'vue';

/**
 * @description 添加事件监听器
 * @param {EventTarget} target 事件目标
 * @param {string} event 事件名称
 * @param {EventListenerOrEventListenerObject} callback 事件回调
 * @param {EventListenerOptions | boolean } options 事件选项 (可选) 默认值为false（即 使用事件冒泡），与capture用法相同。
 * @param {boolean} options.capture 是否在捕获阶段调用
 * @param {boolean} options.once 是否只调用一次
 * @param {boolean} options.passive 是否以被动方式调用
 * @example useEventListener(document.body, 'click', () => console.log('Clicked!'));
 * @example useEventListener(document.body, 'click', () => console.log('Clicked!'), { capture: true });
 * @example useEventListener(document.body, 'click', () => console.log('Clicked!'), true);
 * @returns {void}
 **/
export function useEventListener(
	target: EventTarget,
	event: string,
	callback: EventListenerOrEventListenerObject,
	options?: AddEventListenerOptions | boolean
): void {
	const addEventListener = () => target.addEventListener(event, callback, options);
	const removeEventListener = () => target.removeEventListener(event, callback, options);

	onMounted(addEventListener);
	onUnmounted(removeEventListener);
}
