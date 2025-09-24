<template>
  <div class="blog-post-page">
    <!-- 文章加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <div class="loader"></div>
      <p>加载文章中...</p>
    </div>

    <!-- 文章内容 -->
    <div v-else-if="post" class="container">
      <!-- 文章头部信息 -->
      <div class="post-header">
        <h1 class="post-title">{{ post.data.title }}</h1>
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.data.date) }}</span>
          <span class="post-category">| {{ post.data.category }}</span>
        </div>
        <div class="post-divider"></div>
      </div>

      <!-- 文章内容（Markdown 渲染结果） -->
      <div class="post-content" v-html="renderedContent"></div>

      <!-- 返回博客列表按钮 -->
      <div class="back-link-container">
        <router-link to="/blog" class="back-link">
          ← 返回博客列表
        </router-link>
      </div>
    </div>

    <!-- 文章加载失败 -->
    <div v-else class="error-state">
      <h2>文章未找到</h2>
      <p>抱歉，无法找到该文章。可能是链接错误或文章已被移除。</p>
      <router-link to="/blog" class="back-link">返回博客列表</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import matter from 'gray-matter'; // 解析 Markdown 元数据
import marked from 'marked'; // 转换 Markdown 为 HTML
import Prism from 'prismjs'; // 代码高亮
import 'prismjs/themes/prism-tomorrow.css'; // 代码高亮主题

// 接收路由参数 slug
const route = useRoute();
const { slug } = route.params;

// 状态管理
const isLoading = ref(true);
const post = ref(null);
const renderedContent = ref('');

// 格式化日期
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('zh-CN', options);
};

// 动态导入对应 Markdown 文章
const loadPost = async () => {
  try {
    // 假设博客文章存放在 src/blogs 目录下，文件名与 slug 一致
    const postModule = await import(`../blogs/${slug}.md`);
    const content = await fetch(postModule.default).then(res => res.text());
    
    // 解析 Markdown 内容（分离元数据和正文）
    const { data, content: markdownContent } = matter(content);
    post.value = { data, content: markdownContent };
    
    // 转换 Markdown 为 HTML
    renderedContent.value = marked.parse(markdownContent);
  } catch (error) {
    console.error('加载文章失败:', error);
    post.value = null;
  } finally {
    isLoading.value = false;
  }
};

// 页面加载时执行
onMounted(async () => {
  await loadPost();
  
  // 页面进入动画
  if (post.value) {
    gsap.from('.post-header', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    gsap.from('.post-content', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    // 初始化代码高亮
    Prism.highlightAll();
  }
});
</script>

<style scoped>
.blog-post-page {
  padding: 120px 20px 80px;
  min-height: 100vh;
  background-color: #0d0d0d;
  color: #fff;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* 加载状态样式 */
.loading-state {
  text-align: center;
  padding: 100px 0;
}

.loader {
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 3px solid rgba(0, 240, 255, 0.3);
  border-radius: 50%;
  border-top-color: #00f0ff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 文章头部样式 */
.post-header {
  margin-bottom: 40px;
}

.post-title {
  font-size: 2.5rem;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  margin-bottom: 15px;
  line-height: 1.3;
}

.post-meta {
  color: #aaa;
  font-size: 1rem;
  margin-bottom: 20px;
}

.post-date {
  font-family: 'Courier New', monospace;
}

.post-category {
  margin-left: 8px;
}

.post-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
  border: none;
}

/* 文章内容样式 */
.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
  color: #ddd;
}

.post-content h2,
.post-content h3 {
  color: #00f0ff;
  margin-top: 30px;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.post-content p {
  margin-bottom: 20px;
}

.post-content a {
  color: #00f0ff;
  text-decoration: none;
  border-bottom: 1px dotted #00f0ff;
  transition: all 0.3s ease;
}

.post-content a:hover {
  color: #fff;
  border-bottom-color: #fff;
}

.post-content img {
  max-width: 100%;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.post-content ul,
.post-content ol {
  margin-left: 20px;
  margin-bottom: 20px;
}

.post-content li {
  margin-bottom: 10px;
}

/* 代码块样式（配合 Prism.js） */
.post-content pre {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  overflow-x: auto;
  border: 1px solid rgba(0, 240, 255, 0.1);
}

.post-content code {
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
}

/* 返回链接样式 */
.back-link-container {
  margin-top: 60px;
  text-align: center;
}

.back-link {
  display: inline-block;
  color: #00f0ff;
  text-decoration: none;
  border: 2px solid #00f0ff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-link:hover {
  background-color: #00f0ff;
  color: #0d0d0d;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
}

/* 错误状态样式 */
.error-state {
  text-align: center;
  padding: 100px 20px;
}

.error-state h2 {
  color: #ff4444;
  font-size: 2rem;
  margin-bottom: 20px;
}

.error-state p {
  color: #aaa;
  font-size: 1.1rem;
  margin-bottom: 40px;
}
</style>