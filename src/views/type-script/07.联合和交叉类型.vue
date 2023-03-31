<template>
	<el-row>
		<doc title="联合类型">
			<highlight :code="unionType1"></highlight>
			<p>函数使用联合类型</p>
			<highlight :code="unionType2"></highlight>
		</doc>
		<doc title="交叉类型">
			<p>多种类型的集合，联合对象将具有所联合类型的所有成员</p>
			<highlight :code="crossType1"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const unionType1 = `//例如我们的手机号通常是13XXXXXXX 为数字类型 这时候产品说需要支持座机
//所以我们就可以使用联合类型支持座机字符串
let myPhone: number | string  = '010-820'
 
//这样写是会报错的应为我们的联合类型只有数字和字符串并没有布尔值
let myPhone: number | string  = true`;

const unionType2 = `const fn = (something:number | boolean):boolean => {
     return !!something
}`;

const crossType1 = `interface People {
  age: number,
  height： number
}
interface Man{
  sex: string
}
const geUserInfo = (man: People & Man) => {
  console.log(man.age)
  console.log(man.height)
  console.log(man.sex)
}
geUserInfo({age: 18,height: 180,sex: 'male'});`;
</script>

<style scoped lang="scss"></style>
