<template>
	<el-row>
		<h2>在javaScript中是没有枚举的概念的TS帮我们定义了枚举这个类型</h2>
		<h2>使用枚举 通过enum关键字定义我们的枚举</h2>
		<doc title="1.数字枚举">
			<p>例如 红绿蓝 Red = 0 Green = 1 Blue= 2 分别代表红色0 绿色为1 蓝色为2</p>
			<Highlight :code="enumType1"></Highlight>
			<p>增长枚举</p>
			<Highlight :code="enumType2"></Highlight>
			<p>如上，我们定义了一个数字枚举， Red使用初始化为 1。 其余的成员会从 1开始自动增长。 换句话说， Type.Red的值为 1， Green为 2， Blue为 3。</p>
		</doc>
		<doc title="2.字符串枚举">
			<p>字符串枚举的概念很简单。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。</p>
			<Highlight :code="enumType3"></Highlight>
			<p>由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。</p>
			<p>
				换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 -
				它并不能表达有用的信息，字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。
			</p>
		</doc>
		<doc title="3.异构枚举">
			<p>枚举可以混合字符串和数字成员</p>
			<Highlight :code="enumType4"></Highlight>
		</doc>
		<doc title="4.接口枚举">
			<p>定义一个枚举Types 定义一个接口A 他有一个属性red 值为Types.yyds</p>
			<p>声明对象的时候要遵循这个规则</p>
			<p>接口枚举的好处是可以在编译阶段就确定枚举的值</p>
			<Highlight :code="enumType5" :auto="false"></Highlight>
		</doc>
		<doc title="5.const枚举">
			<p>let 和 var 都是不允许的声明只能使用const</p>
			<p>const 声明的枚举会被编译成常量。 普通声明的枚举编译完后是个对象</p>
			<Highlight :code="enumType6"></Highlight>
			<p>正常情况应该不需要 const enum 这个东西，现代的 v8 速度已经不需要我们在乎这些细节。</p>
		</doc>
		<doc title="6.反向映射">
			<p>它包含了正向映射（ name -> value）和反向映射（ value -> name）</p>
			<p>要注意的是 不会为字符串枚举成员生成反向映射。</p>
			<Highlight :code="enumType7"></Highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const enumType1 = `enum Color {Red, Green, Blue}

//这样写就可以实现应为ts定义的枚举中的每一个组员默认都是从0开始的所以也就是
enum Types{
   Red = 0,
   Green = 1,
   BLue = 2
}
//默认就是从0开始的 可以不写值
`;
const enumType2 = `enum Types{
   Red = 1,
   Green,
   BLue
}`;

const enumType3 = `enum Color {Red = "red", Green = "green", Blue = "blue"}`;

const enumType4 = `enum Types {
  No = 0,
  Yes = "YES",
}`;

const enumType5 = `enum Types {
	yyds,
	dddd,
}
interface A {
	red: Types.yyds;
}
let obj: A = {
	red: Types.yyds,
};`;

const enumType6 = `
//普通声明的枚举编译完后是个对象
export enum EVar {
  A = 'a',
  B = A,
}
// 编译后
(function (EVar) {
    EVar["A"] = "a";
    EVar["B"] = "a";
})(EVar || (EVar = {}));

//const 声明的枚举会被编译成常量
export const enum EVar {
  A = 'a',
  B = 'b',
}
console.log(EVar.B)
// 编译后
console.log("b");
`;

const enumType7 = `enum Enum {
   fail
}
let a = Enum.fail;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fail`;
</script>

<style scoped lang="scss"></style>
