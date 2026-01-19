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
        url: '/pages/account-security/account-security'
      });
    } else if (item === 'profile') {
      wx.navigateTo({
        url: '/pages/profile-edit/profile-edit'
      });
    } else if (item === 'general') {
      wx.navigateTo({
        url: '/pages/general/general'
      });
    } else if (item === 'storage') {
      wx.navigateTo({
        url: '/pages/storage/storage'
      });
    } else if (item === 'privacy') {
      wx.navigateTo({
        url: '/pages/privacy-permissions/privacy-permissions'
      });
    } else if (item === 'display') {
      wx.navigateTo({
        url: '/pages/display/display'
      });
    } else if (item === 'about') {
      wx.navigateTo({
        url: '/pages/about/about'
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
      itemList: ['添加账号', '恢复账号'],
      success(res) {
        console.log(res.tapIndex)
        wx.showToast({
          title: '功能开发中',
          icon: 'none'
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      confirmColor: '#fa5151',
      success (res) {
        if (res.confirm) {
          // 清除本地存储的用户信息（示例）
          // wx.removeStorageSync('userInfo')
          // getApp().globalData.userInfo = null
          
          wx.showToast({
            title: '已退出',
            icon: 'success',
            duration: 1500
          })
          
          // 可以在这里跳转到登录页，或者重置页面状态
          // setTimeout(() => {
          //   wx.reLaunch({ url: '/pages/index/index' })
          // }, 1500)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})