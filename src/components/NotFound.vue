<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-code">404</h1>
      <p class="not-found-message">页面不存在</p>
      <p class="not-found-description">您访问的页面可能已经被删除、移动或输入了错误的地址。</p>
      <router-link to="/" class="go-home-button">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  // 添加进入动画效果
  gsap.fromTo('.not-found-content',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
  );
  
  // 数字404的动画效果
  gsap.fromTo('.not-found-code',
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: 'back.out(1.7)' }
  );
});
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0d0d0d;
  color: #fff;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
}

.not-found-code {
  font-size: 8rem;
  font-weight: bold;
  margin: 0;
  color: #00f0ff;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
}

.not-found-message {
  font-size: 2rem;
  margin: 20px 0 10px;
  color: #fff;
}

.not-found-description {
  font-size: 1rem;
  color: #888;
  margin-bottom: 40px;
  line-height: 1.6;
}

.go-home-button {
  display: inline-block;
  padding: 12px 30px;
  background-color: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.go-home-button:hover {
  background-color: #00f0ff;
  color: #0d0d0d;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  transform: translateY(-2px);
}
</style>