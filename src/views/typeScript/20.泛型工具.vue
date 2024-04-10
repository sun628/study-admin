<template>
	<el-card>
		<doc title="泛型工具">
			<Tip>
				<h2>TypeScript 泛型工具：提升类型灵活性和重用性。</h2>
				<p>泛型工具是一组预定义的泛型类型和操作符，用于操作和转换类型。它们可以帮助我们编写更灵活、更通用的代码，并提高代码的可读性和可维护性。</p>
			</Tip>
		</doc>
		<doc title="Partial和Required">
			<p class="tip">Partial 是一个泛型类型，用于将一个类型的所有属性变为可选。与之相反，Required 是一个泛型类型，用于将一个类型的所有属性变为必选</p>
			<h2>Partial(可选)</h2>
			<Highlight :code="PartialCode" lang="typeScript" />
			<h2>Required(必选)</h2>
			<Highlight :code="RequiredCode" lang="typeScript" />
		</doc>
		<doc title="Pick 和 Exclude">
			<p class="tip">Pick 和 Exclude 是两个泛型类型，用于从一个类型中提取属性或排除属性。</p>
			<h2>Pick</h2>
			<p>从一个类型中提取属性</p>
			<Highlight :code="PickCode" lang="typeScript" />
			<h2>Exclude</h2>
			<p>从一个类型中排除属性（第一个参数是联合类型，第二个参数是要排除的类型）</p>
			<Highlight :code="ExcludeCode" lang="typeScript" />
		</doc>
		<doc title="Omit">
			<p class="tip">Omit 是一个泛型类型，用于从一个类型中排除指定的属性。</p>
			<h2>Omit</h2>
			<p>从一个类型中排除指定的属性</p>
			<Highlight :code="OmitCode" lang="typeScript" />
		</doc>
		<doc title="Record">
			<p class="tip">Record 接受两个泛型，用于约束对象的Key以及Value</p>
			<h2>Record</h2>
			<Highlight :code="RecordCode" lang="typeScript" />
		</doc>
		<doc title="ReturnType">
			<p class="tip">ReturnType 是一个泛型类型，用于获取函数的返回值类型。</p>
			<h2>ReturnType</h2>
			<Highlight :code="ReturnTypeCode" lang="typeScript" />
		</doc>
		<doc title="Parameters">
			<p class="tip">Parameters 是一个泛型类型，用于获取函数的参数类型。</p>
			<h2>Parameters</h2>
			<p>获取函数的参数类型</p>
			<Highlight :code="ParametersCode" lang="typeScript" />
		</doc>
	</el-card>
</template>

<script setup lang="ts">
const PartialCode = `interface User {
	name: string;
	age: number;
  }

  type test = Partial<User>;

  //转换完成之后的结果
  // type test = {
  // 	name?: string | undefined;
  // 	age?: number | undefined;
  // };

  //原理
  type CustomPratial<T> = {
    [P in keyof T]?: T[P];
  };

  type test1 = CustomPratial<User>;`;

const RequiredCode = `interface User {
	name?: string;
	age?: number;
  }

  type test = Required<User>;

  //转换完成之后的结果
  // type test = {
  // 	name: string;
  // 	age: number;
  // };

  //原理
  type CustomRequired<T> = {
    [P in keyof T]-?: T[P]; // -? 代表去掉可选
  };

  type test1 = CustomRequired<User>;`;

const PickCode = `interface User {
    name?: string;
    age: number;
    address?: string;
  }

  type test = Pick<User, 'name' | 'age'>;

  //转换完成之后的结果
  // type test = {
  // 	name?: string | undefined;
  // 	age: number;
  // };

  //原理
  type CustomPick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  type test1 = CustomPick<User, 'name' | 'age'>;`;

const ExcludeCode = `interface User {
    name?: string;
    age: number;
    address?: string;
  }

  // keyof 可以获取一个类型的所有键，返回一个联合类型
  const keys: keyof User = 'name' || 'age' || 'address';

  // EXclude 第一个参数是联合类型，第二个参数是要排除的类型
  type test = Exclude<keyof User, 'name' | 'age'>;

  //转换完成之后的结果
  // type test = {
  // 	address?: string | undefined;
  // };

  //原理
  type CustomExclude<T, K> = T extends K ? never : T; // necer在联合类型中代表排除
  type test2 = 'a' | 'b' | never; // 将只会剩下 'a' | 'b'

  type test1 = CustomExclude<keyof User, 'name' | 'age'>;`;

const OmitCode = `interface User {
    address?: string;
    name?: string;
    age?: number;
  }

  type test = Omit<User, 'age'>;

  // 转换完成之后的结果
  // type test = {
  // 	address?: string | undefined;
  // 	name?: string | undefined;
  // };

  // 原理
  type coustomOmit<T, K> = Pick<T, Exclude<keyof T, K>>; // 先排除，再提取

  type test1 = coustomOmit<User, 'age'>;`;

const RecordCode = `type key = 'c' | 'x' | 'k';

  type test = Record<key, '唱' | '跳' | 'rap'>;

  //转换完成之后的结果
  // type test = {
  // 	c: '唱' | '跳' | 'rap';
  // 	x: '唱' | '跳' | 'rap';
  // 	k: '唱' | '跳' | 'rap';
  // };

  const obj: Record<key, '唱' | '跳' | 'rap'> = {
    c: '唱',
    x: '跳',
    k: '跳',
  };

  //原理  key只能是number | string | symbol 三种类型
  // keyof any 等价于 keyof number | string | symbol
  type CustomRecord<K extends keyof any, T> = {
    [P in K]: T;
  };

  type test1 = CustomRecord<key, '唱' | '跳' | 'rap'>;`;

const ReturnTypeCode = `const fn = (name: string, age: number) => {
    return { name, age };
  };

  type test = ReturnType<typeof fn>;

  //转换完成之后的结果
  // type test = {
  // 	name: string;
  // 	age: number;
  // };

  //原理 infer R 代表推断出来的类型
  type CustomReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

  const fn1 = () => [222, '2233'];
  type test1 = CustomReturnType<typeof fn1>;`;

const ParametersCode = `type MyFn = (arg1: number, arg2: string) => void;

type MyFnParams = Parameters<MyFn>;
// type MyFnParams = [number, string]

/**
 * 原理：
 * T extends (...args: any) => any：确保 T 是一个函数类型。
 * infer P：使用条件类型推断出函数的参数类型，并将其赋值给 P。
 * ? P : never：如果推断成功，返回参数类型 P，否则返回 never。
 **/
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type MyFnParams1 = MyParameters<MyFn>;
// type MyFnParams1 = [number, string]`;
</script>

<style scoped lang="scss"></style>
