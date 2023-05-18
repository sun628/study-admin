<template>
	<el-row class="flex justify-center">
		<el-col :span="16">
			<el-card>
				<doc title="ref">
					<div class="tip">
						<p>接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。</p>
						<p><font color="red">注意被ref包装之后需要.value 来进行赋值</font></p>
					</div>
					<highlight :code="refCode" />
				</doc>
				<doc title="isRef">
					<div class="tip">判断一个值是不是ref响应式对象</div>
					<highlight :code="isRefCode" />
				</doc>
				<doc title="unref">
					<div class="tip">
						TIP:如果参数是 ref，则返回内部值，否则返回参数本身。这是 <font>val = isRef(val) ? val.value : val</font> 计算的一个语法糖。
					</div>
					<highlight :code="unrefCode" />
				</doc>
				<doc title="shallowRef">
					<div class="tip">
						<p>和ref()不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。</p>
						<p>
							如果你使用shallowRef来包装一个含有对象或数组的值的对象，那么你需要手动地为这些对象或数组创建响应式，并且当这些对象或数组发生变化时，你需要手动地通知依赖于此shallowRef的视图进行更新。
						</p>
					</div>
					<highlight :code="shallowRefCode" />
					<p class="tip">
						TIP：<font>shallowRef()</font>
						常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：
					</p>
					<highlight :code="shallowRefCode1" />
				</doc>
				<doc title="triggerRef">
					<p class="tip">TIP：强制触发依赖于一个浅层 <font>ref</font> 的副作用，这通常在对浅引用的内部值进行深度变更后使用。</p>
					<highlight :code="triggerRefCode" />
					<h2>案例</h2>
					<div class="text-xl font-bold">
						<p>修改 <font>shallowRef()</font> 修饰的对象里的count值： {{ shallowObj.count }}</p>
						<el-button type="primary" @click="count()">修改count值</el-button>
						<el-button type="primary" @click="countByTriggerRef()">通过TriggerRef修改count值</el-button>
					</div>
				</doc>
				<doc title="customRef">
					<p class="tip">TIP：创建一个自定义的 <font>ref</font>，显式声明对其依赖追踪和更新触发的控制方式。</p>
					<h3>类型</h3>
					<highlight :code="customReftType" />
					<h3>详细信息</h3>
					<div>
						customRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。<br />
						一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。
					</div>
					<h3>示例</h3>
					<p class="tip">创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用。</p>
					<highlight :code="customRefCode" />
					<p>在组件中使用：</p>
					<highlight :code="customRefDemoCode" />
					<h3>案例</h3>
					<div class="customRef-demo">
						<p>{{ customRefText }}</p>
						<el-input v-model="text" @input="change" />
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
import { refCode, isRefCode, unrefCode, shallowRefCode, shallowRefCode1, triggerRefCode, customReftType, customRefDemoCode } from './code';
import { useDebouncedRef } from './debouncedRef';
import directory from '@/components/Directory/index.vue';

const directoryData = [
	{ label: 'ref' },
	{ label: 'isRef' },
	{ label: 'unref' },
	{ label: 'shallowRef' },
	{ label: 'triggerRef' },
	{ label: 'customRef' },
];

//自定义的 ref代码
const customRefCode = `import { customRef } from 'vue'
export ${useDebouncedRef}`;
console.log('useDebouncedRef', useDebouncedRef);

const shallowObj = shallowRef({ count: 0 });
const count = () => {
	shallowObj.value.count++; // 此时值已经更改,但是不会触发视图更新
};
const countByTriggerRef = () => {
	shallowObj.value.count++;
	triggerRef(shallowObj); // 通过 triggerRef 可以使视图强制更新
};

const text = ref('hello');
const customRefText = useDebouncedRef('hello', 1000);
const change = (value: string) => {
	customRefText.value = value;
};
</script>
<style lang="scss">
.el-collapse-item__header {
	font-size: 20px;
	font-weight: bold;
}
</style>
