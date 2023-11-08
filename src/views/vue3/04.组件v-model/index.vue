<template>
	<el-row class="h-full">
		<doc title="组件 v-model">
			<p class="tip">v-model 可以在组件上使用以实现双向绑定。</p>
			<p>首先让我们回忆一下 v-model 在原生元素上的用法：</p>
			<Highlight :code="code1" />
			<p class="tip">实现原理 本质上是一颗语法糖，利用了 v-bind 和 input 事件。因此上面的代码其实等价于下面这段：</p>
			<Highlight :code="code2" />
			<p>而当使用在一个组件上时，v-model 会被展开为如下的形式：</p>
			<Highlight :code="code3" />
			<p>要让这个例子实际工作起来，<MvTag text="<CustomInput>" />组件内部需要做两件事：</p>
			<div class="tip">
				<p>1.将内部原生 <MvTag text="<input />" />元素的 value attribute 绑定到 modelValue prop</p>
				<p>2.当原生的 input 事件触发时，触发一个携带了新值的 update:modelValue 自定义事件</p>
			</div>
			<Highlight :code="code4" />
			<p>现在 v-model 可以在这个组件上正常工作了：</p>
			<Highlight :code="code5" />
		</doc>
		<doc title="正篇">
			<div class="tip">
				<p>1.父组件使用 v-model ，子组件可以通过 v-bind 和 input 事件实现组件通信</p>
				<p>2.那么子组件也可以直接使用v-model绑定父组件传过来的modelValue吗？</p>
				<p class="pl-3 text-primary">答案：不可以，因为会破坏单项数据流。</p>
			</div>
			<div class="tip">
				<h1>单向数据流</h1>
				<p>
					所有的 props 都遵循着<span class="text-primary font-bold">单向绑定</span>原则，props
					因父组件的更新而变化，而不会逆向传递,即子组件不能直接修改父组件传过来的 props。
				</p>
				<p>这避免了子组件意外修改父组件的状态的情况，不然应用的数据流将很容易变得混乱而难以理解。</p>
			</div>
		</doc>
		<doc title="computed 拦截prop">
			<p class="tip">通过computed实现，通过 get 获取父组件传过来的值，利用 set 更新触发emit事件</p>
			<Highlight :code="computedCode" />
		</doc>

		<!-- 示例 -->
		<h1>示例</h1>
		<customInput v-model="msg" />
	</el-row>
</template>

<script setup lang="ts">
import customInput from './customInput.vue';
import MvTag from '@/components/mv-tag/index.vue';
import { code1, code2, code3, code4, code5, computedCode } from './code';
const msg = ref('hello');
</script>

<style scoped lang="scss"></style>
