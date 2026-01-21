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
    dateString: '',
    locationName: '北京市',
    locationAddress: '北京市朝阳区',
    latitude: 39.9042,
    longitude: 116.4074,
    markers: [{
      id: 0,
      latitude: 39.9042,
      longitude: 116.4074,
      width: 30,
      height: 30
    }]
  },
  onLoad() {
    this.generate24HourlyForecast();
    
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

  generate24HourlyForecast() {
    const currentHour = new Date().getHours();
    const list = [];
    const sunriseHour = 6;  // Mock sunrise time
    const sunsetHour = 18;  // Mock sunset time

    // Generate next 24 hours
    for (let i = 0; i < 24; i++) {
      let hour = (currentHour + i) % 24;
      let timeStr = i === 0 ? '现在' : `${hour}:00`;
      
      // Check for sunrise/sunset
      let specialStatus = '';
      if (hour === sunriseHour && i !== 0) {
        specialStatus = 'sunrise';
        timeStr = '日出';
      } else if (hour === sunsetHour && i !== 0) {
        specialStatus = 'sunset';
        timeStr = '日落';
      }

      let icon = 'cloud';
      // Simple logic for icon variety
      if (hour >= 6 && hour <= 18) {
        if (hour % 3 === 0) icon = 'sunny';
        else if (hour % 3 === 1) icon = 'cloud';
        else icon = 'wind';
      } else {
        icon = 'moon'; // You might want a moon icon for night
      }
      
      // Override icon for special events
      if (specialStatus === 'sunrise') icon = 'sunrise';
      if (specialStatus === 'sunset') icon = 'sunset';

      // Mock temp curve
      let baseTemp = -3;
      let tempOffset = 0;
      if (hour >= 6 && hour <= 15) tempOffset = (hour - 6); // Rise until 3pm
      else if (hour > 15) tempOffset = 9 - (hour - 15); // Fall after 3pm
      else tempOffset = -1 * (6 - hour); // Cold at night
      
      let temp = `${baseTemp + Math.floor(tempOffset / 2)}°`;

      list.push({
        time: timeStr,
        icon: icon,
        temp: temp,
        active: i === 0,
        special: specialStatus
      });
    }

    this.setData({
      hourlyForecast: list
    });
  },
  formatAddress(address) {
    if (!address) return '';
    console.log('Formatting address:', address);
    // 匹配：省/直辖市 + 市/州 + 区/县
    // 注意：非贪婪匹配以避免跨越层级，但在某些情况下（如“xx市xx区”）需要仔细处理
    const regex = /^(.*?[省自治区]|.*?行政区|.*?市)?(.*?[市州地区盟]|.*?自治州)?(.*?[区县市旗])?/;
    const match = address.match(regex);
    
    if (match && (match[1] || match[2] || match[3])) {
        const result = (match[1] || '') + (match[2] || '') + (match[3] || '');
        console.log('Formatted result:', result);
        return result;
    }
    return address;
  },

  onTapMap() {
    wx.chooseLocation({
      success: (res) => {
        console.log('Chosen location:', res)
        
        const shortAddress = this.formatAddress(res.address || '');

        this.setData({
          locationName: res.name || '选定位置',
          locationAddress: shortAddress,
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 30,
            height: 30
          }]
        })
        
        // Here you would typically fetch weather for the new coordinates (res.latitude, res.longitude)
        wx.showToast({
          title: '已切换城市',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.log('Failed to choose location:', err)
        if (err.errMsg.indexOf('auth deny') >= 0) {
          wx.showModal({
            title: '提示',
            content: '需要获取位置权限以选择地点',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting()
              }
            }
          })
        }
      }
    })
  },
  onTapBack() {
    wx.navigateBack()
  },
  onTapTemp() {
    wx.navigateTo({
      url: '/packageWeather/pages/five-days-forecast/five-days-forecast'
    })
  },
  onTapWind() {
    wx.navigateTo({
      url: '/packageWeather/pages/wind-detail/wind-detail'
    })
  },
  onTapHumidity() {
    wx.navigateTo({
      url: '/packageWeather/pages/humidity-detail/humidity-detail'
    })
  },
  onTapUV() {
    wx.navigateTo({
      url: '/packageWeather/pages/uv-detail/uv-detail'
    })
  }
})