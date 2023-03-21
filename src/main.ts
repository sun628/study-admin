import { createApp } from 'vue';
import App from './App.vue';

import * as Icons from '@element-plus/icons-vue';
import '@/styles/index.scss';
import '@/assets/iconfont/iconfont.scss'; // iconfont css
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register'; //注册svg图标
import GlobalCom from '@/components/index';

import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(hljsVuePlugin);
app.use(GlobalCom); //批量注册全局组件
app.use(pinia).use(router).mount('#app');
