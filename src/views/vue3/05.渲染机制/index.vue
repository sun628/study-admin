<template>
	<el-row>
		<doc title="渲染管线">
			<h4>从高层面的视角看，Vue 组件挂载时会发生如下几件事：</h4>
			<ul class="tip">
				<li>
					<i class="text-primary">编译：</i> Vue 模板被编译为渲染函数：即用来返回虚拟 DOM
					树的函数。这一步骤可以通过构建步骤提前完成，也可以通过使用运行时编译器即时完成。
				</li>
				<li>
					<i class="text-primary">挂载：</i>
					运行时渲染器调用渲染函数，遍历返回的虚拟 DOM 树，并基于它创建实际的 DOM 节点。
					这一步会作为响应式副作用执行，因此它会追踪其中所用到的所有响应式依赖。
				</li>
				<li>
					<i class="text-primary"> 更新：</i>
					当一个依赖发生变化后，副作用会重新运行，这时候会创建一个更新后的虚拟 DOM 树。
					运行时渲染器遍历这棵新树，将它与旧树进行比较，然后将必要的更新应用到真实 DOM 上去。
				</li>
			</ul>
			<div><img src="@/assets/images/vue3/render-pipeline.png" alt="" /></div>
		</doc>
		<doc title="命令式和声明式">
			<p class="tip">
				从范式上来看，视图层框架通常分为命令式和声明式(vue.js)，它们各有 优缺点。 jQuery 就是典型的命令式框架。命令式框架的一大特点就是
				<i class="text-primary"> 关注过程 </i>。
			</p>
			<Highlight :code="jqCode" />
			<p class="tip">与命令式框架更加关注过程不同， 声明式框架更加关注结果。结合 Vue，如何实现上面自然语言描述的功能：</p>
			<Highlight :code="vueCode" />
			<p class="tip">
				理论上命令式代码可以做到极致的性能优化，因为我们明确知道哪些发生了变更，只做必要的修改就行了。但是声明式代码不一定能做到这一点，因为它描述的是结果。
				对于框架来说，为了实现最优的更新性能，它需要先找到前后的差异并只更新变化的地方，<i class="text-primary">这就是虚拟 DOM 的核心思想</i>。
			</p>
		</doc>
		<doc title="性能与可维护性的权衡">
			<p>
				命令式和声明式各有优缺点，在框架设计方面，则体现在性能与 可维护性之间的权衡。这里我们先抛出一个结论：
				<i class="text-primary">声明式代码的性能 不优于命令式代码的性能</i>。
			</p>
			<p>，假设现在我们要将 div 标签的文本内容 修改为 hello vue3，如果用命令式代码实现,直接调用相关命令操作即可</p>
			<Highlight :code="updateCode" />
			<p class="tip">
				可以看到，理论上命令式代码可以做到极致的性能优化，因为我们明确知道哪些发生了变更，只做必要的修改就行了。但是声明式代码不一定能做到这一点，因为它描述的是结果。
			</p>
			<Highlight :code="updateCode1" />
			<p class="tip">对于框架来说，为了实现最优的更新性能，它需要找到前后的差 异并只更新变化的地方，但是最终完成这次更新的代码仍然是：</p>
			<Highlight :code="updateCode" />
			<p class="tip">如果我们把直接修改的性能消耗定义为 A，把找出差异的性能消 耗定义为 B，那么有：</p>
			<div class="tip">
				<li>命令式代码的更新性能消耗 = A</li>
				<li>声明式代码的更新性能消耗 = B + A</li>
			</div>
			<div class="tip">
				如果我们能够最小化找出差异的性能 消耗，就可以让声明式代码的性能无限接近命令式代码的性能。而所谓的<i class="text-primary font-bold">虚拟DOM</i>
				就是为了最小化找出差异这一步的性能消耗而出现 的。
			</div>
		</doc>
		<doc title="什么是虚拟DOM">
			<h4 class="tip">虚拟DOM本质上是一个JavaScript对象，这个对象是一个轻量级的对真实DOM的描述。</h4>
			<ul>
				<li class="tip">与其说虚拟 DOM 是一种具体的技术，不如说是一种模式，所以并没有一个标准的实现。我们可以用一个简单的例子来说明：</li>
				<Highlight :code="vnodeCode" />
				<li class="tip">
					这里所说的 vnode 即一个纯 JavaScript 的对象 (一个“虚拟节点”)，它代表着一个 <tag data="<div>" />
					元素。它包含我们创建实际元素所需的所有信息。它还包含更多的子节点，这使它成为虚拟 DOM 树的根节点。
				</li>
				<li class="tip">
					一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为<i class="text-primary">挂载 (mount)。</i>
				</li>
				<li class="tip">
					<span> 如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。 </span>
					<i class="text-primary">这个过程被称为更新 (patch)，又被称为“比对”(diffing) 或“协调”(reconciliation)。</i>
				</li>
			</ul>
		</doc>
		<doc title="虚拟DOM的作用">
			<div class="tip">
				<li>
					<i class="text-primary"> 性能提升：</i>直接操作DOM是非常昂贵的，因为它涉及到浏览器的大量计算和重排（reflow）及重绘（repaint）操作。
					虚拟DOM使得Vue可以在内存中进行操作，通过算法最小化真实DOM的操作数量，只在必要的时候对真实DOM进行更新。这大大减少了浏览器的工作量，提高了应用程序的性能。
				</li>
				<li>
					<i class="text-primary">跨平台：</i>
					虚拟DOM不依赖于特定的浏览器环境，因此它可以使得Vue等框架更容易地被移植到其他环境中，如服务器端渲染（SSR）、原生应用（如React、Native）或小程序等。
				</li>
				<li>
					<i class="text-primary">声明式编程：</i>
					虚拟DOM使得开发者可以更关注数据和状态的管理，而不是如何去操作DOM来反映这些变化。这样可以写出更清晰、更易于维护的代码。
				</li>
				<li>
					<i class="text-primary"> 批量更新与异步渲染：</i>
					Vue使用异步队列来管理组件的更新。当一个组件的状态改变时，Vue不会立即更新DOM，而是将这个组件的更新推迟到下一个事件循环，
					在此期间收集所有的状态改变，然后一次性进行更新。 这种批量更新机制可以避免不必要的DOM操作，提高性能。
				</li>
				<li>
					<i class="text-primary">更容易集成：</i>
					虚拟DOM允许开发者更容易地与其他库或现有的UI代码集成，因为它提供了一个抽象层，使得Vue可以更灵活地与不同的系统配合。
				</li>
			</div>
		</doc>
	</el-row>
</template>

<script setup lang="ts">
const vnodeCode = ` <!-- html -->
<template>
	<div id="VDOM" class="Virtual-DOM">
			<div></div>
 </div>
</template>

// js
const vnode = {
	tag: 'div',
	children: [{ tag: 'p', children: '我是通过虚拟dom创建的p1' }],// 子节点
};

function Render(obj: { tag: any; children: any }, root: any) {
	const el = document.createElement(obj.tag);
	if (typeof obj.children === 'string') {
		const text = document.createTextNode(obj.children);
		el.appendChild(text);
	} else if (obj.children) {
		// 数组 递归调用 Render,使用el作为根节点
		obj.children.forEach((item: any) => Render(item, el));
	}

	root.appendChild(el);
}

onMounted(() => {
	const root = document.getElementById('VDOM');
	Render(vnode, root);
});`;

const jqCode = `// 01 - 获取 id 为 app 的 div 标签
// 02 - 它的文本内容为 hello world
// 03 - 为其绑定点击事件
// 04 - 当点击时弹出提示：ok

// 原生实现
const div = document.querySelector('#app'); // 获取 div
div.innerText = 'hello world'; // 设置文本内容
div.addEventListener('click', () => {
	alert('ok');
}); // 绑定点击事件;

// jquery实现
$('#app') // 获取 div
	.text('hello world') // 设置文本内容
	.on('click', () => {
		alert('ok');
	}); // 绑定点击事件
`;

const vueCode = `<div @click="() => alert('ok')">hello world</div>`;

const updateCode = `div.textContent = 'hello vue3' // 直接修改文本内容`;
const updateCode1 = `<!-- 之前： -->
 <div @click="() => alert('ok')">hello world</div>
 <!-- 之后： -->
 <div @click="() => alert('ok')">hello vue3</div>`;
</script>

<style scoped lang="scss"></style>
