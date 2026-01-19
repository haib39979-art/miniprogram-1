Page({
  data: {},
  onTapItem(e) {
    const type = e.currentTarget.dataset.type;
    console.log('Recovery type:', type);
    
    let url = '';
    switch (type) {
      case 'wechat':
        url = '/pages/recovery-wechat/recovery-wechat';
        break;
      case 'idcard':
        url = '/pages/recovery-idcard/recovery-idcard';
        break;
      case 'phone':
        url = '/pages/recovery-phone/recovery-phone';
        break;
      default:
        wx.showToast({
          title: '暂未开放',
          icon: 'none'
        });
        return;
    }
    
    if (url) {
      wx.navigateTo({ url });
    }
  }
})