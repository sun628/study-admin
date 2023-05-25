import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/iconfont/iconfont.scss'; // iconfont css
import 'tailwindcss/tailwind.css'; //  tailwind.css
import '@/styles/index.scss';
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register'; //注册svg图标
import GlobalCom from '@/components/index';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// custom directives
import directives from '@/directives/index';
const app = createApp(App);
app.use(GlobalCom); //批量注册全局组件
app.use(ElementPlus);
app.use(router).use(pinia).use(directives).mount('#app');
