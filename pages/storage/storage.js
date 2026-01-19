Page({
  data: {
    currentSize: 0,
    limitSize: 0,
    percent: 0
  },
  onShow() {
    this.updateStorageInfo();
  },
  updateStorageInfo() {
    try {
      const res = wx.getStorageInfoSync();
      const currentSize = res.currentSize; // In KB
      const limitSize = res.limitSize;     // In KB
      
      let percent = 0;
      if (limitSize > 0) {
        percent = (currentSize / limitSize) * 100;
      }
      
      this.setData({
        currentSize: currentSize,
        limitSize: limitSize,
        percent: percent
      });
    } catch (e) {
      console.error('Failed to get storage info', e);
    }
  },
  onClearStorage() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有缓存数据吗？',
      confirmColor: '#FA5151',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.clearStorageSync();
            wx.showToast({
              title: '清除成功',
              icon: 'success'
            });
            this.updateStorageInfo();
          } catch (e) {
            wx.showToast({
              title: '清除失败',
              icon: 'none'
            });
          }
        }
      }
    });
  }
})