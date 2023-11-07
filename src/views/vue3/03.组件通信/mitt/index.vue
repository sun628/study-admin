<template>
	<div class="mitt">
		<p class="tip">这个原理其实是运用了JS设计模式之发布订阅模式</p>
		<p>简易版本：</p>
		<Highlight :code="code" />
		<p>github源码：</p>
		<Highlight :code="code1" />
	</div>
</template>
<script setup lang="ts">
import code1 from './mitt.md?raw';
const code = ` 
type BusClass<T> = {
    emit: (name: T) => void
    on: (name: T, callback: Function) => void
}
type BusParams = string | symbol 
type List = {
    [key: BusParams]: Array<Function>
}
class Bus<T extends BusParams> implements BusClass<T> {
    list: List
    constructor() {
        this.list = {} // 初始化事件列表
    }

    // 发射事件，触发所有对应事件的回调函数
    emit(name: T, ...args: Array<any>) {
    let eventName: Array<Function> = this.list[name]; // 获取对应事件的回调函数列表
    eventName.forEach(ev => {
      ev.apply(this, args); // 依次执行回调函数，并传递参数
    });
  }

    // 监听事件，将回调函数添加到对应事件的回调函数列表
    on(name: T, callback: Function) {
    let fn: Array<Function> = this.list[name] || []; // 获取对应事件的回调函数列表，如果该事件还没有回调函数，则初始化为空数组
    fn.push(callback); // 将回调函数添加到回调函数列表
    this.list[name] = fn; // 更新事件的回调函数列表
  }
}
 
export default new Bus()`;

// const code1 = ``;
</script>

<style scoped lang="scss"></style>
