/**
 * @description ResizeObserverManager 类 (添加图表响应式)
 */
export class ResizeObserverManager {
	private observers: WeakMap<Element, Set<() => void>>;
	private resizeObserver: ResizeObserver;

	constructor() {
		this.observers = new WeakMap();
		this.resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const resizeCallbacks = this.observers.get(entry.target);
				resizeCallbacks?.forEach((callback) => {
					try {
						callback();
					} catch (error) {
						console.error('Resize observer callback error:', error);
					}
				});
			});
		});
	}

	/**
	 * @description 添加观察者
	 * @param {Element} element 目标元素
	 * @param {() => void} callback 回调函数
	 * @example resizeObserverManager.observe(chartRef.value, resizeChart);
	 */
	observe(element: Element, callback: () => void) {
		if (!(element instanceof Element)) {
			throw new Error('The provided target is not an Element.');
		}

		let callbacks = this.observers.get(element);
		if (!callbacks) {
			callbacks = new Set();
			this.observers.set(element, callbacks);
			this.resizeObserver.observe(element);
		}
		// Avoid adding the same callback multiple times
		if (!callbacks.has(callback)) {
			callbacks.add(callback);
		}
	}

	/**
	 * @description 移除观察者
	 * @param {Element} element 目标元素
	 * @param {() => void} callback 回调函数
	 * @example resizeObserverManager.unobserve(chartRef.value, resizeChart);
	 */
	unobserve(element: Element, callback: () => void) {
		const callbacks = this.observers.get(element);
		if (callbacks) {
			callbacks.delete(callback);
			// Unobserve the element if no callbacks are left
			if (callbacks.size === 0) {
				this.resizeObserver.unobserve(element);
				this.observers.delete(element);
			}
		}
	}
}

// 单例模式，确保整个应用中只有一个 ResizeObserverManager 实例
export const resizeObserverManager = new ResizeObserverManager();
