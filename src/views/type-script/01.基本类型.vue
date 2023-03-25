<template>
	<el-row>
		<doc title="基础类型：">
			<highlight language="js" :code="baseType"></highlight>
		</doc>
		<doc title="1.字符串类型：">
			<p>字符串是使用string定义的;</p>
			<highlight language="js" :code="stringType"></highlight>
		</doc>
		<doc title="2.数字类型：">
			<p>支持十六进制、十进制、八进制和二进制；</p>
			<highlight language="js" :code="numberType"></highlight>
		</doc>
		<doc title="3.布尔类型：">
			<font color="red">注意，使用构造函数 Boolean 创造的对象不是布尔值：</font>
			<highlight language="js" :code="booleanType"></highlight>
		</doc>
		<doc title="4.空值类型：">
			<p>JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数</p>
			<highlight language="js" :code="voidType"></highlight>
			<p>void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的异步回调函数</p>
			<p>void也可以定义undefined 和 null类型</p>
			<highlight language="js" :code="voidType2"></highlight>
		</doc>
		<doc title="5.Null和undefined类型：">
			<highlight language="js" :code="nullOrUndefinedType"></highlight>
			<font color="red">void 和 undefined 和 null 最大的区别</font>
			<p>与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string 类型的变量：</p>
			<highlight language="js" :code="nullOrUndefinedType2"></highlight>
			<highlight language="js" :code="nullOrUndefinedType3"></highlight>
		</doc>
	</el-row>
</template>

<script setup lang="ts">
const baseType = `Boolean、Number、String、null、undefined 以及ES6的Symbol 和 ES10的BigInt。`;
const stringType = "let a: string = '123' //普通声明;\n" + 'let str: string = `dddd${a}`//也可以使用es6的字符串模板';

const numberType = `let notANumber: number = NaN;//Nan
let num: number = 123;//普通数字
let infinityNumber: number = Infinity;//无穷大
let decimal: number = 6;//十进制
let hex: number = 0xf00d;//十六进制
let binary: number = 0b1010;//二进制
let octal: number = 0o744;//八进制`;

const booleanType = `let createdBoolean: boolean = new Boolean(1);
//这样会报错 应为事实上 new Boolean() 返回的是一个 Boolean 对象`;

const voidType = `function voidFn(): void {
    console.log('test void')
}`;
const voidType2 = `let u: void = undefined
let n: void = null;`;
const nullOrUndefinedType = `let u: undefined = undefined;//定义undefined
let n: null = null;//定义null`;
const nullOrUndefinedType2 = `//这样写会报错 void类型不可以分给其他类型
let test: void = undefined
let num2: string = "1"
num2 = test`;
const nullOrUndefinedType3 = `//这样是没问题的
let test: null = null
let num2: string = "1"
 
num2 = test
 
//或者这样的
let test: undefined = undefined
let num2: string = "1"
 
num2 = test`;
</script>

<style scoped lang="scss"></style>
