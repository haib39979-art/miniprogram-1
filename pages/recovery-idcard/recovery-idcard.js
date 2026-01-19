Page({
  data: {
    name: '',
    idcard: ''
  },
  onInputName(e) {
    this.setData({ name: e.detail.value });
  },
  onInputID(e) {
    this.setData({ idcard: e.detail.value });
  },
  onConfirm() {
    // Mock validation
    if (!this.data.name || !this.data.idcard) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '验证通过',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})