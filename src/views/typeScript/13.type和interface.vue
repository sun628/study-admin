<template>
	<div>
		<el-card>
			<doc title="相同点">
				<p class="tip">1.类型别名和接口都可以用来定义对象或函数</p>
				<Highlight :code="commonCode1"></Highlight>
				<p class="tip">2.类型别名和接口都可以被扩展(别名使用<i class="text-primary"> & </i>,接口使用 <span class="text-primary"> extends </span>)</p>
				<Highlight :code="commonCode2"></Highlight>
			</doc>
		</el-card>
		<el-card>
			<doc title="type和interface的区别☆☆☆">
				<div class="tip">
					<p>
						1.类型别名可以为基本类型、联合类型或元组类型定义别名,<i class="text-primary"
							>而接口不行（不能直接在接口上定义联合类型，只能通过属性定义联合类型）</i
						>
					</p>
					<p>2.同名接口会自动合并,<i class="text-primary">而类型别名不会</i></p>
				</div>
				<Highlight :code="interfaceCode" :auto="false"></Highlight>
			</doc>
		</el-card>
		<el-card>
			<doc title="类型别名和接口的一些使用场景">
				<h2>使用类型别名的场景</h2>
				<tip>
					<p>1.定义基本类型的别名时，使用type</p>
					<p>2.定义联合类型或者元组类型时，使用type</p>
					<p>3.定义函数的类型时，使用type</p>
					<p>4.定义映射类型时，使用type</p>
				</tip>
				<h2>使用接口的场景</h2>
				<tip>
					<p>1.需要使用扩展或者实现时，使用 interface</p>
					<p>2.定义对象类型时且无需使用type的时候，使用 interface</p>
				</tip>
			</doc>
		</el-card>
	</div>
</template>

<script setup lang="ts">
const commonCode1 = `// 类型使用方式
// type Point = {
// 	x: number;
// 	y: number;
// };
// type SetPoint = (x: number, y: number) => void;

// 接口使用方式
interface Point {
	x: number;
	y: number;
}
interface SetPoint {
	(x: number, y: number): void;
}`;

const commonCode2 = `// interface可以继承 type 只能通过 & 交叉类型合并
// interface Animal {
// 	name: string;
// }
type Animal = {
	name: string;
};
type Cat = Animal & {
	run: () => void;
};

interface Dog extends Animal {
	run: () => void;
}`;

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
