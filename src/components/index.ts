import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

// 获取所有组件，该方法返回一个对象

export default function install(app: App) {
  app.component('svg-icon', SvgIcon);
  // 遍历docs文件并注册异步组件
  const components = import.meta.glob('./docs/*.vue');
  for (const [key, value] of Object.entries(components)) {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    app.component(name, defineAsyncComponent(value as AsyncComponentLoader));
  }
}
