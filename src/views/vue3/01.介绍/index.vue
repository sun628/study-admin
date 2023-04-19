<template>
	<doc title="关于vue3和vue2的区别">
		<div class="tip">
			<h2>一、性能优化</h2>
			<p>编译优化: Vue3中的虚拟 DOM 采用了新的实现方式，即基于模板的编译和标记的优化</p>
			<p>
				在vue中，无论元素是否参与更新，在生成vdom树时都会重新创建该元素，而在vue3里有一种静态提升的概念，这个概念的核心思想是对于PatchFlag标记出的，不参与更新的元素提出来，只需创建一次，后续渲染时直接复用就行。
			</p>
			<list :data="compileList" type="warning"></list>
		</div>
		<div class="tip">
			<h2>二、Composition API</h2>
			<p>引入了类似于React Hooks的功能，即Composition API。它允许将组件逻辑分离为可重用的功能，并通过 provide/inject API 共享数据。</p>
			<p>Vue 2 中，如果需要将逻辑共享到多个组件中，可能需要混合(mixin)，但混合可能会导致命名冲突和函数调用顺序问题。</p>
		</div>
		<div class="tip">
			<h2>三、组件API</h2>
			<p>提供了新的 Fragment、Teleport 和 Suspense 组件，以及新的 setup 函数，可以简化组件代码的编写，并提供更好地设计模式。</p>
		</div>
		<div class="tip">
			<h2>四、新的响应式系统</h2>
			<p>
				采用了新的Proxy API，代替了Vue2的Object.defineProperty，并解决了Vue2中存在的一些响应式"陷阱"。
				（例如：无法检测到对象属性的添加或删除；无法检测到数组索引的设置等）
			</p>
		</div>
		<div class="tip">
			<h2>四、更好的TypeScript支持</h2>
		</div>
		<div class="tip">
			<h2>五、待完成....</h2>
			<p>后续新增新增性能优化的对应示例及跳转</p>
		</div>
	</doc>
</template>
<script setup lang="ts">
import List from '@/components/List/index.vue';

const compileList = [
	'静态节点提升（Static Node Hoisting）：Vue 3 通过分析模板中的节点，将静态节点提升为常量，在组件渲染时，无需再次计算它们，可以直接复用相同的节点，减少了节点的创建和销毁，提高了组件的渲染性能。',
	'静态属性提升（Static Props Hoisting）：类似于静态节点提升，Vue 3 还通过分析模板中的属性，将静态属性提升为常量，可以复用相同的属性，减少了属性计算的开销。',
	'缓存事件处理函数（Cached Event Handlers）：在 Vue2中，每次重新渲染组件时，所有的事件处理函数都会被重新创建，引入了额外的开销。而在 Vue3 中，事件处理函数会被缓存起来，在渲染时直接复用之前的函数，减少了事件处理函数的创建和销毁开销。',
	'SSR 优化：改进了服务器端渲染的预编译与缓存机制，如果增加的静态内容过多，就会直接使用innerHTML的方法插入，而不会一个一个的创建的节点。',
];
</script>

<style scoped lang="scss">
.list-item {
	min-height: 50px;
	background: #ecf5ff;
}
</style>
