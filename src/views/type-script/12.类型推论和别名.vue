<template>
	<el-card>
		<doc title="1.什么是类型推论">
			<p>TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论</p>
			<highlight :code="inferCode"></highlight>
			<p>如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型可以进行任何操作</p>
			<highlight :code="inferCode2"></highlight>
		</doc>
		<doc title="2.类型别名">
			<p>type 关键字（可以给一个类型定义一个名字）多用于复合类型</p>
			<p>定义类型别名</p>
			<highlight :code="TypeCode"></highlight>
			<p>定义函数别名</p>
			<highlight :code="FunctionCode"></highlight>
			<p>定义联合类型别名</p>
			<highlight :code="UnionCode"></highlight>
			<p>定义值的别名</p>
			<highlight :code="ValueCode"></highlight>
		</doc>
	</el-card>
</template>
<script setup lang="ts">
const inferCode = `let name = 'string';
//let name: string='string'; //ts会自动推断出是string类型
`;
const inferCode2 = `let anyName;  //ts会自动推断出是any类型
anyName = 'string';
anyName = 1`;

const TypeCode = `type str = string;
let s: str = '类型别名';
`;
const FunctionCode = `type fun = (x: number, y: number) => number;
let f: fun = (x, y) => x + y;
`;
const UnionCode = `type strOrNum = string | number;
let s: strOrNum = '类型别名';
let n: strOrNum = 1;
`;

//定义值的别名
const ValueCode = `type value = boolean | 0 | '213';

let s:value = true
//变量s的值  只能是上面value定义的值';
`;
</script>
<style scoped lang="scss"></style>
