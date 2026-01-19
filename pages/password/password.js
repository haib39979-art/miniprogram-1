Page({
  data: {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  onInputOld(e) {
    this.setData({ oldPassword: e.detail.value });
  },
  onInputNew(e) {
    this.setData({ newPassword: e.detail.value });
  },
  onInputConfirm(e) {
    this.setData({ confirmPassword: e.detail.value });
  },
  onSave() {
    const { oldPassword, newPassword, confirmPassword } = this.data;
    if (!oldPassword || !newPassword || !confirmPassword) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none'
      });
      return;
    }
    wx.showToast({
      title: '密码修改成功',
      icon: 'success'
    });
    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
})