Page({
  data: {
    hourlyForecast: [
      { time: '现在', icon: 'wind', temp: '-3°', active: true },
      { time: '0:00', icon: 'wind', temp: '-3°' },
      { time: '1:00', icon: 'cloud', temp: '-3°' },
      { time: '2:00', icon: 'cloud', temp: '-3°' },
      { time: '3:00', icon: 'cloud', temp: '-3°' },
      { time: '4:00', icon: 'cloud', temp: '-4°' },
      { time: '5:00', icon: 'wind', temp: '-4°' },
      { time: '6:00', icon: 'wind', temp: '-4°' },
      { time: '7:00', icon: 'cloud', temp: '-3°' },
    ],
    hasMapImage: false,
    dateString: ''
  },
  onLoad() {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    
    this.setData({
      dateString: `${dayName}, ${day}, ${monthName}`
    });
  },
  onTapBack() {
    wx.navigateBack()
  },
  onTapWind() {
    wx.navigateTo({
      url: '/pages/wind-detail/wind-detail'
    })
  },
  onTapHumidity() {
    wx.navigateTo({
      url: '/pages/humidity-detail/humidity-detail'
    })
  },
  onTapUV() {
    wx.navigateTo({
      url: '/pages/uv-detail/uv-detail'
    })
  }
})