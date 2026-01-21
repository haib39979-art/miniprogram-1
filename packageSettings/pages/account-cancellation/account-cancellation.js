Page({
  data: {
    agreed: false
  },
  onCheck(e) {
    this.setData({ agreed: !this.data.agreed });
  },
  onConfirm() {
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先勾选同意协议',
        icon: 'none'
      });
      return;
    }
    wx.showModal({
      title: '确认注销',
      content: '注销后账号无法恢复，是否继续？',
      confirmColor: '#FA5151',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已提交注销申请',
            icon: 'none'
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
            });
          }, 2000);
        }
      }
    });
  }
})