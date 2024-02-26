<template>
	<div class="call"></div>
</template>

<script setup lang="ts">
declare global {
	interface Function {
		myCall<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R;
		myCall<T, A extends any[]>(this: new (...args: A) => T, thisArg: T, ...args: A): void;
	}
}
// 扩展 Function.prototype 以添加 myCall 方法
Function.prototype.myCall = function (context: any, ...args: any[]) {
	if (typeof this !== 'function') {
		throw new TypeError('Error');
	}
	// 如果 context 为 null 或 undefined，将其设置为 window/global，否则设置为对象
	context = context || globalThis;
	// 为 context 创建一个唯一的属性以存储当前函数
	const fnSymbol = Symbol();
	context[fnSymbol] = this;
	// 调用函数并传入参数
	const result = context[fnSymbol](...args);
	// 删除临时属性
	delete context[fnSymbol];
	// 返回结果
	return result;
};

// 使用myCall的例子
function greet(this: { name: string }, greeting: string) {
	console.log('🚀 ~ greet ~ this:', this);
	return `${greeting}, ${this.name}`;
}

const person = { name: 'John' };
console.log(greet.call(person, 'Hello')); // 应该输出 "Hello, John"
</script>

<style scoped lang="scss"></style>
