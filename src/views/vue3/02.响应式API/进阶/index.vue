<template>
	<el-row>
		<el-col :span="16">
			<doc title="shallowRef">
				<div class="tip">
					<p>和ref()不同，浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 .value 的访问是响应式的。</p>
					<p>
						如果你使用shallowRef来包装一个含有对象或数组的值的对象，那么你需要手动地为这些对象或数组创建响应式，并且当这些对象或数组发生变化时，你需要手动地通知依赖于此shallowRef的视图进行更新。
					</p>
				</div>
				<Highlight :code="shallowRefCode" />
				<p class="tip">
					TIP：<HighFont>shallowRef()</HighFont>
					常常用于对大型数据结构的性能优化或是与外部的状态管理系统集成。但代价是，我们现在必须将所有深层级对象视为不可变的，并且只能通过替换整个根状态来触发更新：
				</p>
				<Highlight :code="shallowRefCode1" />
			</doc>
			<doc title="triggerRef">
				<p class="tip">TIP：强制触发依赖于一个浅层 <HighFont>ref</HighFont> 的副作用，这通常在对浅引用的内部值进行深度变更后使用。</p>
				<Highlight :code="triggerRefCode" />
				<h2>案例</h2>
				<div class="text-xl font-bold">
					<p>修改 <HighFont>shallowRef()</HighFont> 修饰的对象里的count值： {{ shallowObj.count }}</p>
					<el-button type="primary" @click="count()">修改count值</el-button>
					<el-button type="primary" @click="countByTriggerRef()">通过TriggerRef修改count值</el-button>
				</div>
			</doc>
			<doc title="customRef">
				<p class="tip">TIP：创建一个自定义的 <HighFont>ref</HighFont>，显式声明对其依赖追踪和更新触发的控制方式。</p>
				<h3>类型</h3>
				<Highlight :code="customReftType" />
				<h3>详细信息</h3>
				<div class="tip">
					<p>
						1.<HighFont>customRef() </HighFont>预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和
						set 方法的对象。
					</p>
					<p>2.一般来说，track() 应该在get()方法中调用，而 trigger() 应该在set()中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。</p>
				</div>
				<h3>示例</h3>
				<p class="tip">创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用。</p>
				<Highlight :code="customRefCode" />
				<p>在组件中使用：</p>
				<Highlight :code="customRefDemoCode" />
				<h3>案例---防抖</h3>
				<div class="customRef-demo">
					<p>{{ customRefText }}</p>
					<el-input v-model="text" @input="textChange" />
				</div>
			</doc>
			<doc title="shallowReactive">
				<p class="tip">只能对浅层的数据 如果是深层的数据只会改变值 不会改变视图。</p>
				<Highlight :code="shallowReactiveCode" />
			</doc>
			<doc title="shallowReadonly">
				<p class="tip">仅对传入对象的第一层属性进行只读处理，其内部嵌套的对象和数组不是只读的。</p>
				<Highlight :code="shallowReadonlyCode" />
			</doc>
			<doc title="toRaw">
				<div class="tip">
					<p>作用：将一个由reactive生成的响应式对象转为普通对象。</p>
					<p>使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。</p>
				</div>
				<Highlight :code="toRawCode" />
			</doc>
			<doc title="markRaw">
				<div class="tip">
					<p>作用：标记一个对象，使其永远不会再成为响应式对象。</p>
					<div>
						使用场景：
						<p>1.有些值不应被设置为响应式的，例如复杂的第三方类库等。</p>
						<p>2.当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。</p>
					</div>
				</div>
				<Highlight :code="markRawCode" />
			</doc>
		</el-col>
		<el-col :span="4" class="ml-10">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import { shallowRefCode, shallowRefCode1, triggerRefCode, customReftType, customRefDemoCode, shallowReactiveCode, shallowReadonlyCode } from './code';
import { toRawCode, markRawCode } from './code';
import { useDebouncedRef } from './debouncedRef';
import directory from '@/components/directory/index.vue';
const directoryData = [
	{ label: 'shallowRef' },
	{ label: 'triggerRef' },
	{ label: 'customRef' },
	{ label: 'shallowReactive' },
	{ label: 'shallowReadonly' },
	{ label: 'toRaw' },
	{ label: 'markRaw' },
];

//shallow----demo
const shallowObj = shallowRef({ count: 0 });
const count = () => {
	shallowObj.value.count++; // 此时值已经更改,但是不会触发视图更新
	console.log('count:', shallowObj.value.count);
};
const countByTriggerRef = () => {
	shallowObj.value.count++;
	triggerRef(shallowObj); // 通过 triggerRef 可以使视图强制更新
};

//自定义的 ref代码
const customRefCode = `import { customRef } from 'vue'
export ${useDebouncedRef}`;

//customRef ----demo
const text = ref('hello');
const customRefText = useDebouncedRef('hello', 500);
const textChange = (value: string) => {
	customRefText.value = value;
};
</script>

<style scoped lang="scss"></style>
