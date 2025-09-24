import { createRouter, createWebHistory } from 'vue-router';
import HeroSection from './components/HeroSection.vue';

// 动态导入 Blog 组件，实现代码分割，优化性能
const BlogPage = () => import('./components/BlogPage.vue');
// 导入404页面组件（需提前创建NotFound.vue）
const NotFound = () => import('./components/NotFound.vue');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HeroSection,
    },
    {
        path: '/blog',
        name: 'Blog',
        component: BlogPage,
    },
    {
        // 重定向到 GitHub 外部链接（修复URL格式）
        path: '/github',
        name: 'GitHub',
        beforeEnter() {
            window.location.href = 'https://github.com/pluckypioneer';
        },
    },
    {
        // 添加404页面路由
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;