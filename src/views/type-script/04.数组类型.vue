<template>
	<el-row>
		<doc title="1.数组的类型">
			<p>类型[]</p>
			<highlight :code="arrayType1"></highlight>
		</doc>
		<doc title="2.数组泛型">
			<p v-text="'规则 Array<类型>'"></p>
			<highlight :code="arrayType2"></highlight>
		</doc>
		<doc title="3.用接口表示数组">
			<p>一般用来描述类数组</p>
			<highlight :code="arrayType3"></highlight>
		</doc>
		<doc title="4.多维数组">
			<highlight :code="arrayType4"></highlight>
		</doc>
		<doc title="5.arguments类数组">
			<highlight :code="arrayType5"></highlight>
		</doc>
		<doc title="6.any 在数组中的应用">
			<p>一个常见的例子数组中可以存在任意类型</p>
			<highlight :code="arrayType6"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const arrayType1 = `//类型加中括号
let arr:number[] = [123]
//这样会报错定义了数字类型出现字符串是不允许的
let arr:number[] = [1,2,3,'1']
//操作方法添加也是不允许的
let arr:number[] = [1,2,3,]
arr.unshift('1')
 
var arr: number[] = [1, 2, 3]; //数字类型的数组
var arr2: string[] = ["1", "2"]; //字符串类型的数组
var arr3: any[] = [1, "2", true]; //任意类型的数组`;

const arrayType2 = `let arr:Array<number> = [1,2,3,4,5]; //定义数字类型的数组`;

const arrayType3 = `interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
//表示：只要索引的类型是数字时，那么值的类型必须是数字。`;

const arrayType4 = `let arr: number[][] = [[1, 2], [3, 4], [5, 6]];`;

const arrayType5 = `function Arr(...args:any): void {
    console.log(arguments)
    //错误的arguments 是类数组不能这样定义
    let arr:number[] = arguments
}
Arr(111, 222, 333)
 
function Arr(...args:any): void {
    console.log(arguments) 
    //ts内置对象IArguments 定义
    let arr:IArguments = arguments
}
Arr(111, 222, 333)
 
//其中 IArguments 是 TypeScript 中定义好了的类型，它实际上就是：
interface IArguments {
[index: number]: any;
length: number;
callee: Function;
}`;

const arrayType6 = `let arr: any[] = [1, "2", true]; //任意类型的数组`;
</script>

<style scoped lang="scss"></style>
