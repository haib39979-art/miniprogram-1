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
    wx.showActionSheet({
      itemList: ['使用微信重新登录', '使用手机号登录'],
      success: (res) => {
        const idx = res.tapIndex
        if (idx === 0) {
          wx.showToast({ title: '跳转微信登录', icon: 'none' })
          // 这里可接入正式登录流程；先模拟为清理后返回登录设备管理
          this.simulateLogout(() => {
            wx.navigateTo({ url: '/packageSettings/pages/login-devices/login-devices' })
          })
        } else if (idx === 1) {
          wx.navigateTo({ url: '/packageSettings/pages/phone-binding/phone-binding' })
        }
      }
    })
  },
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '退出后将清除本地账号数据，是否继续？',
      confirmColor: '#CC7979',
      success: (res) => {
        if (res.confirm) {
          this.simulateLogout(() => {
            wx.switchTab({ url: '/pages/me/me' })
            wx.showToast({ title: '已退出', icon: 'success' })
          })
        }
      }
    })
  },
  simulateLogout(cb) {
    try {
      wx.removeStorageSync('userProfile')
      wx.removeStorageSync('tizhiDetail')
      wx.removeStorageSync('favoritedCheckIns')
      wx.removeStorageSync('collectedRecipes')
      wx.removeStorageSync('collectedHerbs')
    } catch (e) {}
    if (typeof cb === 'function') cb()
  }
})
