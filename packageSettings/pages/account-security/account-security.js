Page({
  data: {},
  onLoad() {},
  onTapItem(e) {
    const item = e.currentTarget.dataset.item;
    console.log('Tapped:', item);
    
    let url = '';
    switch (item) {
      case 'phone':
        url = '/packageSettings/pages/phone-binding/phone-binding';
        break;
      case 'realname':
        url = '/packageSettings/pages/real-name/real-name';
        break;
      case 'devices':
        url = '/packageSettings/pages/login-devices/login-devices';
        break;
      case 'recovery':
        url = '/packageSettings/pages/account-recovery/account-recovery';
        break;
      case 'security_knowledge':
        url = '/packageSettings/pages/security-knowledge/security-knowledge';
        break;
      case 'password':
        url = '/packageSettings/pages/password/password';
        break;
      case 'binding':
        url = '/packageSettings/pages/account-binding/account-binding';
        break;
      case 'cancellation':
        url = '/packageSettings/pages/account-cancellation/account-cancellation';
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