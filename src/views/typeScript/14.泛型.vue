<template>
	<el-row>
		<el-col :span="16">
			<el-card>
				<doc title="一、泛型是什么？有什么作用？" link="1">
					<div class="tip">
						<p>当我们定义一个变量不确定类型的时候有两种解决方式：</p>
						<ul>
							<li>使用any类型，这样就可以接收任意类型的值，但是这样就放弃了类型检查。</li>
							<li>使用泛型，泛型可以支持不特定的数据类型，要求传入的参数和返回的参数一致。</li>
						</ul>
					</div>
				</doc>
				<doc title="二、泛型用法" link="2">
					<h2 link="2.1">2.1 在函数中使用泛型</h2>
					<p>使用方式类似于<em class="Highlight-keywords">函数传参</em>，传什么数据类型，T 就表示什么数据类型， 使用表示，T 也可以换成任意字符串。</p>
					<Highlight :code="fnCode" />
					<h2>2.2 在接口中使用泛型</h2>
					<Highlight :code="interfaceCode" />
					<h3>2.3 在类中使用泛型</h3>
					<Highlight :code="classCode" />
				</doc>
				<doc title="三、泛型约束" link="3">
					<h2>案例1</h2>
					<p class="tip">1.我们期望在一个泛型的变量上面，获取其length参数，但是，有的数据类型是没有length属性的</p>
					<Highlight :code="constraintCode" />
					<p class="tip">所以，我们就得对使用的泛型进行约束，我们约束其为具有length属性的类型，这里我们会用到interface,代码如下</p>
					<Highlight :code="constraintCode1" />
					<h2>案例2</h2>
					<Highlight :code="constraintCode2" />
					<h2>案例3：使用keyof 约束对象</h2>
					<p>
						首先定义了T类型并使用extends关键字继承object类型的子类型，然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合
						类型，最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型。
					</p>
					<Highlight :code="constraintCode3" />
					<h2>案例4：泛型类</h2>
					<p class="tip">声明方法跟函数类似名称后面定义&lt;类型&gt;,使用的时候确定类型new Sub &lt;number&gt;()</p>
					<Highlight :code="constraintCode4" />
					<h3>案例5：数组泛型</h3>
					<p class="tip">我们可以使用数组泛型来定义数组的类型</p>
					<Highlight :code="constraintCode5" />
				</doc>
			</el-card>
		</el-col>

		<el-col :span="4" class="ml-10">
			<directory :data="directoryData" />
		</el-col>
	</el-row>
</template>
<script setup lang="ts">
import directory from '@/components/directory/index.vue';
const directoryData = [
	{ label: '泛型的定义', link: 1 },
	{ label: '泛型用法', link: 2 },
	{ label: '泛型约束', link: 3 },
];

const fnCode = `function test<T>(arg: T): T {
	console.log(arg);
	return arg;
}
test<number>(111); // 返回值是number类型的 111
test<string | boolean>('hahaha'); //返回值是string类型的 hahaha
test<string | boolean>(true); //返回值是布尔类型的 true`;

const interfaceCode = `// 注意，这里写法是定义的方法，不是实现的方法
interface Search {
  <T,Y>(name:T,age:Y):T
}

let fn:Search = function <T, Y>(name: T, id:Y):T {
  console.log(name, id)
  return name;
}
fn('li',11);// 编译器会自动识别传入的参数，将传入的参数的类型认为是泛型指定的类型
`;

const classCode = `class Animal<T> {
 name:T;
 constructor(name: T){
  this.name = name;
 }
 action<T>(say:T) {
   console.log(say)
 }
}
let cat = new Animal('cat');
cat.action('mimi')
`;

const constraintCode = `function getLegnth<T>(arg: T) {
	return arg.length; // 报错：类型“T”上不存在属性“length”。
}`;

const constraintCode1 = `interface Len {
	length: number;
}

function getLegnth<T extends Len>(arg: T) {
	return arg.length;
}

getLegnth<string>('123');`;

const constraintCode2 = `interface Person {
	name: string;
	age: number;
}
function student<T extends Person>(arg: T): T {
	return arg;
}

student({ name: 'lili' }); //类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Person" 中需要该属性
student({ name: 'lili', age: '11' }); //不能将类型“string”分配给类型“number”
student({ name: 'lili', age: 11 });`;

const constraintCode3 = `function prop<T, K extends keyof T>(obj: T, key: K) {
	return obj[key];
}

let o = { a: 1, b: 2, c: 3 };

prop(o, 'a');
prop(o, 'd'); //此时就会报错发现找不到d属性`;

const constraintCode4 = `class Sub<T>{
   attr: T[] = [];
   add (a:T):T[] {
      return [a]
   }
}

let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)

let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')`;

const constraintCode5 = `let arr: Array<number> = [1, 2, 3]; // interface Array<T>
let arr1: number[] = [1, 2, 3]; // arr === arr1`;

// 注意，这里写法是定义的方法，不是实现的方法
interface Search {
	<T, Y>(name: T, age: Y): T;
}
</script>
<style scoped lang="scss">
ul {
	list-style: inside;
}
</style>
