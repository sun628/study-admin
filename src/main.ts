import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import '@/assets/iconfont/iconfont.scss'; // iconfont css
import router from '@/routers/router';
import pinia from '@/store/index';
import 'virtual:svg-icons-register'; //注册svg图标
import GlobalCom from '@/components/index';

const app = createApp(App);

app.use(GlobalCom); //批量注册全局组件
app.use(router).use(pinia).mount('#app');
