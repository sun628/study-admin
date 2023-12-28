enum State {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

// _resolve
type Resolve<T> = (value?: T | PromiseLike<T>) => void;
// _reject
type Reject = (reason: any) => void;

type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void;

// 非函数 / 返回值/ promise
type OnFulfilled<T, TResult> = ((value: T) => TResult | PromiseLike<TResult>) | undefined | null;
type OnRejected<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null;
type onFinally = (() => void) | undefined | null;

interface Handler<T, TResult> {
	onFulfilled?: OnFulfilled<T, TResult>;
	onRejected?: OnRejected<TResult>;
	resolve: Resolve<TResult>;
	reject: Reject;
}

interface PromiseConstructor {
	new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>; // something
}

export default class MyPromise<T> {
	private state: 'pending' | 'fulfilled' | 'rejected' = 'pending'; // 状态
	private result!: T; // 结果
	private handlers: Array<Handler<T, any>> = []; // 回调
	constructor(executor: Executor<T>) {
		const resolve: Resolve<T> = (value) => {
			this.changeState(State.FULFILLED, value);
		};
		const reject: Reject = (reason) => {
			this.changeState(State.REJECTED, reason);
		};
		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	// 改变状态 保存结果 执行回调
	private changeState(state: State, result: any) {
		//  当状态不为pending时不执行 保证状态只能改变一次
		if (this.state !== State.PENDING) return;
		this.state = state;
		this.result = result;
		this.run(); // 当状态从pending改变时执行回调 ==> then方法处理异步时会触发
	}

	// 判断是否为promise
	private isPromiseLike<T>(val: any): val is PromiseLike<T> {
		return val && typeof val.then === 'function';
	}

	// 执行微任务 保证then方法中的回调在当前栈执行完毕后执行
	// p:为什么要用微任务而不是宏任务?
	// r:因为微任务的优先级高于宏任务, 保证then方法中的回调在当前栈执行完毕后执行
	// p: 如果不加微任务会怎么样?
	// r: 会导致then方法中的回调在当前栈执行完毕前执行, 会导致then方法中的回调执行时promise的状态还未改变
	private runMicroTask(callback: () => void) {
		// 32版本以下的浏览器不支持Promise
		if (typeof Promise !== 'undefined') {
			Promise.resolve().then(callback);
			return;
		}
		// 26版本以下的浏览器不支持MutationObserver 监控DOM变化
		if (typeof MutationObserver !== 'undefined') {
			const observer = new MutationObserver(callback);
			const textNode = document.createTextNode('1');
			observer.observe(textNode, { characterData: true });
			textNode.data = '2';
			return;
		}
		// 以上都不支持的话就用setTimeout
		setTimeout(callback);
	}

	/**
	 * @description  执行单个回调
	 * 情况1: 回调函数不是函数
	 * 情况2: 回调函数是函数
	 * 情况3: 返回结果是promise
	 * @param {OnFulfilled<T, TRes> | OnRejected<TRes> | undefined | null} callback 回调函数
	 * @param {Resolve<T>} resolve resolve
	 * @param {Reject} reject reject
	 * @return {*}
	 **/
	private runOne<TRes extends T | PromiseLike<T>>(
		callback: OnFulfilled<T, TRes> | OnRejected<TRes> | undefined | null,
		resolve: Resolve<T>,
		reject: Reject
	) {
		this.runMicroTask(() => {
			if (typeof callback !== 'function') {
				const settled = this.state === State.FULFILLED ? resolve : reject;
				settled(this.result);
				return;
			}
			try {
				const data = callback(this.result);
				if (this.isPromiseLike(data)) {
					data.then(resolve, reject); // 判断返回结果是否为promise 如果是promise则执行then方法
					return;
				} else {
					resolve(data);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	// 执行回调
	private run() {
		if (this.state === State.PENDING) return; // 状态为pending时不执行, 因为状态改变时会执行run
		while (this.handlers.length) {
			const { onFulfilled, onRejected, resolve, reject } = this.handlers.shift()!; // 因为可能存在多个回调 所以要循环执行
			if (this.state === State.FULFILLED) {
				this.runOne(onFulfilled, resolve, reject); // 完成状态执行onFulfilled
			} else if (this.state === State.REJECTED) {
				this.runOne(onRejected, resolve, reject); // 失败状态执行onRejected
			}
		}
	}

	static resolve(): MyPromise<void>;
	static resolve<T>(value: T | PromiseLike<T>): MyPromise<T>;

	static resolve<T>(value?: T | PromiseLike<T>): MyPromise<T> {
		if (value instanceof MyPromise) {
			return value;
		}
		return new MyPromise((resolve) => {
			resolve(value!);
		});
	}
	// 添加reject方法
	static reject<T = never>(reason?: any): MyPromise<T> {
		return new MyPromise((resolve, reject) => {
			reject(reason);
		});
	}

	// then方法 返回一个新的promise 保证链式调用
	public then<TResult1 = T, TResult2 = never>(onFulfilled?: OnFulfilled<T, TResult1>, onRejected?: OnRejected<TResult2> | null) {
		return new MyPromise<TResult1 | TResult2>((resolve, reject) => {
			this.handlers.push({ onFulfilled, onRejected, resolve, reject });
			this.run();
		});
	}

	// catch方法 返回一个新的promise 保证链式调用
	public catch<TResult = never>(onrejected?: OnRejected<TResult>): MyPromise<T | TResult> {
		return this.then(undefined, onrejected);
	}

	// 无论如何都会执行，不会传值给回调函数
	public finally(onfinally?: onFinally): MyPromise<T> {
		return this.then(
			(value) =>
				// 如果 onfinally 返回的是一个 Promise 也会等返回的 Promise 状态改变才会进行后续的 Promise
				MyPromise.resolve(typeof onfinally === 'function' ? onfinally() : onfinally).then(() => value),
			(reason) =>
				MyPromise.resolve(typeof onfinally === 'function' ? onfinally() : onfinally).then(() => {
					throw reason;
				})
		);
	}
}
