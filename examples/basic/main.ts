import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';

import App from './App.vue';
import HomeView from './components/HomeView.vue';
import ArticleView from './components/ArticleView.vue';
import LateLoadingView from './components/LateLoadingView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/article/:id', component: ArticleView },
  { path: '/late', component: LateLoadingView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


createApp(App).use(router).mount('#app')
