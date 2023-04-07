<template>
	<el-row>
		<doc title="1.属性和方法">
			<p>使用 class 定义类，使用 constructor 定义构造函数。</p>
			<p>通过 new 生成新实例的时候，会自动调用构造函数。</p>
			<highlight :code="classType1"></highlight>
		</doc>
		<doc title="2.类的存取器">
			<p>TypeScript支持通过<font>getters/setters</font>来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。</p>
			<highlight :code="classType2"></highlight>
		</doc>
		<doc title="3.类的继承与重写">
			<p>
				使用 <font>extends</font> 关键字实现继承，子类中使用 <font>super</font> 关键字来调用父类的构造函数和方法。这样可以抽出公共部分让子类复用。
			</p>
			<p>重写就是子类可以重新编写父类里边的代码。</p>
			<highlight :code="classType3"></highlight>
		</doc>
		<doc title="4.访问修饰符">
			<h2><font> >>public</font></h2>
			<p>public 修饰的属性或方法是公有的，在程序类的内部和外部都可以访问。类的成员全部默认为 public。</p>
			<highlight :code="classType4"></highlight>
			<h2><font> >>private</font></h2>
			<p>private 修饰的属性或方法是私有的，不能在声明它的类的外部访问，只能被类的内部访问，在子类中也不允许访问。</p>
			<p>当构造函数修饰为 private 时，该类不允许被继承或者实例化：</p>
			<h2><font> >>protected</font></h2>
			<p>protected 修饰的属性或方法是受保护的，只能被类的内部以及类的子类访问。</p>
			<highlight :code="classType5"></highlight>
			<h2><font> >>readonly</font></h2>
			<p>通过 readonly 关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。</p>
		</doc>
		<doc title="5.静态方法">
			<p>使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用，类的实例无法访问：</p>
			<highlight :code="classType6"></highlight>
			<p>静态方法调用同一个类中的其他静态方法，可使用 this 关键字：</p>
			<highlight :code="classType7"></highlight>
			<p>非静态方法中，不能直接使用 this 关键字来访问静态方法。而要用类本身或者构造函数的属性来调用该方法：</p>
			<highlight :code="classType8"></highlight>
			<p>类指向其构造函数本身，在非静态方法中，this.constructor === StaticMethodCall 为 true</p>
		</doc>
		<doc title="6.抽象类">
			<p><font>abstract</font> 用于定义抽象类、抽象类内部定义抽象方法。</p>
			<p>抽象类不允许被实例化，抽象类中的抽象方法必须被子类实现</p>
			<highlight :code="classType9"></highlight>
			<p>我们在A类定义了 getName 抽象方法但为实现</p>
			<p>我们B类实现了A定义的抽象方法 如不实现就不报错<font color="red">我们定义的抽象方法必须在派生类实现</font></p>
			<highlight :code="classType10"></highlight>
		</doc>
		<doc title="7.把类当做接口使用"> <highlight :code="classType11"></highlight> </doc>
	</el-row>
</template>
<script setup lang="ts">
const classType1 = `class Animal {
  public name;
  constructor(name) {
      this.name = name;
  }
  sayHi() {
      return "this.name"+this.name;
  }
}
let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack`;

const classType2 = `class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack`;
const classType3 = `class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(this.name,distanceInMeters);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);`;

const classType4 = `class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom`;

const classType5 = `class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name); // name 在子类中允许访问
  }
}`;
const classType6 = `class User {
	static getInfo() {
		return 'info';
	}
}
User.getInfo(); // info
const user = new User();
user.getInfo(); // 报错，静态方法不能被实例调用`;

const classType7 = `class StaticMethodCall {

static staticMethod() {
    return 'Static method has been called'
}

//静态方法中的 this 指向类本身，而静态方法也存在于类本身
//所以可以在静态方法中用 this 访问在同一类中的其他静态方法
static anotherStaticMethod() {
    return this.staticMethod() + ' from another static method'
}
}`;

const classType8 = `class StaticMethodCall {
  constructor() {
      // 类本身调用
      console.log(StaticMethodCall.staticMethod())

      // 构造函数的属性调用
      console.log(this.constructor.staticMethod())
  }
  static staticMethod() {
      return 'static method has been called.'
  }
}`;

const classType9 = `abstract class A {
   public name:string

}
new A() //报错，抽象类不能被实例化`;

const classType10 = `abstract class A {
   name: string
   constructor(name: string) {
      this.name = name;
   }
   print(): string {
      return this.name
   }

   abstract getName(): string
}

class B extends A {
   constructor() {
      super('sss')
   }
   getName(): string {
      return this.name
   }
}

let b = new B();

console.log(b.getName());`;

const classType11 = `class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};`;
</script>

<style scoped lang="scss"></style>
