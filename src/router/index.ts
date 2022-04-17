import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeLayout from '@/layout/HomeLayout/Index.vue';
const Login = () => import('@/views/login/Index.vue');
const DiscoverMusic = () => import('@/views/discoverMusic/Index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'DiscoverMusic',
        component: DiscoverMusic,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
