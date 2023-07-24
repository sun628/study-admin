<template>
	<el-card>
		<doc title="声明文件d.ts">
			<h2>通常我们将有关于一些全局变量或者引入的模块对应的类型声明语句存在一个单独的文件，这样的文件就被成为声明文件。</h2>
			<h2><font color="red">当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。</font></h2>
			<div class="tip">
				<p>注意，声明文件一定要以 [name].d.ts 结尾。</p>
			</div>
			<p>声明文件的书写方式。比如：我们在项目内定义一个 jquery.d.ts 时:</p>
			<Highlight :code="jqueryCode" :auto="false" />
			<p>之后我们在项目内的 TS 文件中就可以在全局自由的使用声明的 jQuery 了：</p>
			<Highlight :code="jqueryCode1" :auto="false" />
			<p class="font-bold pt-2 pb-2">
				正常来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts
				文件就都可以获得 jQuery 的类型定义了。
			</p>
			<p class="font-bold tip">当然，上边我们提过到关于 tsc 文件的编译范围。所以如果找不到情况可以自行检查对应的 files、include 和 exclude 配置。</p>
			<div class="tip">
				<h2>我们可以通过 declare 关键字结合对应的类型，从而在任意 .d.ts 中进行全局类型的声明。</h2>
				<p>declare var 声明全局变量</p>
				<p>declare function 声明全局方法</p>
				<p>declare class 声明全局类</p>
				<p>declare enum 声明全局枚举类型</p>
				<p>declare namespace 声明（含有子属性的）全局对象</p>
				<p>interface 和 type 声明全局类型</p>
			</div>
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const jqueryCode = `// src/jQuery.d.ts
 
 // 定义全局变量 jQuery，它是一个方法
 declare var jQuery: (selector: string) => any;
 复制代码`;
const jqueryCode1 = `// src/index.ts
jQuery('#foo'); // Okay!`;
</script>

<style scoped lang="scss"></style>
