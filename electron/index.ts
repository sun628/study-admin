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
		//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false.
		useContentSize: true,
		frame: false, //设置为 false 时可以创建一个无边框窗口 默认值为 true。
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
	} else {
		win.loadFile(path.join(__dirname, '../dist/index.html'));
	}
	//打包后走加载文件路径

	// if (app.isPackaged) {
	// 	win.loadFile(path.join(__dirname, '../dist/index.html'));
	// } else {
	// 	win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`);
	// }
	// win.webContents.openDevTools(); // 打开控制台
};
app.whenReady().then(createWindow);
