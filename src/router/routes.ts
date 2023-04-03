import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/IndexLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MainPage.vue') }],
  },
  {
    path: '/mypage',
    component: () => import('layouts/MypageLayout.vue'),
    children: [
      { path: 'mypage', component: () => import('pages/MypagePage.vue') },
    ],
  },
  {
    path: '/article',
    component: () => import('layouts/ArticleLayout.vue'),
    children: [
      {
        path: 'themes',
        component: () => import('pages/article/ThemesPage.vue'),
      },
      { path: 'write', component: () => import('pages/article/WritePage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
