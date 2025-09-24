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
          <div>
            <h3>Connect me 联系方式</h3>
            <p>🏠︎Address: Foshan City, Guangdong Provience, China</p>
            <p>📧 Email: zhengyuhang2005@gmail.com</p>
            <p>👔linkedln: <a href="https://www.linkedin.com/in/john-zheng-b7a83028a/" target="_blank">John Zheng</a></p>
            <p>🅾 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 ★ <a href="https://www.instagram.com/john_zheng2005/" target="_blank" >@john.zheng.2005</a></p>
          </div>
          <h3>About me 关于我</h3>
          <p>Hello! I'm Yuhang(John) Zheng , a Biomedical Engineering student with a passion for technology and innovation.</p>
          <p>I enjoy exploring the intersection of biology, medicine, and engineering to develop solutions that improve healthcare.</p>
          <p>At the same time, I am also striving to become an amateur full-stack software engineer.</p>
        </div>
      </div>
      
      <!-- 右侧：项目经历和教育经历。。。 -->
      <div class="right-section">

                <div class="experience-card">
          <h2>教育经历</h2>
          <a href="https://portal.smu.edu.cn/swyxgcxy/" target="_blank" class="education-link">
            <div class="education-item">
              <span class="education-period">2023.9-2027.6</span>
              <span class="education-institution">南方医科大学</span>
              <span class="education-major">生物医学工程专业</span>
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
    
    <!-- GitHub贡献板块 - 已替换为GitHub贡献日历 -->
    <div class="github-section">
      <h2>GitHub 贡献</h2>
      <div class="github-calendar">
        <div class="calendar-header">
          <div class="contribution-legend">
            <span class="legend-label">贡献等级：</span>
            <span class="legend-item" v-for="level in [0, 1, 2, 3, 4]" :key="level">
              <div class="contribution-cell" :class="`contribution-${level}`"></div>
            </span>
          </div>
        </div>
        <div class="calendar-container">
          <div class="calendar-weekdays">
            <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
          </div>
          <div class="calendar-grid" ref="calendarGrid">
            <div 
              v-for="(cell, index) in cells" 
              :key="index" 
              class="contribution-cell"
              :class="`contribution-${cell}`"
              :title="getCellTitle(index)"
            ></div>
          </div>
        </div>
        <div class="calendar-footer">
          <a href="https://github.com/pluckypioneer" target="_blank" class="github-link">
            github.com/pluckypioneer
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import gsap from 'gsap';

// 更新名字和职业
const name = ref("YUHANG (JOHN) ZHENG");
const tagline = ref("BIOMEDICAL ENGINEER");
const projects = ref([]); // 项目经历数据
const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
const cells = ref(Array(365).fill(0)); // 365天，初始贡献等级为0
const calendarGrid = ref(null);

// 计算年份范围
const yearRange = computed(() => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  return `${lastYear.getFullYear()} - ${today.getFullYear()}`;
});

// 生成模拟的GitHub贡献数据
const generateMockContributionData = () => {
  // 模拟数据 - 在实际应用中，这里可以替换为从GitHub API获取的真实数据
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  
  // 为每一天生成随机的贡献等级（0-4）
  for (let i = 0; i < cells.value.length; i++) {
    const date = new Date(lastYear);
    date.setDate(date.getDate() + i);
    
    // 周末贡献较少
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // 随机生成贡献等级，周末概率较低
    let level = 0;
    const rand = Math.random();
    
    if (isWeekend) {
      if (rand < 0.7) level = 0;
      else if (rand < 0.85) level = 1;
      else if (rand < 0.95) level = 2;
      else if (rand < 0.99) level = 3;
      else level = 4;
    } else {
      if (rand < 0.4) level = 0;
      else if (rand < 0.7) level = 1;
      else if (rand < 0.85) level = 2;
      else if (rand < 0.95) level = 3;
      else level = 4;
    }
    
    cells.value[i] = level;
  }
};

// 获取单元格的提示文本
const getCellTitle = (index) => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const cellDate = new Date(lastYear);
  cellDate.setDate(cellDate.getDate() + index);
  
  const level = cells.value[index];
  let contributions = 0;
  
  // 根据等级设置贡献数量
  switch(level) {
    case 0: contributions = 0; break;
    case 1: contributions = Math.floor(Math.random() * 5) + 1; break;
    case 2: contributions = Math.floor(Math.random() * 10) + 5; break;
    case 3: contributions = Math.floor(Math.random() * 20) + 15; break;
    case 4: contributions = Math.floor(Math.random() * 50) + 30; break;
  }
  
  const dateStr = cellDate.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `${dateStr}: ${contributions} 次贡献`;
};

onMounted(() => {
  // 粒子效果（使用 CSS 或外部库）
  // 这里的 .particles-bg 只是占位符，您可以使用 Particles.js 或自行实现
  
  // 生成GitHub贡献数据
  generateMockContributionData();

  // GSAP 动画：文字打字机效果
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
  
  // GitHub贡献日历动画
  if (calendarGrid.value) {
    gsap.fromTo(
      '.contribution-cell',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.005,
        duration: 0.3,
        ease: 'power2.out',
        delay: 2
      }
    );
  }
});
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  background-image: url('src/assets/image/island-night-moon-scenery-digital-art-8k-wallpaper-uhdpaper.com-289@0@j.jpg'); 
  background-size: cover ;/* 替换为您的背景图片路径 */
  background-color: #0d0d0d; /* 深色背景 */
  color: #fff;
  padding: 100px 0;
  overflow: auto; 
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

/* GitHub贡献日历样式 */
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

.calendar-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.contribution-legend {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-label {
  color: #ddd;
  font-size: 0.9em;
  white-space: nowrap;
}

.legend-item {
  display: inline-block;
}

.calendar-container {
  width: 100%;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 0.8em;
  color: #888;
  font-family: 'Courier New', monospace;
  padding: 4px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
  grid-auto-rows: 12px;
}

.contribution-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: rgba(0, 240, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.contribution-cell:hover {
  transform: scale(1.5);
  z-index: 10;
}

/* 贡献等级颜色 - 使用网站的霓虹蓝色调 */
.contribution-0 { background-color: rgba(0, 240, 255, 0.1); }
.contribution-1 { background-color: rgba(0, 240, 255, 0.3); }
.contribution-2 { background-color: rgba(0, 240, 255, 0.5); }
.contribution-3 { background-color: rgba(0, 240, 255, 0.7); }
.contribution-4 { background-color: rgba(0, 240, 255, 0.9); }

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
  
  /* 响应式日历 */
  .calendar-grid {
    grid-template-columns: repeat(52, 1fr);
  }
  
  .contribution-cell {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .github-calendar {
    padding: 15px;
  }
  
  .calendar-grid {
    grid-template-columns: repeat(51, 1fr);
  }
  
  .contribution-cell {
    width: 8px;
    height: 8px;
  }
}
</style>