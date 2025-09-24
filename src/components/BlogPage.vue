<template>
  <div class="blog-page">
    <div class="container">
      <h1 class="page-title">我的博客</h1>
      <p class="page-subtitle">技术与思考，在这里留下我的足迹。</p>

      <div class="blog-posts">
        <div class="blog-post-card">
          <h2 class="post-title">Vite vs. Webpack：现代前端构建工具之争</h2>
          <p class="post-meta">
            <span>2025年9月24日</span> | <span>前端开发</span>
          </p>
          <p class="post-excerpt">
            深入探讨 Vite 和 Webpack 这两种主流前端构建工具的异同，分析它们在开发体验、构建速度和生态系统上的优劣，帮助你选择最适合的项目工具。
          </p>
          <a href="#" class="read-more-link">继续阅读 →</a>
        </div>

        <div class="blog-post-card">
          <h2 class="post-title">用 Vue 3 和 GSAP 打造炫酷的网页动效</h2>
          <p class="post-meta">
            <span>2025年9月15日</span> | <span>Vue.js</span>
          </p>
          <p class="post-excerpt">
            本文将手把手教你如何结合 Vue 3 的 Composition API 和 GSAP 强大的动画能力，轻松实现高性能、流畅的网页动态效果。
          </p>
          <a href="#" class="read-more-link">继续阅读 →</a>
        </div>

        <p v-if="posts.length === 0" class="no-posts-message">
          暂时还没有文章，敬请期待！
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 这是一个示例数据，您未来可以从 API 或 Markdown 文件中加载真实的文章列表
const posts = ref([
  // { title: '...', date: '...', category: '...', excerpt: '...' }
]);
</script>

<style scoped>
.blog-page {
  padding: 80px 20px;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  font-family: 'Courier New', monospace;
  color: #00f0ff;
  text-align: center;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #888;
  text-align: center;
  margin-bottom: 60px;
}

.blog-post-card {
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 3px solid #00f0ff;
  padding: 30px;
  margin-bottom: 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2);
}

.post-title {
  font-size: 1.8rem;
  color: #fff;
  margin-top: 0;
}

.post-meta {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: -10px;
  margin-bottom: 20px;
}

.post-meta span {
  margin-right: 15px;
}

.post-excerpt {
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
}

.read-more-link {
  display: inline-block;
  margin-top: 20px;
  color: #00f0ff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.read-more-link:hover {
  color: #fff;
}

.no-posts-message {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin-top: 100px;
}
</style>