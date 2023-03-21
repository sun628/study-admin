import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

// //引入依赖和语言

// import javascript from 'highlight.js/lib/languages/javascript'; //引入语言
// import hljs from 'highlight.js/lib/core';
// hljs.registerLanguage('javascript', javascript);
// import hljsVuePlugin from '@highlightjs/vue-plugin';
// import 'highlight.js/styles/stackoverflow-light.css';
// import 'highlight.js/lib/common';

// 获取所有组件，该方法返回一个对象

export default function install(app: App) {
  app.component('svg-icon', SvgIcon);
  // app.component('highlightjs', hljsVuePlugin);
  // 遍历docs文件并注册异步组件
  const components = import.meta.glob('./docs/*.vue');
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
  }
}
