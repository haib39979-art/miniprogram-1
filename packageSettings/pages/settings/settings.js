Page({
  data: {

  },
  onLoad() {

  },
  onTapItem(e) {
    const item = e.currentTarget.dataset.item;
    console.log('Tapped item:', item);
    
    if (item === 'account_security') {
      wx.navigateTo({
        url: '/packageSettings/pages/account-security/account-security'
      });
    } else if (item === 'profile') {
      wx.navigateTo({
        url: '/packageSettings/pages/profile-edit/profile-edit'
      });
    } else if (item === 'general') {
      wx.navigateTo({
        url: '/packageSettings/pages/general/general'
      });
    } else if (item === 'storage') {
      wx.navigateTo({
        url: '/packageSettings/pages/storage/storage'
      });
    } else if (item === 'privacy') {
      wx.navigateTo({
        url: '/packageSettings/pages/privacy-permissions/privacy-permissions'
      });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
  },
  onSwitchAccount() {
    console.log('Switch Account');
    wx.showToast({
      title: '切换账号',
      icon: 'none'
    })
  },
  onLogout() {
    console.log('Logout');
    wx.showToast({
      title: '退出登录',
      icon: 'none'
    })
  }
})