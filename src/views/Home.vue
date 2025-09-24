<template>
  <div class="home-page">
    <HeroSection />
    <!-- 可添加其他首页内容，如项目展示、技能介绍等 -->
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue';
</script>

<style scoped>
.home-page {
  background-color: #0d0d0d;
  color: #fff;
}
</style>