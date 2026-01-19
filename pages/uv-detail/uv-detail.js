Page({
  data: {
    weekDays: [],
    currentDate: '',
    uvLevel: '弱',
    uvValue: '紫外线指数：2',
    summary: '当前紫外线强度较弱。您可以放心进行户外活动，无需特别防护。'
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
        active: i === 0
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
    
    const selectedDay = weekDays[index];
    const levels = ['弱', '中', '强'];
    
    this.setData({
      weekDays,
      currentDate: selectedDay.fullDate,
      uvLevel: levels[index % 3],
      uvValue: `紫外线指数：${2 + (index % 5)}`
    });
  },
  onBack() {
    wx.navigateBack()
  }
})