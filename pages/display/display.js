Page({
  data: {
    theme: 'system', // system, light, dark
    fontSizeIndex: 1, // 0: small, 1: standard, 2: large
    showLunar: true
  },

  onLoad() {
    // In a real app, you would load these settings from wx.getStorageSync
  },

  onSelectTheme(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ theme: mode });
    wx.showToast({
      title: '已切换',
      icon: 'none'
    });
  },

  onFontSizeChange(e) {
    this.setData({ fontSizeIndex: e.detail.value });
  },

  onToggleLunar(e) {
    this.setData({ showLunar: e.detail.value });
  }
})