Page({
  data: {
    weekDays: [],
    currentDate: '',
    windLevel: '1级',
    windDirection: '北',
    gust: '阵风：2米/秒',
    summary: '当前风力3级，南西南风。今天，风力为1至3级，阵风最高可达10米/秒。'
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
    const levels = ['1级', '2级', '3级', '4级'];
    const randomLevel = levels[index % levels.length];
    
    this.setData({
      weekDays,
      currentDate: selectedDay.fullDate,
      windLevel: randomLevel,
      // Randomize other data slightly for effect
      gust: `阵风：${2 + index}米/秒`
    });
  },
  onBack() {
    wx.navigateBack()
  }
})