export class ResizeObserverManager {
	observers: Map<Element, Set<() => void>>;
	resizeObserver: ResizeObserver;
	constructor() {
		this.observers = new Map();
		this.resizeObserver = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				const resizeCallbacks = this.observers.get(entry.target);
				resizeCallbacks?.forEach((callback) => callback());
			});
		});
	}

	observe(element: Element, callback: () => void) {
		if (!this.observers.has(element)) {
			this.observers.set(element, new Set());
			this.resizeObserver.observe(element);
		}
		const observerSet = this.observers.get(element);
		observerSet && observerSet.add(callback);
	}

	unobserve(element: Element, callback: () => void) {
		const callbacks = this.observers.get(element);
		if (callbacks) {
			callbacks.delete(callback);
			if (callbacks.size === 0) {
				this.resizeObserver.unobserve(element);
				this.observers.delete(element);
			}
		}
	}
}

// 单例模式，确保整个应用中只有一个 ResizeObserverManager 实例
export const resizeObserverManager = new ResizeObserverManager();
