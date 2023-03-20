import { createApp } from 'vue';
import App from './App.vue';

import * as Icons from '@element-plus/icons-vue';
import '@/styles/index.scss';
// iconfont css
import '@/assets/iconfont/iconfont.scss';
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register';
import GlobalCom from '@/components/index';
const app = createApp(App);
// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(GlobalCom);
app.use(pinia).use(router).mount('#app');
