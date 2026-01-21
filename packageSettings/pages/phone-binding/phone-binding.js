Page({
  data: {
    phone: '',
    code: ''
  },
  onInputPhone(e) {
    this.setData({ phone: e.detail.value });
  },
  onInputCode(e) {
    this.setData({ code: e.detail.value });
  },
  onGetCode() {
    wx.showToast({
      title: '验证码已发送',
      icon: 'none'
    });
  },
  onConfirm() {
    console.log('Binding phone:', this.data.phone, this.data.code);
    wx.showToast({
      title: '绑定成功',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})