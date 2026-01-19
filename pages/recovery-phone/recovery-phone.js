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
    if (!this.data.phone || this.data.phone.length !== 11) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '验证码已发送',
      icon: 'none'
    });
  },
  onConfirm() {
    if (!this.data.phone || !this.data.code) {
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