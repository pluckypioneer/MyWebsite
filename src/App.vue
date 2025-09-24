<template>
  <div id="app">
    <!-- 头部导航栏，添加ref用于获取元素 -->
    <TheHeader ref="headerRef" />

    <!-- 路由视图，动态调整padding-top -->
    <main class="app-main-content" :style="{ paddingTop: headerHeight + 'px' }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, watchEffect } from 'vue';
import TheHeader from './components/TheHeader.vue';

// 获取头部元素引用
const headerRef = ref(null);
// 存储头部高度
const headerHeight = ref(0);

// 计算头部高度的函数
const calculateHeaderHeight = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight;
  }
};

// 初始化时计算
onMounted(calculateHeaderHeight);
// 组件更新时重新计算（如头部内容变化）
onUpdated(calculateHeaderHeight);
// 窗口大小变化时重新计算
watchEffect(() => {
  window.addEventListener('resize', calculateHeaderHeight);
  // 组件卸载时移除事件监听
  return () => {
    window.removeEventListener('resize', calculateHeaderHeight);
  };
});
</script>

<style scoped>
/* 全局基础样式 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #0d0d0d;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden; /* 防止横向滚动条 */
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 移除固定padding-top，改为通过JS动态计算 */
</style>