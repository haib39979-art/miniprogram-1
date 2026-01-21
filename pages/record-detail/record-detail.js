Page({
  data: {
    record: null
  },
  onLoad(options) {
    if (options.id) {
      const favorites = wx.getStorageSync('favoritedCheckIns') || []
      const record = favorites.find(item => item.id == options.id)
      if (record) {
        this.setData({ record })
      }
    }
  },
  onBack() {
    wx.navigateBack()
  },
  onPreviewImage() {
    if (this.data.record && this.data.record.imageUrl) {
      wx.previewImage({
        urls: [this.data.record.imageUrl],
        current: this.data.record.imageUrl
      })
    }
  },
  onDelete() {
    wx.showModal({
      title: '取消收藏',
      content: '确定要取消收藏这张打卡图片吗？',
      success: (res) => {
        if (res.confirm) {
          const favorites = wx.getStorageSync('favoritedCheckIns') || []
          const newFavorites = favorites.filter(item => item.id != this.data.record.id)
          wx.setStorageSync('favoritedCheckIns', newFavorites)
          
          wx.showToast({
            title: '已取消',
            icon: 'success',
            duration: 1500
          })
          
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      }
    })
  }
})