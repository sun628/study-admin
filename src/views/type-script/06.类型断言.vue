<template>
	<el-row>
		<doc title="1.类型断言">
			<p>
				<font color="red"><span v-text="'语法：值 as 类型或<类型>值  value as string  <string>value'"></span></font>
			</p>
			<highlight :code="assertType1"></highlight>
			<highlight :code="assertType2"></highlight>
			<p>需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误</p>
		</doc>
		<doc title="2.使用any临时断言">
			<highlight :code="assertType3"></highlight>
		</doc>
		<doc title="2.as const">
			<highlight :code="assertType4"></highlight>
		</doc>
		<doc title="3.类型断言是不具影响力的">
			<p>在下面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用 并不会影响结果, 因为编译过程中会删除类型断言</p>
			<highlight :code="assertType5"></highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
const assertType1 = `interface A {
       run: string
}

interface B {
       build: string
}

const fn = (type: A | B): string => {
       return type.run
}
//这样写是有警告的应为B的接口上面是没有定义run这个属性的`;

const assertType2 = `interface A {
       run: string
}

interface B {
       build: string
}

const fn = (type: A | B): string => {
       return (type as A).run
}
//可以使用类型断言来推断他传入的是A接口的值`;

const assertType3 = `window.abc = 123
//这样写会报错因为window没有abc这个东西

//但是我们可以使用any临时断言来解决这个问题
(window as any).abc = 123
`;

const assertType4 = `const names = 'zz'
names = 'aa' //无法修改

let names2 = 'zz' as const
names2 = 'aa' //无法修改

// 数组
let a1 = [10, 20] as const;
const a2 = [10, 20];
 
a1.unshift(30); // 错误，此时已经断言字面量为[10, 20],数据无法做任何修改
a2.unshift(30); // 通过，没有修改指针`;

const assertType5 = `function toBoolean(something: any): boolean {
    return something as boolean;
}
 
toBoolean(1);
// 返回值为 1`;
</script>

<style scoped lang="scss"></style>
