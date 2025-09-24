<template>
  <section class="hero-section">
    <div class="particles-bg"></div>
    <div class="content-wrapper">
      <!-- 左侧：头像和名字 -->
      <div class="left-section">
        <img src="../assets/image/avatar.png" alt="Yuhang Zheng's Avatar" class="avatar" />
        <h1 class="title">
          <span class="text-animate-char" v-for="(char, index) in name" :key="index">{{ char }}</span>
        </h1>
        <p class="subtitle">
          <span class="text-animate-char" v-for="(char, index) in tagline" :key="index">{{ char }}</span>
        </p>

        <!-- 个人简介 -->
        <div class="personal-bio">
          <h3>Connect me 联系方式</h3>
          <p>🏠︎Address: Foshan City, Guangdong Provience, China</p>
          <p>📧 Email: zhengyuhang2005@gmail.com</p>
          <p>👔linkedln: <a href="https://www.linkedin.com/in/john-zheng-b7a83028a/" target="_blank">John Zheng</a></p>
          <p>🅾 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 ★ <a href="https://www.instagram.com/john_zheng2005/"
              target="_blank">@john.zheng.2005</a></p>

          <h3>About me 关于我</h3>
          <p>Hello! I'm Yuhang(John) Zheng , a Biomedical Engineering student with a passion for technology and
            innovation.</p>
          <p>I enjoy exploring the intersection of biology, medicine, and engineering to develop solutions that improve
            healthcare.</p>
          <p>At the same time, I am also striving to become an amateur full-stack software engineer.</p>
        </div>
      </div>

      <!-- 右侧：项目经历和教育经历 -->
      <div class="right-section">
        <div class="experience-card">
          <h2>教育经历</h2>
          <a href="https://portal.smu.edu.cn/swyxgcxy/" target="_blank" class="education-link">
            <div class="education-item">
              <span class="education-period">2023.9-2027.6</span>
              <span class="education-institution">南方医科大学</span>
              <span class="education-major">生物医学工程专业（智能医学仪器方向）</span>
            </div>
          </a>
        </div>

        <div class="experience-card">
          <h2>项目经历</h2>
          <div v-if="projects.length === 0" class="no-content">
            <p>项目经历信息正在整理中...</p>
          </div>
        </div>

        <div class="experience-card">
          <h2>工作经历</h2>
          <div v-if="projects.length === 0" class="no-content">
            <p>工作经历信息正在整理中...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- GitHub贡献板块 - 替换为真实GitHub贡献图 -->
    <div class="github-section">
      <h2>GitHub 贡献</h2>
      <div class="github-calendar">
        <div class="github-chart-container">
          <img src="https://ghchart.rshah.org/pluckypioneer" alt="pluckypioneer's Github chart" />
        </div>
        <div class="calendar-footer">
          <a href="https://github.com/pluckypioneer" target="_blank" class="github-link">
            github.com/pluckypioneer
          </a>
        </div>
      </div>
    </div>

    <!-- ICP备案 -->
    <div class="hero-icp">
      <a href="https://icp.gov.moe/?keyword=20250968" target="_blank" rel="noopener noreferrer">
        萌ICP备20250968号
      </a>
    </div>

  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import gsap from 'gsap';

// 更新名字和职业
const name = ref("Yuhang(John) Zheng");
const tagline = ref("BIOMEDICAL ENGINEER");
const projects = ref([]); // 项目经历数据
const workExperiences = ref([]); // 工作经历数据

onMounted(() => {
  // 粒子效果（使用 CSS 或外部库）
  // 这里的 .particles-bg 只是占位符，您可以使用 Particles.js 或自行实现
  
  // GSAP 动画：文字打字机效果
  // 使用nextTick确保DOM已渲染
  nextTick(() => {
    gsap.fromTo('.text-animate-char', 
      { opacity: 0, y: 5 }, 
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, // 每个字符延迟 0.05 秒出现
        ease: "power2.out",
        delay: 0.5
      }
    );

    // GSAP 动画：头像淡入效果
    gsap.fromTo('.avatar', 
      { opacity: 0, scale: 0.8 }, 
      { 
        opacity: 1, 
        scale: 1,
        ease: "back.out(1.7)",
        delay: 1 
      }
    );
    
    // 左侧内容动画
    gsap.fromTo('.left-section',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 }
    );
    
    // 右侧内容动画
    gsap.fromTo('.right-section',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 1.5 }
    );
    
    // GitHub板块动画
    gsap.fromTo('.github-section',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.8 }
    );
    
    // GitHub贡献图动画
    gsap.fromTo('.github-chart-container img',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 2
      }
    );
  });
});
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  background-image: url('@/assets/image/island-night-moon-scenery-digital-art-8k-wallpaper-uhdpaper.com-289@0@j.jpg'); 
  background-size: cover;
  background-color: #0d0d0d; /* 深色背景 */
  color: #fff;
  padding: 100px 0;
  overflow: hidden; 
  position: relative;
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 60px;
  flex-wrap: wrap;
}

/* 左侧区域样式 */
.left-section {
  flex: 1;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 220px; 
  height: 220px;
  border-radius: 50%;
  border: 3px solid #00f0ff; /* 霓虹光环 */
  box-shadow: 0 0 15px #00f0ff, 0 0 25px #00f0ff;
  object-fit: cover; /* 确保图片不变形 */
  background-color: rgba(0, 240, 255, 0.1); /* 背景色，防止图片透明时显示底色 */
  margin-bottom: 30px;
}

.title {
  font-family: 'Courier New', monospace; /* 科技感字体 */
  font-size: 2.5em;
  font-weight: bold;
  margin: 20px 0 10px;
  line-height: 1.2;
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: 1.3em;
  color: #00f0ff; /* 霓虹色 */
  margin-bottom: 30px;
}

.personal-bio {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 25px;
  border-radius: 8px;
  border-left: 3px solid #00f0ff;
  max-width: 400px;
  margin-top: 20px;
}

.personal-bio h3 {
  color: #00f0ff;
  margin-top: 0;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.personal-bio p {
  line-height: 1.6;
  margin-bottom: 10px;
  color: #ddd;
}

/* 右侧区域样式 */
.right-section {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.experience-card {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 8px;
  border-left: 3px solid #00f0ff;
}

.experience-card h2 {
  color: #00f0ff;
  margin-top: 0;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
  font-size: 1.8em;
}

.no-content {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 20px;
}

.education-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.education-link:hover {
  transform: translateY(-3px);
}

.education-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background-color: rgba(0, 240, 255, 0.05);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.education-link:hover .education-item {
  background-color: rgba(0, 240, 255, 0.1);
  box-shadow: 0 3px 10px rgba(0, 240, 255, 0.15);
}

.education-period {
  color: #00f0ff;
  font-weight: bold;
  font-size: 0.9em;
}

.education-institution {
  font-size: 1.2em;
  font-weight: bold;
}

.education-major {
  color: #ccc;
  font-size: 1em;
}

/* GitHub贡献图样式 */
.github-section {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 40px;
  text-align: center;
}

.github-section h2 {
  color: #00f0ff;
  margin-top: 0;
  margin-bottom: 30px;
  font-family: 'Courier New', monospace;
  font-size: 2em;
}

.github-calendar {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.github-chart-container {
  margin-bottom: 20px;
  overflow-x: auto;
}

.github-chart-container img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.github-chart-container img:hover {
  transform: scale(1.02);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.2);
}

.calendar-footer {
  margin-top: 20px;
  text-align: center;
}

.github-link {
  color: #00f0ff;
  text-decoration: none;
  font-family: 'Courier New', monospace;
  font-size: 1.2em;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #00f0ff;
  border-radius: 4px;
}

.github-link:hover {
  background-color: #00f0ff;
  color: #0d0d0d;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
}


  .hero-icp {
  position: absolute; /* 基于 .hero-section 定位 */
  bottom: 20px; /* 距离组件底部的间距（大屏幕） */
  left: 50%; 
  transform: translateX(-50%); /* 水平居中（核心） */
  color: #14f1b6; /* 自定义字体颜色（你设置的浅绿色，可修改） */
  font-size: 0.9rem; 
  z-index: 2; /* 确保在粒子效果、背景之上，不被遮挡 */
}

/* 备案链接样式：继承父元素颜色，去掉默认下划线 */
.hero-icp a {
  color: inherit; /* 和文字颜色一致（#14f1b6） */
  text-decoration: none; /* 去掉默认链接下划线 */
  transition: color 0.3s ease; /* 颜色过渡动画 */
}

/* 鼠标 hover 链接时的样式（增强交互） */
.hero-icp a:hover {
  color: #fff; /* hover 时变白色，更醒目 */
  text-decoration: underline; /*  hover 显示下划线，提示可点击 */
}


/* 响应式设计 */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 20px;
    gap: 40px;
  }
  
  .title {
    font-size: 2em;
  }
  
  .subtitle {
    font-size: 1.1em;
  }
  
  .avatar {
    width: 180px;
    height: 180px;
  }


}

@media (max-width: 480px) {
  .github-calendar {
    padding: 15px;
  }
}
</style>