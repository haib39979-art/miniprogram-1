Page({
  data: {
    weekDays: [],
    currentDate: '',
    humidityLevel: '45%',
    dewPoint: '露点：-5°',
    summary: '当前湿度45%。今天，湿度将在30%至50%之间波动，空气较为干燥，请注意补水。'
  },
  onLoad() {
    this.generateDays();
  },
  generateDays() {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const weekDays = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      weekDays.push({
        day: days[date.getDay()],
        date: date.getDate(),
        fullDate: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${days[date.getDay()]}`,
        active: i === 0 // Default select first day
      });
    }
    
    this.setData({
      weekDays,
      currentDate: weekDays[0].fullDate
    });
  },
  onTapDate(e) {
    const index = e.currentTarget.dataset.index;
    const weekDays = this.data.weekDays.map((item, i) => ({
      ...item,
      active: i === index
    }));
    
    // Update data based on selection (Mock logic)
    const selectedDay = weekDays[index];
    
    this.setData({
      weekDays,
      currentDate: selectedDay.fullDate,
      // Randomize data slightly for effect
      humidityLevel: `${40 + (index % 20)}%`
    });
  },
  onBack() {
    wx.navigateBack()
  }
})