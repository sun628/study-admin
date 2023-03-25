import { app, BrowserWindow } from 'electron';
import path from 'path';
const createWindow = () => {
	const win = new BrowserWindow({
		width: 1375,
		height: 905,
		webPreferences: {
			devTools: true,
			contextIsolation: false,
			nodeIntegration: true, //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
		},
	});
	// if (process.env.VITE_DEV_SERVER_URL) {
	//   win.loadURL(process.env.VITE_DEV_SERVER_URL);
	// } else {
	//   win.loadFile(path.join(__dirname, '../dist/index.html'));
	// }
	//打包后走加载文件路径
	if (app.isPackaged) {
		win.loadFile(path.join(__dirname, '../dist/index.html'));
	} else {
		win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
	}
	// win.webContents.openDevTools(); // 打开控制台
};
app.whenReady().then(createWindow);
