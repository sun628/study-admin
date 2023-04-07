<template>
	<el-row>
		<doc title="对象的类型">
			<p>
				在<font>typescript</font>中，我们定义对象的方式要用关键字interface（接口），
				我的理解是使用interface来定义一种约束，让数据的结构满足约束的格式。定义方式如下：
			</p>
			<highlight :code="objType"></highlight>
			<highlight :code="objType2"></highlight>
		</doc>
		<doc title="可选属性 使用?操作符">
			<highlight :code="objType3"></highlight>
		</doc>
		<doc title="任意属性 [propName: string]">
			<p><font color="red">需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：</font></p>
		</doc>
		<doc title="只读属性 readonly">
			<p>readonly 只读属性是不允许被赋值的只能读取</p>
			<highlight :code="objType4"></highlight>
		</doc>
		<doc title="添加函数">
			<p>在接口中添加函数</p>
			<highlight :code="objType5"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const objType = `//这样写是会报错的 因为我们在person定义了a，b但是对象里面缺少b属性
//使用接口约束的时候不能多一个属性也不能少一个属性
//必须与接口保持一致

interface Person {
    b:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}`;

const objType2 = `//重名interface  可以合并
interface A{name:string}
interface A{age:number}
var x:A={name:'xx',age:20}
//继承
interface A{
    name:string
}
 
interface B extends A{
    age:number
}
 
let obj:B = {
    age:18,
    name:"string"
}`;

const objType3 = `//可选属性的含义是该属性可以不存在
//所以说这样写也是没问题的
interface Person {
    b?:string,
    a:string
}
 
const person:Person  = {
    a:"213"
}`;

const objType4 = `//这样写是会报错的
//应为a是只读的不允许重新赋值
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
}
 
const person: Person = {
    a: "213",
    c: "123"
}
 
person.a = 123`;

const objType5 = `interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any;
    cb:()=>void
}
 
const person: Person = {
    a: "213",
    c: "123",
    cb:()=>{
        console.log(123)
    }
}`;
</script>

<style scoped lang="scss"></style>
