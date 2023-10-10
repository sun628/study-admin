var http = require('http');

var url = require('url');

// 创建一个 HTTP 服务器
var server = http.createServer();
server.on('request', function (req, res) {

  // 获取请求路径 解析 url地址不带参数 只匹配路径不带参数,不然会匹配不上
  var pathname = url.parse(req.url).pathname;

  // 响应头
  res.writeHead(renderStatus(pathname), { 'Content-Type': 'text/html;charset=utf-8' });
  // 响应内容
  res.write(renderHTML(pathname)); // 传入 url地址
  // 结束响应
  res.end();
}
);

server.listen(1337, () => {
  console.log('Server start-----');
});


/**
 * @description 根据 url 返回状态码
 * @param {string} url 
 * @returns {number}  返回状态码
 **/
function renderStatus (url) {
  let arr = ['/', '/home', '/list', '/api/list', '/api/home'];
  return arr.includes(url) ? 200 : 404;
}

// 根据 url 返回 html
function renderHTML (url) {
  switch (url) {
    case '/':
      return `
      <html>
       <body>
        <h1>home页面</h1>
        <h1>list页面</h1>
        <h1>api/list接口</h1>
        <h1>api/home接口</h1>
       </body>
      </html>
     `;
    // home页面
    case '/home':
      return `
      <html>
       <body>
         <h1>home页面</h1>
         <h2>hello world</h2>
       </body>
      </html>
     `;
    // list页面
    case '/list':
      return `
      <html>
       <body>
         <h1>list页面</h1>
         <h2>hello world</h2>
       </body>
      </html>
     `;
    // api/list接口
    case '/api/list':
      return `
       '[{"name":"张三","age":18},{"name":"李四","age":20}]'
      `;
    // api/home接口
    case '/api/home':
      return `
       '{"name":"张三","age":18}'
      `;
    default:
      return `
      <html>
       <body>
        <h2>404 not found</h2>
       </body>
      </html>
     `;
  }
}
