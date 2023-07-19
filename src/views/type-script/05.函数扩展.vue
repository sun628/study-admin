<template>
	<el-row>
		<doc title="1.函数的类型">
			<Highlight :code="arraryType1"></Highlight>
		</doc>
		<doc title="2.函数的可选参数?">
			<Highlight :code="arraryType2"></Highlight>
		</doc>
		<doc title="3.函数参数的默认值">
			<Highlight :code="arraryType3"></Highlight>
		</doc>
		<doc title="4.接口定义函数">
			<Highlight :code="arraryType4"></Highlight>
		</doc>
		<doc title="5.定义剩余参数">
			<Highlight :code="arraryType5"></Highlight>
		</doc>
		<doc title="5.函数重载">
			<p>重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。</p>
			<p>如果参数类型不同，则参数类型应设置为 any。</p>
			<p>参数数量不同你可以将不同的参数设置为可选。</p>
			<Highlight :code="arraryType6"></Highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const arraryType1 = `//注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn = (name: string, age:number): string => {
    return name + age
}
fn('张三',18)`;

const arraryType2 = `//可选参数必须放在最后面
const fn = (name: string, age?:number): string => {
    return name + age
}
fn('张三')`;

const arraryType3 = `//默认参数
const fn = (name: string, age:number = 18): string => {
    return name + age
}
fn('张三')`;

const arraryType4 = `//定义参数 num 和 num2  ：后面定义返回值的类型
interface Add {
    (num:  number, num2: number): number
}
 
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)
 
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}`;
const arraryType5 = `const fn = (array:number[],...items:any[]):any[] => {
       console.log(array,items)
       return items
}
 
let a:number[] = [1,2,3]
 
fn(a,'4','5','6')`;

const arraryType6 = `function fn(params: number): void
 
 function fn(params: string, params2: number): void
  
 function fn(params: any, params2?: any): void {
     console.log(params)
     console.log(params2)
 }
  
 fn(123)
  
 fn('123',456)`;
</script>

<style scoped lang="scss"></style>
