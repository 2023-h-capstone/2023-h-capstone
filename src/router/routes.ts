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
    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
    ],
  },
  {
    path: '/mypage',
    component: () => import('layouts/MypageLayout.vue'),
    children: [
      { path: 'mypage', component: () => import('pages/mypage/MypagePage.vue') },
    ],
  },
  {
    path: '/article',
    component: () => import('layouts/ArticleLayout.vue'),
    children: [
      { path: 'themes', component: () => import('pages/article/ThemesPage.vue') },
      { path: 'write', component: () => import('pages/article/WritePage.vue') },
    ],
  },
  {
    path: '/favorites',
    component: () => import('layouts/favoritesLayout.vue'),
    children: [
      // { path: 'ex1', component: () => import('pages/favorites/ex_1.vue') },
      { path: 'test1', component: () => import('pages/favorites/test_1.vue') },
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
