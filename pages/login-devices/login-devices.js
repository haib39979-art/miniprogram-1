Page({
  data: {
    devices: [
      {
        id: 1,
        name: '🦊 [本机]',
        time: '2026.01.10 20:13 北京',
        isCurrent: true
      },
      {
        id: 2,
        name: '⭐',
        time: '2026.01.10 20:13 北京',
        isCurrent: false
      }
    ]
  },
  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    const now = new Date();
    const timeStr = `${now.getFullYear()}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} 北京`;
    
    this.setData({
      devices: [
        {
          id: 1,
          name: `${sysInfo.model} [本机]`,
          time: timeStr,
          isCurrent: true
        },
        {
          id: 2,
          name: 'iPhone 13 Pro',
          time: '2025.12.20 10:00 北京',
          isCurrent: false
        }
      ]
    });
  },
  onTapDevice(e) {
    const id = e.currentTarget.dataset.id;
    console.log('Tapped device:', id);
  },
  onManage() {
    wx.showToast({
      title: '管理设备',
      icon: 'none'
    });
  }
})