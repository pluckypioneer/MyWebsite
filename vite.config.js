import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; // 导入Node.js的path模块，用于处理文件路径

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // 路径解析配置
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src') // 设置@为src目录的别名，方便组件导入
        }
    },
    // 开发服务器配置
    server: {
        port: 3000, // 固定开发环境端口号，避免每次启动随机生成
        open: true, // 启动开发服务器时自动打开浏览器
        host: '0.0.0.0' // 允许外部访问（如同一局域网内的设备）
    }
});