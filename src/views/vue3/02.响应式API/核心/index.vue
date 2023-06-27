<template>
	<el-row class="flex justify-center">
		<el-col :span="16">
			<el-card>
				<doc title="ref">
					<div class="tip">
						<p>TIP:接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。</p>
						<p><font color="red">注意被ref包装之后需要.value 来进行赋值</font></p>
					</div>
					<h3>类型</h3>
					<highlight :code="refType" />
					<h3>示例</h3>
					<highlight :code="refCode" />
					<div class="tip">
						<p>
							TIP:如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的
							ref，它们将被深层地解包。
						</p>
						<b>若要避免这种深层次的转换，请使用 <el-link type="primary">shallowRef()</el-link> 来替代。</b>
					</div>
				</doc>
				<doc title="reactive">
					<p class="tip">返回一个对象的响应式代理。(只能是复杂数据类型extends <font color="red">object</font>)</p>
					<h3>类型</h3>
					<highlight :code="reactiveType" />
					<h3>示例</h3>
					<highlight :code="reactiveCode" />
					<p class="tip">
						TIP:响应式转换是“深层”的：它会影响到<font>所有嵌套的属性</font>。一个响应式对象也将深层地解包任何 ref 属性，同时保持响应性。
					</p>
					<highlight :code="reactiveCode1" />
					<h3><font color="red">数组异步赋值问题</font></h3>
					<highlight :code="reactiveCode2" />
				</doc>
				<doc title="readonly">
					<div class="tip">
						<p>接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。即该对象的值和结构都是只读的，不允许被修改</p>
						<p>可以使用在像 Vue 组件中的 <font>props、provide </font> 或者其他的共享状态的对象上，以确保一些重要的属性不被不应该更新的代码修改。</p>
					</div>
					<highlight :code="readonlyCode" />
				</doc>
				<doc title="computed">
					<h3>类型</h3>
					<highlight :code="computedType" />
					<p class="tip">
						接受一个 getter 函数，返回一个只读的响应式<font>ref</font> 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和
						set 函数的对象来创建一个可写的 <font>ref</font> 对象。
					</p>
					<h3>示例</h3>
					<p>创建一个只读的计算属性 ref：</p>
					<highlight :code="computedCode" />
					<p>创建一个可写的计算属性 ref：</p>
					<highlight :code="computedCode1" />
				</doc>
				<doc title="watch">
					<div class="tip">
						<p>第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。</p>
						<p>默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。(可以通过immediate: true立即监听)</p>
					</div>
					<h2>监听ref</h2>
					<highlight :code="watchRefCode" />
					<h2>监听reactive</h2>
					<div class="tip">
						直接给 watch() 传入一个响应式对象时：
						<p>1.会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发。<font color="red">(deep无效)</font></p>
						<p>2.`newValue` 和 `oldValue` 是<font color="red">相等</font>的，因为它们是同一个对象！</p>
					</div>
					<highlight :code="watchReactiveCode" />
					<h3>停止监听</h3>
					<div class="tip">
						<p>同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。</p>
						<p>如果用<font color="red">异步回调</font>创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。</p>
					</div>
					<p>要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：</p>
					<highlight :code="watchStopCode" />
				</doc>
				<doc title="watchEffect">
					<h2>类型</h2>
					<highlight :code="watchEffectType" />
					<div class="tip">
						<p>
							1.第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用。(例如实现防抖)
						</p>
						<p>2.第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。</p>
						<p>默认情况下，侦听器将在组件渲染之前执行。设置<font>flush: 'post'</font> 将会使侦听器延迟到组件渲染之后再执行。</p>
						<p>
							在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 <font>flush: 'sync'</font> 来实现
						</p>
						<p>返回值是一个用来停止该副作用的函数。（同watch一样）</p>
					</div>
					<h2>示例</h2>

					<highlight :code="watchEffectCode" />
					<h3>清除副作用</h3>
					<highlight :code="watchEffectCode1" />
					<div class="watchEffect-demo mb-4">
						<h2><font>demo</font></h2>
						<span>输入的值：{{ keywordText }}</span>
						<el-input ref="ElInputRef" v-model="keyword" />
					</div>
					<h2>更多的配置项</h2>
					<h3>副作用刷新时机 flush 一般使用post。默认：'pre'</h3>
					<p>默认情况下，侦听器将在组件渲染之前执行。设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行</p>
					<mv-table :table-data="tableData">
						<el-table-column prop="time" />
						<el-table-column prop="pre" label="pre" />
						<el-table-column prop="sync" label="sync" />
						<el-table-column prop="post" label="post" />
					</mv-table>
				</doc>
				<doc title="watchPostEffect">
					<p class="tip">watchEffect() 使用 flush: 'post' 选项时的别名。</p>
				</doc>
				<doc title="watchSyncEffect">
					<p class="tip">watchEffect() 使用 flush: 'sync' 选项时的别名。</p>
				</doc>
				<doc link="watchVsWatchEffect" title="watch vs watchEffect">
					<div class="tip">
						<p>TIP:watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是<font>追踪响应式依赖的方式</font>：</p>
						<p>
							1.watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch
							会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
						</p>
						<p>
							2.watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
						</p>
					</div>
				</doc>
			</el-card>
		</el-col>
		<!-- 目录 -->
		<el-col :span="4" class="ml-10">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import MvTable from '@/components/mv-table/index.vue';

import { refCode, reactiveCode, reactiveCode1, reactiveCode2, readonlyCode, computedCode, computedCode1 } from './code';
import { watchRefCode, watchReactiveCode, watchStopCode, watchEffectCode, watchEffectCode1 } from './code';
import { refType, reactiveType, computedType, watchEffectType } from './type';
import directory from '@/components/directory/index.vue';

const directoryData = [
	{ label: 'ref' },
	{ label: 'reactive' },
	{ label: 'readonly' },
	{ label: 'computed' },
	{ label: 'watch' },
	{ label: 'watchEffect' },
	{ label: 'watchPostEffect' },
	{ label: 'watchSyncEffect' },
	{ label: 'watch vs watchEffect', link: 'watchVsWatchEffect' },
];

const tableData = [
	{
		time: '更新时机',
		pre: '组件更新前执行',
		sync: '强制效果始终同步触发',
		post: '组件更新后执行',
	},
];

const antiShake = (val: string, time: number) => {
	return setTimeout(() => {
		console.log('用户输入:', val);
		keywordText.value = val;
	}, time);
};
const keyword = ref<string>(''); //输入的值
const keywordText = ref<string>(''); //展示的值
watchEffect((onCleanup) => {
	const timer = antiShake(keyword.value, 500); //清除副作用
	onCleanup(() => clearTimeout(timer));
	console.log('watchEffect--', keyword.value);
});
</script>
<style lang="scss">
.el-collapse-item__header {
	font-size: 20px;
	font-weight: bold;
}
</style>
