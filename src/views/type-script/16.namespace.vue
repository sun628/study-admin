<template>
	<el-card>
		<doc title="namespace命名空间">
			<ul class="tip">
				<li><font color="red">主要用于解决命名冲突，他会在全局生成一个对象，在namepace内部的类都要通过这个对象访问。</font></li>
				<li>通过 namespace 关键字定义</li>
				<li>命名空间内的类默认私有</li>
				<li>通过 export 暴露</li>
			</ul>
			<p class="font-bold">TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块 。</p>
			<p class="font-bold">相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）</p>
			<Highlight :code="namespaceCode" :auto="false" />
			<h2>命名空间也可以嵌套使用，形成层次结构，以更好地组织代码</h2>
			<Highlight :code="namespaceCode2" :auto="false" />
		</doc>
		<doc title="decar"></doc>
	</el-card>
</template>
<script setup lang="ts">
const namespaceCode = `namespace MyNamespace {
  export function greet(name: string) {
    console.log("Hello", name);
  }
}

MyNamespace.greet("John");  // 输出：Hello, John!`;

const namespaceCode2 = `namespace MyNamespace {
  export namespace SubNamespace {
    export function log(message: string) {
      console.log('SubNamespace',message);
    }
  }
}

MyNamespace.SubNamespace.log("Hello");  // 输出：[SubNamespace] Hello`;
</script>

<style scoped lang="scss"></style>
