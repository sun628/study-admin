var http = require('http');

// 创建一个 HTTP 服务器

http.createServer(function (req, res) {
  // req 接收浏览器传的参数
  // res 返回给浏览器的参数

  /**
   * @description 设置响应头 200 代表成功
   * text/plain 代表返回的是文本
   * text/html 代表返回的是 html
   **/
  res.writeHead(renderStatus(req.url), { 'Content-Type': 'text/html;charset=utf-8' });

  res.write(renderHTML(req.url)); // 传入 url地址
  res.end(); // 代表结束 也可以里面传值
})
  .listen(1337, () => {
    console.log('Server start-----');
  });


/**
 * @description 根据 url 返回状态码
 * @param {string} url 
 * @returns {number}  返回状态码
 **/
function renderStatus (url) {
  let arr = ['/home', '/list', '/api/list', '/api/home'];
  return arr.includes(url) ? 200 : 404;
}
function renderHTML (url) {
  switch (url) {
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
    case '/home':
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
         <h1>home页面</h1>
         <h1>list页面</h1>
          <h1>api/list接口</h1>
          <h1>api/home接口</h1>
       </body>
      </html>
     `;
  }
}
