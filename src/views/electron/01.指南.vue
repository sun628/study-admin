<template>
	<el-card>
		<doc title="介绍">
			<el-link type="primary" @click="go_electron()">electron官网地址</el-link>
			<p>Electron主要是用来搭建桌面应用程序的，使用Electron可以让我们前端开发者快速搭建出桌面应用程序例如我们所熟知的VS code。</p>
		</doc>
		<doc title="1. 初始化vite项目">
			<highlight :code="code1"></highlight>
		</doc>
		<doc title="2. 安装electron">
			<highlight :code="code2"></highlight>
		</doc>
		<doc title="3. 修改配置文件">
			<p>vite.config.ts</p>
			<highlight :code="code3"></highlight>
			<h2>package.json</h2>
			<p>删除<font color="red">"type": "module"</font></p>
			<p>新增<font color="red">"main": "dist-electron/index.js"</font></p>
		</doc>
		<doc title="4. 编写electron文件">
			<p>在根目录新建electron文件</p>
			<el-image :src="image"></el-image>
			<highlight :code="code4"></highlight>
		</doc>
		<doc title="5. npm run dev 运行"></doc>
		<doc title="项目打包">
			<p>
				<font><h2>安装</h2></font>
			</p>
			<highlight :code="code5"></highlight>
			<p>
				<font><h2>修改package.json</h2></font>
			</p>
			<highlight :code="code6"></highlight>
			<p>
				<font><h2>执行命令</h2></font>
			</p>
			<p>package.json新增命令 "build:electron": "rimraf dist && vue-tsc && vite build&& electron-builder"</p>
			<highlight :code="code7"></highlight>
		</doc>
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
const code2 = `
//配置electron环境变量
yarn config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/

yarn add electron -D
yarn add vite-plugin-electron -D
------------------------------------------------
/**
 * npm配置方式
 * npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
 * /


/**
 *
 * 当前版本(下载可能会很慢)
 * "electron": "^23.2.0"
 * "vite-plugin-electron": "^0.11.1",
 */
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

const code4 =
	`import { app, BrowserWindow } from 'electron';
import path from 'path';
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1022,
    height: 670,
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true, //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
    },
  });

  //打包后走加载文件路径
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    ` +
	"win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);" +
	`
  }
  // win.webContents.openDevTools(); // 打开控制台
};
app.whenReady().then(createWindow);`;

const code5 = `yarn add electron-builder -D
`;
const productName = 'productName';
const version = 'version';
const ext = 'ext';
const code6 = `.....
"build": {
		"appId": "com.electron.desktop",
		"productName": "electron",
		"asar": true,
		"copyright": "Copyright © 2022 electron",
		"directories": {
			"output": "release/"
		},
		"files": [
			"dist/**/*",
			"dist-electron/**/*"
		],
		"mac": {
			"artifactName": "${productName}_${version}.${ext}",
			"target": [
				"dmg"
			]
		},
		"win": {
			"target": [
				{
					"target": "nsis",
					"arch": [
						"x64"
					]
				}
			],
			"artifactName": "${productName}_${version}.${ext}"
		},
		"nsis": {
			"oneClick": false,
			"perMachine": false,
			"allowToChangeInstallationDirectory": true,
			"deleteAppDataOnUninstall": false
		},
		"publish": [
			{
				"provider": "generic",
				"url": "http://127.0.0.1:8080"
			}
		],
		"releaseInfo": {
			"releaseNotes": "版本更新的具体内容"
		}
	}
`;

const code7 = ` //配置electron-builder环境变量 (我也不太记得了，yarn不行就npm,反正就是这样配置的)
 yarn方式: yarn config set ELECTRON_BUILDER_BINARIES_MIRROR https://npm.taobao.org/mirrors/electron-builder-binaries/
 npm方式: npm config set ELECTRON_BUILDER_BINARIES_MIRROR https://npm.taobao.org/mirrors/electron-builder-binaries/

 //然后执行命令 yarn build:electron
`;
</script>

<style scoped lang="scss"></style>
