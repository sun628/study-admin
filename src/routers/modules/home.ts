import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/routers/constant';

// 首页模块
const homeRouter: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: '首页',
          key: 'home',
        },
      },
    ],
    meta: {
      keepAlive: true,
      requiresAuth: false,
      title: '主页',
      key: 'home',
      index: 0,
    },
  },
];

export default homeRouter;
