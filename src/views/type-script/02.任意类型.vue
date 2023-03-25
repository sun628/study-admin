<template>
	<el-row>
		<doc title="Any 类型 和 unknown 顶级类型">
			<p>1.没有强制限定哪种类型，随时切换类型都可以 我们可以对 any 进行任何操作，不需要检查类型</p>
			<highlight :code="anyType"></highlight>
			<p>2.声明变量的时候没有指定任意类型默认为any</p>
			<highlight :code="anyType2"></highlight>
			<p>3.弊端如果使用any 就失去了TS类型检测的作用</p>
			<p>
				TypeScript 3.0中引入的 unknown 类型也被认为是 top type ，但它更安全。与 any 一样，所有类型都可以分配给unknown unknow
				unknow类型比any更加严格当你要使用any 的时候可以尝试使用unknow
			</p>
			<highlight :code="anyType3"></highlight>
			<p>区别2</p>
			<highlight :code="anyType4"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const anyType = `let anys:any = 123
anys = '123'
anys = true
`;
const anyType2 = `let anys
anys = '123'
anys = true
`;
const anyType3 = `
//unknown 可以定义任何类型的值
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = null;             // OK
value = undefined;        // OK
value = Symbol("type");   // OK

//这样写会报错unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型
//unknown类型不能赋值给其他类型
let names:unknown = '123'
let names2:string = names

//这样就没问题 any类型是可以的
let names:any = '123'
let names2:string = names

//unknown可赋值对象只有unknown 和 any
let bbb:unknown = '123'
let aaa:any= '456'

aaa = bbb
`;
const anyType4 = `
如果是any类型在对象没有这个属性的时候还在获取是不会报错的
let obj:any = {b:1}
obj.a
 
如果是unknow 是不能调用属性和方法
let obj:unknown = {b:1,ccc:():number=>213}
obj.b
obj.ccc()
`;
</script>

<style scoped lang="scss"></style>
