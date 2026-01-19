Page({
  data: {},
  onConfirm() {
    wx.showToast({
      title: '验证请求已发送',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})