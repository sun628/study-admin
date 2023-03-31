<template>
	<el-row>
		<doc title="1.元组就是数组的变种">
			<h2>元组（Tuple）是固定数量的不同类型的元素的组合。</h2>
			<p>元组与集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定。元组的好处在于可以把多个元素作为一个单元传递。</p>
			<p>如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。</p>
			<highlight :code="tupleType1"></highlight>
			<p>当赋值或访问一个已知索引的元素时，会得到正确的类型：</p>
			<highlight :code="tupleType2"></highlight>
			<p>元组类型还可以支持自定义名称和变为可选的</p>
			<highlight :code="tupleType3"></highlight>
		</doc>
		<doc title="2.越界元素">
			<p>当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：</p>
			<highlight :code="tupleType4"></highlight>
		</doc>
		<doc title="3.应用场景 例如定义excel返回的数据">
			<p>例如定义excel返回的数据</p>
			<highlight :code="tupleType5"></highlight>
		</doc>
		<doc title="4.解构元组">
			<highlight :code="tupleType6"></highlight>
			<p>如果我们不需要解构元组中的全部元素，就可以像下面这样解构：</p>
			<highlight :code="tupleType7"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const tupleType1 = `let arr:[number,string] = [1,'string']
 let arr2: readonly [number,boolean,string,undefined] = [1,true,'sring',undefined]`;

const tupleType2 = `let arr:[number,string] = [1,'string']
arr[0].length //error //数字是没有length 的
arr[1].length //success //字符串有length`;

const tupleType3 = `let a:[x:number,y?:boolean] = [1]`;

const tupleType4 = `let arr:[number,string] = [1,'string']
arr[3] = true //error //不能将类型“true”分配给类型“undefined”。
//长度为 "2" 的元组类型 "[number, string]" 在索引 "3" 处没有元素。`;

const tupleType5 = `let excel: [string, string, number, string][] = [
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
    ['title', 'name', 1, '123'],
]`;
const tupleType6 = `
let mytup:[number, string, boolean] = [7, 'summer', true];
let [a, b, c] = mytup;

//编译成 JavaScript 代码：
var mytup = [7, 'summer', true];
var a = mytup[0], b = mytup[1], c = mytup[2];
`;

const tupleType7 = `let mytup:[number, string, boolean] = [7, 'summer', true];
let [a, ...arg] = mytup;

//编译成 JavaScript 代码：
var mytup = [7, 'summer', true];
var a = mytup[0], arg = mytup.slice(1);`;
</script>

<style scoped lang="scss"></style>
