<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/" class="name-link">JOHN ZHENG</router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <nav class="nav-menu" :class="{ 'is-open': isMenuOpen }">
        <ul>
          <li><router-link to="/" @click="closeMenu">主页Home</router-link></li>
          <li><router-link to="/blog" @click="closeMenu">博客Blog</router-link></li>
          <li><a href="https://github.com/pluckypioneer" target="_blank" @click="closeMenu">GitHub</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';

const isMenuOpen = ref(false);
const router = useRouter();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // 使用 GSAP 控制导航菜单的动画
  if (isMenuOpen.value) {
    gsap.from('.nav-menu li', {
      x: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// 监听路由变化，关闭菜单
router.beforeEach(() => {
  closeMenu();
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100; /* 确保在最上层 */
  padding: 20px 40px;
  box-sizing: border-box;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo .name-link {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1.5rem;
  color: #00f0ff; /* 霓虹色 */
  text-decoration: none;
  text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff; /* 霓虹发光效果 */
  transition: all 0.3s ease;
}

.logo .name-link:hover {
  text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff;
  transform: scale(1.05);
}

/* 汉堡菜单按钮样式 */
.menu-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 101;
}

.menu-toggle .bar {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #00f0ff;
  margin: 5px 0;
  transition: all 0.3s ease-in-out;
}

/* 汉堡菜单激活状态的动画 */
.menu-toggle.is-active .bar:nth-child(2) {
  opacity: 0;
}
.menu-toggle.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.menu-toggle.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* 导航菜单样式 */
.nav-menu {
  position: fixed;
  top: 0;
  right: -100%; /* 默认隐藏在右侧 */
  width: 300px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  padding-top: 100px;
  transition: right 0.4s ease-in-out;
  z-index: 100;
}

.nav-menu.is-open {
  right: 0;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  margin-bottom: 20px;
}

.nav-menu a {
  display: block;
  padding: 10px 40px;
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-menu a:hover {
  color: #00f0ff;
  transform: translateX(10px);
  text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff;
}
</style>