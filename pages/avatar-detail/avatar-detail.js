const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    avatarUrl: '/assets/avatar-me.png'
  },

  onLoad(options) {
    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const navBarHeight = platform === 'android' ? 48 : 44
    this.setData({
      statusBarHeight,
      navBarHeight
    })

    if (options.avatar) {
      this.setData({ avatarUrl: options.avatar })
    }
  },

  onClose() {
    wx.navigateBack()
  },

  onChangeAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          avatarUrl: tempFilePath
        })
      }
    })
  },

  onSaveAvatar() {
    // For local assets, saveImageToPhotosAlbum might not work directly without downloading or being a temp path.
    // Assuming for now it's a user selected image or we handle the error.
    // If it's a local project asset, we can't save it directly usually unless we use getFileSystemManager.
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.avatarUrl,
      success() {
        wx.showToast({ title: '已保存', icon: 'success' })
      },
      fail: (err) => {
        console.error(err)
        // If it's a local path like /assets/..., it will fail. 
        // We'll just show a toast for this demo if it fails.
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    })
  },

  onGetPendant() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }
})