import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/iconfont/iconfont.scss'; // iconfont css
import '@/styles/index.scss';
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register'; //注册svg图标
import GlobalCom from '@/components/index';
import 'virtual:uno.css';

// 插件配置自动按需导入
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

import directives from '@/directives/index'; // custom directives

const app = createApp(App);
app.use(GlobalCom); //批量注册全局组件
// app.use(ElementPlus);

app.use(router).use(pinia).use(directives).mount('#app');
