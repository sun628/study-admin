<template>
	<el-card>
		<doc title="1.什么是类型推论">
			<p>TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论</p>
			<Highlight :code="inferCode"></Highlight>
			<p>如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型可以进行任何操作</p>
			<Highlight :code="inferCode2"></Highlight>
		</doc>
		<doc title="2.类型别名">
			<p>type 关键字（可以给一个类型定义一个名字）多用于复合类型</p>
			<p>定义类型别名</p>
			<Highlight :code="typeCode"></Highlight>
			<p>定义函数别名</p>
			<Highlight :code="FunctionCode"></Highlight>
			<p>定义联合类型别名</p>
			<Highlight :code="UnionCode"></Highlight>
			<p>定义值的别名</p>
			<Highlight :code="ValueCode"></Highlight>
			<p class="font-bold">type高级用法</p>
			<p>左边的值会作为右边值的子类型遵循图中上下的包含关系</p>
			<Highlight :code="typeCode2"></Highlight>
		</doc>
		<doc title="type和interface的区别☆☆☆">
			<div class="tip">
				<h2>相同点：</h2>
				<p>都可以用来定义类型。</p>
			</div>
			<div class="tip">
				<h2>不同点：</h2>
				<p>1.interface可以继承 type 只能通过 & 交叉类型合并 3.interface 遇到重名的会合并 type 不行</p>
				<p>2.type 可以定义 联合类型 和 可以使用一些操作符 interface不行（不能直接在接口上定义联合类型，只能通过属性定义联合类型）</p>
				<p>3.interface 遇到重名的会合并 type 不行</p>
			</div>
			<Highlight :code="interfaceCode" :auto="false"></Highlight>
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

const typeCode = `type str = string;
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

//type高级用法
const typeCode2 = `type a = 1 extends number ? 1 : 0 //1
 
 type a = 1 extends Number ? 1 : 0 //1
  
 type a = 1 extends Object ? 1 : 0 //1
  
 type a = 1 extends any ? 1 : 0 //1
  
 type a = 1 extends unknow ? 1 : 0 //1
  
 type a = 1 extends never ? 1 : 0 //0`;

const interfaceCode = `// 这是错误的
interface MyInterface : TypeA | TypeB { } // 不能直接在接口上定义联合类型

// 这是正确的
interface MyInterface {
    prop: TypeA | TypeB;// 可以在这些属性中定义联合类型
}

// 如果你想要创建一个具有多个可能类型的接口，你应该使用类型别名（type）加联合类型：
type MyType = TypeA | TypeB;`;
</script>
<style scoped lang="scss"></style>
