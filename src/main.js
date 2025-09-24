import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 创建 Vue 应用实例
const app = createApp(App);

// 使用路由
app.use(router);

// 将应用挂载到 DOM 上
app.mount('#app');