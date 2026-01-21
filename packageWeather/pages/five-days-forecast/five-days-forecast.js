Page({
  data: {
    forecastList: []
  },

  onLoad() {
    this.generateForecastData();
  },

  generateForecastData() {
    const today = new Date();
    const list = [];
    
    // Generate -5 to +5 days (total 11 days)
    for (let i = -5; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isToday = i === 0;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const weekDay = isToday ? '今天' : weekDays[date.getDay()];

      // Mock data logic to simulate weather variations
      let tempHigh = 2 + Math.floor(Math.random() * 5) - (i * 0.2); 
      let tempLow = -8 + Math.floor(Math.random() * 5) - (i * 0.2);
      
      // Ensure integer
      tempHigh = Math.round(tempHigh);
      tempLow = Math.round(tempLow);

      let icon = 'sunny';
      let status = '晴';
      // Simple pattern for variety
      if (Math.abs(i) % 3 === 1) { icon = 'cloudy'; status = '多云'; }
      if (Math.abs(i) % 4 === 2) { icon = 'snow'; status = '小雪'; }
      if (Math.abs(i) % 5 === 3) { icon = 'wind'; status = '有风'; }

      list.push({
        dateStr: `${month}月${day}日`,
        weekDay,
        tempHigh,
        tempLow,
        icon,
        status,
        isToday
      });
    }

    this.setData({
      forecastList: list
    });
    
    // Scroll to today after rendering (optional, simple delay)
    setTimeout(() => {
        // Find index of today is 5 (0 to 10, 5 is center)
        // Implementation dependent on scroll-view id if needed
    }, 100);
  },

  onTapBack() {
    wx.navigateBack();
  }
})