// GitHub贡献数据模拟模块
export function generateMockContributionData() {
  const cells = Array(365).fill(0); // 365天，初始贡献等级为0
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  
  // 为每一天生成随机的贡献等级（0-4）
  for (let i = 0; i < cells.length; i++) {
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
    
    cells[i] = level;
  }
  
  return cells;
}

export function getCellTitle(index, cells) {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const cellDate = new Date(lastYear);
  cellDate.setDate(cellDate.getDate() + index);
  
  const level = cells[index];
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
}