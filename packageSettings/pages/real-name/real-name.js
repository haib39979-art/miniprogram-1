Page({
  data: {
    name: '',
    idCard: ''
  },
  onInputName(e) {
    this.setData({ name: e.detail.value });
  },
  onInputID(e) {
    this.setData({ idCard: e.detail.value });
  },
  onConfirm() {
    console.log('Real name auth:', this.data.name, this.data.idCard);
    wx.showToast({
      title: '认证提交成功',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})