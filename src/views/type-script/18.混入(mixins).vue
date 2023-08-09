<template>
	<el-card>
		<doc title="混入（mixins）">
			<div class="tip font-bold">
				<p>在 TypeScript 中，可以根据不同的功能定义多个可复用的类，它们将作为 mixins。</p>
				<p>因为 extends 只支持继承一个父类，我们可以通过 implements 来连接多个 mixins，并且使用原型链连接子类的方法和父类的方法。</p>
				<p>这就像组件拼合一样，由一堆细粒度的 mixins 快速搭建起一个功能强大的类。</p>
			</div>
		</doc>
		<doc title="1.对象的混入">
			<p class="tip">可以使用es6的Object.assign 合并多个对象 此时 people 会被推断成一个交差类型 Name & Age & sex;</p>
			<Highlight :code="code1" />
		</doc>
		<doc title="2.类的混入">
			<p class="tip">
				Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性， 对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名
			</p>
			<Highlight :code="code2" />
		</doc>
	</el-card>
</template>

<script setup lang="ts">
const code1 = `interface Name {
	name: string;
}
interface Age {
	age: number;
}
interface Sex {
	sex: number;
}

let people1: Name = { name: '张三' };
let people2: Age = { age: 20 };
let people3: Sex = { sex: 1 };

const people = Object.assign(people1, people2, people3);`;

const code2 = `class Jumpable {
	jump() {
		console.log('jump');
	}
}

class Duckable {
	duck() {
		console.log('duck');
	}
}

class Sprite {
	x = 0;
	y = 0;
}

// eslint-disable-next-line no-redeclare
interface Sprite extends Jumpable, Duckable {}
applyMixins(Sprite, [Jumpable, Duckable]);

let player = new Sprite();
player.jump();
console.log(player.x, player.y);

function applyMixins(derivedCtor: any, constructors: any[]) {
	constructors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
		});
	});
}`;
</script>

<style scoped lang="scss"></style>
