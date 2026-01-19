Page({
  data: {
    date: {
      full: '2026-01-11 Sunday',
      lunar: '冬月甘三'
    },
    tags: ['一人食', '家庭版'],
    recipe: {
      name: '羊肚菌山药汤',
      imageUrl: '/assets/recipe-yangdujun.png', // Placeholder
      benefits: ['健胃养脾', '益气补血', '增强免疫力'],
      suitable: '阳虚质'
    },
    isCheckedIn: false,
    checkInImage: ''
  },
  onLoad() {
    // In a real app, calculate date dynamically
  },
  onToggleFavorite() {
    wx.showToast({ title: '已收藏', icon: 'success' })
  },
  onTapRecipe() {
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail' })
  },
  onTapHealthType() {
    wx.navigateTo({ url: '/pages/health-detail/health-detail' })
  },
  onCheckIn() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          isCheckedIn: true,
          checkInImage: tempFilePath
        })
        wx.showToast({ title: '打卡成功', icon: 'success' })
      },
      fail: (err) => {
        console.log('User cancelled or failed to choose image', err)
      }
    })
  }
})