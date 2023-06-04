import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import * as Icons from '@element-plus/icons-vue';

// //引入依赖和语言
import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/common';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
import hljsVuePlugin from '@highlightjs/vue-plugin';
// 获取所有组件，该方法返回一个对象

export default function install(app: App) {
	app.component('SvgIcon', SvgIcon);
	app.use(hljsVuePlugin, {
		languages: ['html', 'css', 'typescript'],
	});
	// 遍历docs文件并注册异步组件
	const components = import.meta.glob('./docs/*.vue');
	for (const [key, value] of Object.entries(components)) {
		const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
		app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
	}
	// 注册element Icons组件
	Object.keys(Icons).forEach((key) => {
		app.component(key, Icons[key as keyof typeof Icons]);
	});
}
