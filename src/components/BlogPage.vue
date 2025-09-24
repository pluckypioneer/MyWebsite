<template>
  <div class="blog-page">
    <div class="container">
      <h1 class="page-title">我的博客</h1>
      <p class="page-subtitle">技术与思考，在这里留下我的足迹。</p>

      <!-- 搜索和筛选区 -->
      <div class="blog-filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索文章..." 
          class="search-input"
        >
        <div class="tags-filter">
          <span 
            v-for="tag in allTags" 
            :key="tag"
            :class="['tag-item', { 'active': activeTag === tag }]"
            @click="activeTag = activeTag === tag ? '' : tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 博客列表 -->
      <div class="blog-posts">
        <div 
          class="blog-post-card" 
          v-for="post in filteredPosts" 
          :key="post.slug"
        >
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-meta">
            <span>{{ post.date }}</span> | 
            <span>{{ post.category }}</span> |
            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
          </p>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.slug}`" class="read-more-link">继续阅读 →</router-link>
        </div>

        <p v-if="filteredPosts.length === 0 && !isLoading" class="no-posts-message">
          没有找到匹配的文章...
        </p>

        <!-- 加载中状态 -->
        <div v-if="isLoading" class="loading">
          <div class="loader"></div>
          <p>加载文章中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import matter from 'gray-matter';
import { marked } from 'marked';

// 状态管理
const posts = ref([]);
const allTags = ref([]);
const searchQuery = ref('');
const activeTag = ref('');
const isLoading = ref(true); // 新增：加载状态

// 格式化日期为 YYYY-MM-DD
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) { // 处理无效日期
    return new Date().toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0];
};

// 初始化博客列表
const initBlogs = async () => {
  try {
    isLoading.value = true;
    const postList = [];
    const tagSet = new Set();
    const blogFiles = import.meta.glob('../blogs/*.md', { as: 'raw' });

    for (const [path, content] of Object.entries(blogFiles)) {
      // 获取文件内容
      const rawContent = await content();
      const { data, content: markdownContent } = matter(rawContent);
      
      // 提取slug
      const slug = path.split('/').pop().replace('.md', '');
      
      // 生成摘要（去除HTML标签后截取）
      const htmlContent = marked.parse(markdownContent);
      const plainText = htmlContent.replace(/<[^>]*>?/gm, ''); // 移除HTML标签
      const excerpt = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');
      
      // 处理标签（确保是数组）
      const postTags = Array.isArray(data.tags) ? data.tags : [];
      postTags.forEach(tag => tagSet.add(tag));
      
      // 存储文章数据
      postList.push({
        slug,
        title: data.title || '未命名文章',
        date: formatDate(data.date),
        category: data.category || '未分类',
        tags: postTags,
        excerpt
      });
    }

    // 按日期排序（最新在前）
    postList.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    posts.value = postList;
    allTags.value = Array.from(tagSet);
  } catch (error) {
    console.error('博客加载失败：', error);
    alert('加载博客时出错，请检查控制台日志');
  } finally {
    isLoading.value = false;
  }
};

// 筛选文章
const filteredPosts = computed(() => {
  return posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTag = activeTag.value ? post.tags.includes(activeTag.value) : true;
    return matchesSearch && matchesTag;
  });
});

// 初始化
initBlogs();
</script>

<style scoped>
/* 原有样式保持不变，新增加载状态样式 */
.loading {
  text-align: center;
  padding: 50px 0;
}

.loader {
  width: 40px;
  height: 40px;
  margin: 0 auto 15px;
  border: 3px solid rgba(0, 240, 255, 0.3);
  border-radius: 50%;
  border-top-color: #00f0ff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 其他原有样式... */
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

/* 筛选区样式 */
.blog-filters {
  margin-bottom: 40px;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid #00f0ff;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 20px;
}

.search-input::placeholder {
  color: #888;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  padding: 5px 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-item.active {
  background-color: #00f0ff;
  color: #000;
  font-weight: bold;
}

/* 博客卡片样式 */
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

.post-tag {
  background-color: rgba(0, 240, 255, 0.1);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
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
