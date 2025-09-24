<template>
  <div id="app">
    <TheHeader />
    <main class="app-main-content" :style="{ paddingTop: headerHeight + 'px' }">
      <!-- 页面过渡动画 -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <Component :key="$route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';

// 动态计算头部高度，避免内容被固定导航遮挡
const headerHeight = ref(0);

onMounted(() => {
  const header = document.querySelector('.header');
  if (header) {
    headerHeight.value = header.offsetHeight;
  }

  // 窗口大小变化时重新计算
  window.addEventListener('resize', () => {
    if (header) {
      headerHeight.value = header.offsetHeight;
    }
  });
});
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
  background-color: #0d0d0d;
  color: #fff;
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
</style>