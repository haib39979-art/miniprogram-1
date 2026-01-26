// app.js
App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
      }
    })

    const userProfile = wx.getStorageSync('userProfile') || {}
    if (!userProfile.name) {
      wx.showModal({
        title: '微信一键登录',
        content: '是否使用微信一键登录？',
        confirmText: '同意',
        cancelText: '暂不',
        success: res => {
          if (res.confirm) {
            wx.getUserProfile({
              desc: '用于完善个人资料',
              success: profileRes => {
                const info = profileRes.userInfo || {}
                const existing = wx.getStorageSync('userProfile') || {}
                const storedId = existing.id || wx.getStorageSync('userId') || ''
                const generatedId = storedId || `wx${Date.now()}${Math.floor(Math.random() * 1000)}`
                const nextProfile = {
                  ...existing,
                  name: info.nickName || existing.name || '',
                  avatar: info.avatarUrl || existing.avatar || '',
                  id: generatedId
                }
                wx.setStorageSync('userProfile', nextProfile)
                wx.setStorageSync('userId', generatedId)
              },
              fail: () => {
                wx.showToast({
                  title: '未授权',
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
