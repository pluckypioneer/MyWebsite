// 星空动画模块
export function initStarAnimation() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  
  const hue = 217; // 色调色彩
  const stars = []; // 保存所有星星
  let count = 0; // 用于计算星星
  const maxStars = 1300; // 星星数量
  
  // 创建星星的源图像
  const canvas2 = document.createElement('canvas');
  const ctx2 = canvas2.getContext('2d');
  canvas2.width = 100;
  canvas2.height = 100;
  
  const half = canvas2.width / 2;
  const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#CCC');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');
  
  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();
  
  // 随机数生成函数
  function random(min, max) {
    if(arguments.length < 2) {
      max = min;
      min = 0;
    }
    
    if(min > max) {
      const hold = max;
      max = min;
      min = hold;
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // 计算星星轨道半径
  function maxOrbit(x, y) {
    const max = Math.max(x, y);
    const diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  }
  
  // 星星类
  class Star {
    constructor() {
      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 8;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 50000;
      this.alpha = random(2, 10) / 10;
      
      count++;
      stars[count] = this;
    }
    
    draw() {
      const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
      const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
      const twinkle = random(10);
      
      if(twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if(twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }
      
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }
  }
  
  // 初始化所有星星
  for(let i = 0; i < maxStars; i++) {
    new Star();
  }
  
  // 动画循环
  function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.5; // 尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
    ctx.fillRect(0, 0, w, h);
    
    ctx.globalCompositeOperation = 'lighter';
    for(let i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    };
    
    window.requestAnimationFrame(animation);
  }
  
  // 处理窗口大小变化
  window.addEventListener('resize', function() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    // 重新初始化星星
    stars.length = 0;
    count = 0;
    for(let i = 0; i < maxStars; i++) {
      new Star();
    }
  });
  
  animation();
}