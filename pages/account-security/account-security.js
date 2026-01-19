Page({
  data: {},
  onLoad() {},
  onTapItem(e) {
    const item = e.currentTarget.dataset.item;
    console.log('Tapped:', item);
    
    let url = '';
    switch (item) {
      case 'phone':
        url = '/pages/phone-binding/phone-binding';
        break;
      case 'realname':
        url = '/pages/real-name/real-name';
        break;
      case 'devices':
        url = '/pages/login-devices/login-devices';
        break;
      case 'recovery':
        url = '/pages/account-recovery/account-recovery';
        break;
      case 'security_knowledge':
        url = '/pages/security-knowledge/security-knowledge';
        break;
      case 'password':
        url = '/pages/password/password';
        break;
      case 'binding':
        url = '/pages/account-binding/account-binding';
        break;
      case 'cancellation':
        url = '/pages/account-cancellation/account-cancellation';
        break;
      default:
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        });
        return;
    }
    
    if (url) {
      wx.navigateTo({ url });
    }
  }
})