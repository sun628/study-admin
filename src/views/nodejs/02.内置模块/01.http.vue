<template>
	<el-row>
		<doc title="http模块">
			<h2>Node.js提供了许多内置模块来支持不同的功能，其中http模块是用于创建HTTP服务器和客户端的核心模块。</h2>
			<h3>创建HTTP服务器</h3>
			<p>使用http.createServer()方法可以创建一个HTTP服务器。这个方法接受一个回调函数，该回调函数在每次有HTTP请求时被调用。</p>
			<Highlight :code="code1"></Highlight>
			<h2>发起HTTP请求</h2>
			<p>http模块也可以用于发起HTTP请求。使用http.request()方法可以创建一个HTTP客户端，向指定的URL发送请求。</p>
			<Highlight :code="code2"></Highlight>
			<h2>返回html案例</h2>
			<Highlight :code="code3"></Highlight>
		</doc>
	</el-row>
</template>
<script setup lang="ts">
import Highlight from '@/components/docs/Highlight.vue';
import code3 from './http.md?raw';

const code1 = `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

const PORT = 3000;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log('Server start ');
});
`;

const code2 = `const http = require('http');

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error('Problem with request: '+ e.message);
});

req.end();
`;
</script>

<style scoped lang="scss"></style>
