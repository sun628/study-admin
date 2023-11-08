import type { App, AsyncComponentLoader, Plugin, DefineComponent } from 'vue';
import { defineAsyncComponent } from 'vue';
import SvgIcon from '@/components/svg-icon/SvgIcon.vue';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import Doc from '@/components/docs/Doc.vue';
import Tag from '@/components/docs/Tag.vue';
import Highlight from '@/components/docs/Highlight.vue';
// //引入依赖和语言
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/common';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
import hljsVuePlugin from '@highlightjs/vue-plugin';
// 获取所有组件，该方法返回一个对象

const GlobalCom: Plugin = {
	install(app: App) {
		app.component('SvgIcon', SvgIcon);
		app.component('Doc', Doc);
		app.component('Tag', Tag);
		app.component('Highlight', Highlight);

		app.use(hljsVuePlugin, {
			languages: ['xml', 'typescript'],
		});

		// 注册element Icons组件
		Object.keys(ElementPlusIcons).forEach((key) => {
			app.component(key, ElementPlusIcons[key as keyof typeof ElementPlusIcons]);
		});
	},
};

export default GlobalCom;
