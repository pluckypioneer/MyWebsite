import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import md from 'vite-plugin-md'; // 新增：导入 Markdown 插件
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // 新增：允许 Vue 处理 .md 文件
        }),
        md({
            // 配置 Markdown 插件：将 .md 文件转换为 Vue 组件
            markdownItOptions: {
                html: true, // 支持 HTML 标签
                linkify: true, // 自动识别链接
                typographer: true // 自动替换特殊符号（如引号）
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        open: true,
        host: '0.0.0.0'
    }
});