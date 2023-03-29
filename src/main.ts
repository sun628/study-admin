import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import '@/assets/iconfont/iconfont.scss'; // iconfont css
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register'; //注册svg图标
import GlobalCom from '@/components/index';

import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import hljsVuePlugin from '@highlightjs/vue-plugin';
const app = createApp(App);

app.use(hljsVuePlugin);
app.use(GlobalCom); //批量注册全局组件
app.use(router).use(pinia).mount('#app');
