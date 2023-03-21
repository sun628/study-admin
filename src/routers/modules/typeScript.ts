import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';

let routerArray = [];
const routers = import.meta.glob('../../views/type-script/*.vue');
for (let i in routers) {
  const newName = i.replace(/..\/..\/views\/type-script\//, '').replace(/.vue/, '');
  const newPath = newName.substring(0, 2);
  routerArray.push({
    path: '/type-script/' + newPath,
    name: newName,
    meta: {
      keepAlive: true,
      requiresAuth: true,
      title: newName,
      key: newPath,
    },
    component: routers[i],
  });
}
// type-script模块
const tsRouter: Array<RouteRecordRaw> = [
  {
    path: '/type-script',
    component: Layout,
    redirect: '/type-script/01',
    children: routerArray,
    meta: {
      index: 1,
      keepAlive: true,
      requiresAuth: false,
      title: 'typeScript',
      key: 'type-script',
    },
  },
];
export default tsRouter;
