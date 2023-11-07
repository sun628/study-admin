<template>
	<el-card>
		<doc title="namespace命名空间">
			<div class="tip">
				<span class="font-bold">链接地址：</span>
				<el-link type="primary" :href="link_URL" target="_blank">{{ link_URL }}</el-link>
			</div>

			<ul class="tip">
				<li><HighFont color="red">主要用于解决命名冲突，他会在全局生成一个对象，在namepace内部的类都要通过这个对象访问。</HighFont></li>
				<li>通过 namespace 关键字定义</li>
				<li>命名空间内的类默认私有</li>
				<li>通过 export 暴露</li>
			</ul>
			<div class="font-bold tip">
				<p>TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。</p>
				<p>相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）</p>
			</div>
			<h2>
				<p>虽然说随着 ES6 的普及，ts 文件中的 namespcae 已经逐渐被淘汰掉了。</p>
				<p>但是在类型声明文件中使用 declare namespace xxx 声明类似全局对象仍然是非常实用的方法。</p>
			</h2>
			<Highlight :code="namespaceCode" :auto="false" />
			<h2>命名空间也可以嵌套使用，形成层次结构，以更好地组织代码</h2>
			<Highlight :code="namespaceCode2" :auto="false" />
			<h2>不必要的命名空间</h2>
			<p class="font-bold">如果要将程序从命名空间转换为模块，则很容易得到如下所示的文件：</p>
			<el-tag>shapes.ts</el-tag>
			<Highlight :code="shapesCode" :auto="false" />
			<p class="font-bold">此处的顶级命名空间无缘无故地包装起来。 这对于模块的消费者来说是令人困惑和烦恼的</p>
			<el-tag>shapeConsumer.ts</el-tag>
			<Highlight :code="shapeConsumerCode" :auto="false" />
			<div class="font-bold tip">
				<p>
					TypeScript 中模块的一个关键特性是两个不同的模块永远不会为同一范围贡献名称。
					由于模块的使用者决定为其分配什么名称，因此无需主动将导出的符号包装在命名空间中。
				</p>
				<p>
					命名空间的一般思想是提供构造的逻辑分组并防止名称冲突。
					由于模块文件本身已经是一个逻辑分组，并且其顶级名称由导入它的代码定义，因此无需对导出的对象使用额外的模块层。
				</p>
			</div>
			<h2>修订示例：</h2>
			<el-tag>shapes.ts</el-tag>
			<Highlight :code="shapesCode1" :auto="false" />
			<el-tag>shapeConsumer.ts</el-tag>
			<Highlight :code="shapeConsumerCode1" :auto="false" />
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const link_URL = 'https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-modules';

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

const shapesCode = `export namespace Shapes {
  export class Triangle {
    /* ... */
  }
  export class Square {
    /* ... */
  }
}`;

const shapeConsumerCode = `import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?`;

const shapesCode1 = `export class Triangle {
  /* ... */
}
export class Square {
  /* ... */
}`;

const shapeConsumerCode1 = `import * as shapes from "./shapes";
let t = new shapes.Triangle();`;
</script>

<style scoped lang="scss"></style>
