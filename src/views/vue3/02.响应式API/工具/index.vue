<template>
	<el-row>
		<el-col :span="16">
			<doc title="isRef">
				<div class="tip">判断一个值是不是ref响应式对象</div>
				<Highlight :code="isRefCode" />
			</doc>
			<doc title="unref">
				<div class="tip">
					TIP:如果参数是 ref，则返回内部值，否则返回参数本身。这是 <HighFont>val = isRef(val) ? val.value : val</HighFont> 计算的一个语法糖。
				</div>
				<Highlight :code="unrefCode" />
			</doc>
			<doc title="toRef">
				<div class="tip">
					<p>可以将值、refs 或 getters 规范化为 refs (3.3+)。</p>
					<p>也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。</p>
				</div>
				<h3>规范化签名 (3.3+)：</h3>
				<Highlight :code="toRefCode" />
				<h3>对象属性签名：</h3>
				<Highlight :code="toRefCode1" />
				<div class="tip">
					<p>TIP:如果是ref 对象直接返回 否则 调用 ObjectRefImpl 创建一个类ref 对象;</p>
					<p>而类ref 对象只是做了值的改变 并未处理 收集依赖 和 触发依赖的过程 所以 普通对象无法更新视图。</p>
				</div>
				<Highlight :code="toRefImpl" />
			</doc>
			<doc title="toRefs">
				<p class="tip">
					TIP:将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用
					<HighFont>toRef()</HighFont> 创建的。
				</p>
				<h3>示例</h3>
				<Highlight :code="toRefsCode" />
				<p class="tip">
					TIP:当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，组件可以
					<HighFont>解构/展开</HighFont> 返回的对象而不会失去<HighFont>响应性</HighFont>;
				</p>
				<Highlight :code="toRefsCode1" />
				<p class="tip">toRefs 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 toRef</p>
				<h3>源码解析</h3>
				<p class="tip">TIP:其实就是把reactive 对象的每一个属性都变成了ref 对象循环 调用了<HighFont>toRef</HighFont></p>
				<Highlight :code="toRefsImpl" />
			</doc>
			<doc title="isProxy">
				<p class="tip">
					TIP:检查一个对象是否是由 <HighFont>reactive()</HighFont>、<HighFont>readonly()</HighFont>、<HighFont>shallowReactive()</HighFont> 或
					<HighFont>shallowReadonly()</HighFont> 创建的代理。
				</p>
			</doc>
			<doc title="isReactive">
				<p class="tip">检查一个对象是否是由<HighFont>reactive()</HighFont> 或 <HighFont>shallowReactive()</HighFont> 创建的代理。</p>
			</doc>
			<doc title="isReadonly">
				<div class="tip">
					<p>检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。</p>
					<p>通过 readonly() 和 shallowReadonly() 创建的代理都是只读的，因为他们是没有 set 函数的 computed() ref。</p>
				</div>
			</doc>
		</el-col>
		<!-- 目录 -->
		<el-col :span="4" class="ml-10">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import { isRefCode, unrefCode, toRefCode, toRefCode1, toRefsCode, toRefsCode1 } from './code';
import { toRefImpl, toRefsImpl } from './Impl';
import directory from '@/components/directory/index.vue';

const directoryData = [
	{ label: 'isRef' },
	{ label: 'unref' },
	{ label: 'toRef' },
	{ label: 'toRefs' },
	{ label: 'isProxy' },
	{ label: 'isReactive' },
	{ label: 'isReadonly' },
];
</script>

<style scoped lang="scss"></style>
