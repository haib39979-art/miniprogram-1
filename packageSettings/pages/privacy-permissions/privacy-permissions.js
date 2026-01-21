Page({
  data: {},
  onLoad() {},
  onTapItem(e) {
    const item = e.currentTarget.dataset.item;
    console.log('Tapped:', item);
    
    // 打开小程序设置界面，用户可以在此管理授权信息
    wx.openSetting({
      success(res) {
        console.log('Opened settings', res.authSetting);
      },
      fail(err) {
        console.error('Failed to open settings', err);
        wx.showToast({
          title: '无法打开设置',
          icon: 'none'
        });
      }
    });
  }
})