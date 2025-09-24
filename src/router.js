import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'; // 假设首页视图
import BlogPage from './components/BlogPage.vue'; // 博客列表页
import BlogPost from './components/BlogPost.vue'; // 博客详情页
import NotFound from './components/NotFound.vue'; // 404页面

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/blog/:slug', // 动态路由，匹配博客详情页
    name: 'BlogPost',
    component: BlogPost,
    props: true // 将路由参数作为props传递给组件
  },
  {
    path: '/github',
    beforeEnter() {
      window.location.href = 'https://github.com/pluckypioneer';
    }
  },
  {
    path: '/:pathMatch(.*)*', // 匹配所有未定义的路由
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;