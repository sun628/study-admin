<template>
	<el-card>
		<doc title="介绍">
			<el-link type="primary" @click="go_electron()">electron官网地址</el-link>
			<p>Electron主要是用来搭建桌面应用程序的，使用Electron可以让我们前端开发者快速搭建出桌面应用程序例如我们所熟知的VS code。</p>
		</doc>
		<doc title="1. 初始化vite项目">
			<highlight language="js" :code="code1"></highlight>
		</doc>
		<doc title="2. 安装electron">
			<highlight language="js" :code="code2"></highlight>
		</doc>
		<doc title="3. 修改配置文件">
			<p>vite.config.ts</p>
			<highlight language="js" :code="code3"></highlight>
			<h2>package.json</h2>
			<p>将<font color="red">"type": "module"</font> 替换为 <font color="red">"main": "dist-electron/index.js"</font></p>
		</doc>
		<doc title="4. 编写electron文件">
			<p>在根目录新建electron文件</p>
			<el-image :src="image"></el-image>
			<highlight language="js" :code="code4"></highlight>
		</doc>
		<doc title="5. npm run dev 运行"> </doc>
	</el-card>
</template>
<script setup lang="ts">
import image from '@/assets/images/electron/index.jpg';
const go_electron = () => {
	window.open('https://www.electronjs.org/docs', '_blank');
};
const code1 = `yarn create vite  my-electron-app --template vue-ts
cd my-electron-app
yarn`;
const code2 = `yarn add electron -D
yarn add vite-plugin-electron -D
/**
 * 当前版本(下载可能会很慢)
 * "electron": "^23.2.0"
 * "vite-plugin-electron": "^0.11.1",
 */
-----------------------------------
//如果electron 安装失败：
# 切换成cnpm安装
## 安装cnpm
npm install -g cnpm --registry=http://registry.npmmirror.com
## cnpm安装
cnpm install electron -D
`;

const code3 = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Electron from 'vite-plugin-electron'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Electron({
    entry: 'electron/index.ts'
  })],
})`;

const code4 = `import path from "path";
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      // preload: path.join(__dirname, "../electron-preload/index.js"), // 需要引用js文件
    }
  });
  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    win.loadURL(process.env['VITE_DEV_SERVER_URL'])
  }
};

app.whenReady().then(() => {
  createWindow(); // 创建窗口

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 关闭窗口
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`;
</script>

<style scoped lang="scss"></style>
