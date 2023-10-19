import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import * as ElementPlusIcons from '@element-plus/icons-vue';

// //引入依赖和语言
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/common';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import hljsVuePlugin from '@highlightjs/vue-plugin';
// 获取所有组件，该方法返回一个对象

export default function install(app: App) {
	app.component('SvgIcon', SvgIcon);
	app.use(hljsVuePlugin, {
		languages: ['xml', 'typescript'],
	});
	// 遍历docs文件并注册异步组件
	const components = import.meta.glob('./docs/*.vue');
	for (const [key, value] of Object.entries(components)) {
		const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
		app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
	}
	// 注册element Icons组件
	Object.keys(ElementPlusIcons).forEach((key) => {
		app.component(key, ElementPlusIcons[key as keyof typeof ElementPlusIcons]);
	});
}
