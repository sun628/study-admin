<template>
	<el-row>
		<doc title="url模块">
			<div>API太多了，累了 <el-link href="https://www.nodeapp.cn/url.html" target="_blank" type="primary">（文档地址）</el-link></div>
			<h2>url 模块提供了用于解析和格式化 URL（Uniform Resource Locator，统一资源定位符）的工具。URL 是用于定位和访问互联网上资源的字符串。</h2>
			<h2>url 模块的功能包括解析 URL、构建 URL、处理查询字符串等。</h2>
			<h3 class="flex items-center">
				<p>1. 解析URL（url.parse()）</p>
				<HighFont>（旧版用法）</HighFont>
			</h3>
			<p>
				url.parse() 方法用于解析一个 URL 字符串，并返回一个 URL 对象，其中包含了 URL 的各个组成部分。
				包括协议（protocol）、主机（host）、端口（port）、路径（pathname）和查询参数（query）等。
			</p>
			<Highlight :code="code1"></Highlight>

			<!-- 新版new URL使用 -->
			<h3 class="flex items-center">
				<p>1. 解析URL（new URL()）</p>
				<HighFont>（新版用法）</HighFont>
			</h3>
			<Highlight :code="url1"></Highlight>
			<h3><p>2. 构建 URL（url.format()）</p></h3>
			<p>url.format() 方法用于将一个 URL 对象转换为 URL 字符串。例如：</p>
			<Highlight :code="code2"></Highlight>
			<h3><p>3. 拼接字符串（url.resolve(from, to)）</p></h3>
			<p>用于将一个相对 URL（to）解析成一个绝对 URL，相对于另一个绝对 URL（from）。这个函数的作用是将两个 URL 拼接在一起，确保得到正确的目标 URL。</p>
			<ul class="tip" style="list-style: inside">
				<p>具体来说，url.resolve(from, to) 的作用如下：</p>
				<li>如果 to 是一个绝对 URL（即包含协议和主机部分），则返回 to，忽略 from。</li>
				<li>如果 to 是一个相对 URL（即不包含协议和主机部分），则将它解析为相对于 from 的绝对 URL，并返回结果。</li>
			</ul>
			<Highlight :code="code3"></Highlight>
			<!--  -->
			<h2 class="mt-2">Class: URLSearchParams</h2>
			<p>URLSearchParamsAPI接口提供对URLquery部分的读写权限。URLSearchParams类也能够与以下四个构造函数中的任意一个单独使用。</p>
			<p>
				URLSearchParams接口和querystring模块有相似的目的，但是querystring模块的目的更加通用，因为它可以定制分隔符（＆和=）。
				但另一方面，这个API是专门为URL查询字符串而设计的。
			</p>
			<Highlight :code="code4"></Highlight>
			<!--  -->
			<h2>示例</h2>
			<Highlight :code="url"></Highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
import Highlight from '@/components/docs/Highlight.vue';
import url from './url.md?raw';

const code1 = `const url = require('url');
const urlString = 'https://www.example.com:8000/path?name=John&age=30';

const parsedUrl = url.parse(urlString, true);

console.log(parsedUrl);
`;

const url1 = `// 从URL字符串创建URL对象
const urlString = 'https://www.example.com/path/to/page?name=John&id=123#section';
const url = new URL(urlString);

// 或者从基本URL和相对URL创建URL对象
const baseUrl = 'https://www.example.com/';
const relativeUrl = 'path/to/page?name=John&id=123#section';
const url = new URL(relativeUrl, baseUrl);

console.log(url.protocol); // 输出 'https:'
console.log(url.host);     // 输出 'www.example.com'
console.log(url.pathname); // 输出 '/path/to/page'
console.log(url.search);   // 输出 '?name=John&id=123'
console.log(url.hash);     // 输出 '#section'
  `;
const code2 = `const url = require('url');
const urlObject = {
  protocol: 'https:',
  host: 'www.example.com',
  port: '8000',
  pathname: '/path',
  query: { name: 'John', age: '30' }
};

const urlString = url.format(urlObject);

console.log(urlString);
`;

const code3 = `  const from = 'https://www.example.com/';
  const to = 'path';

  console.log(url.resolve(from, to)); // 输出: 'https://www.example.com/path'`;

const code4 = `const { URL, URLSearchParams } = require('url');

const myURL = new URL('https://example.org/?abc=123');
console.log(myURL.searchParams.get('abc'));
// 输出 123

myURL.searchParams.append('abc', 'xyz');
console.log(myURL.href);
// 输出 https://example.org/?abc=123&abc=xyz

myURL.searchParams.delete('abc');
myURL.searchParams.set('a', 'b');
console.log(myURL.href);
// 输出 https://example.org/?a=b

const newSearchParams = new URLSearchParams(myURL.searchParams);
// 上面的代码等同于
// const newSearchParams = new URLSearchParams(myURL.search);

newSearchParams.append('a', 'c');
console.log(myURL.href);
// 输出 https://example.org/?a=b
console.log(newSearchParams.toString());
// 输出 a=b&a=c

// newSearchParams.toString() 被隐式调用
myURL.search = newSearchParams;
console.log(myURL.href);
// 输出 https://example.org/?a=b&a=c
newSearchParams.delete('a');
console.log(myURL.href);
// 输出 https://example.org/?a=b&a=c`;
</script>

<style scoped lang="scss"></style>
