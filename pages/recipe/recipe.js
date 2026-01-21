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
    checkInImage: '',
    isCheckInFavorite: false
  },
  onLoad() {
    // In a real app, calculate date dynamically
  },
  onShow() {
    this.checkFavoriteStatus()
  },

  checkFavoriteStatus() {
    const collectedRecipes = wx.getStorageSync('collectedRecipes') || []
    const isFavorite = collectedRecipes.some(item => item.name === this.data.recipe.name)
    this.setData({ isFavorite })
  },

  onToggleFavorite() {
    const collectedRecipes = wx.getStorageSync('collectedRecipes') || []
    const { recipe } = this.data
    const index = collectedRecipes.findIndex(item => item.name === recipe.name)
    
    let isFavorite = false
    
    if (index === -1) {
      // Add to favorites
      collectedRecipes.unshift({
        id: Date.now(),
        ...recipe,
        tags: recipe.benefits
      })
      isFavorite = true
      wx.showToast({ title: '已收藏', icon: 'success' })
    } else {
      // Remove from favorites
      collectedRecipes.splice(index, 1)
      isFavorite = false
      wx.showToast({ title: '已取消', icon: 'none' })
    }
    
    wx.setStorageSync('collectedRecipes', collectedRecipes)
    this.setData({ isFavorite })
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
        
        // Ask for favorite
        wx.showModal({
          title: '打卡成功',
          content: '是否将此打卡图片加入收藏？',
          confirmText: '收藏',
          cancelText: '不收藏',
          success: (res) => {
            if (res.confirm) {
              this.addToFavorites(tempFilePath)
            }
          }
        })
      },
      fail: (err) => {
        console.log('User cancelled or failed to choose image', err)
      }
    })
  },

  onCancelCheckIn() {
    wx.showModal({
      title: '提示',
      content: '确定要取消今日打卡吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            isCheckedIn: false,
            checkInImage: ''
          })
          wx.showToast({
            title: '已取消打卡',
            icon: 'none'
          })
        }
      }
    })
  },

  addToFavorites(imagePath) {
    this.setData({ isCheckInFavorite: true })
    
    // Persist to storage
    const favorites = wx.getStorageSync('favoritedCheckIns') || []
    // Add new item to the beginning
    favorites.unshift({
      id: Date.now(),
      imageUrl: imagePath,
      date: new Date().toLocaleDateString() // Simple date format
    })
    wx.setStorageSync('favoritedCheckIns', favorites)

    wx.showToast({
      title: '已收藏',
      icon: 'success'
    })
  },
  
  onToggleCheckInFavorite() {
    const newVal = !this.data.isCheckInFavorite
    this.setData({ isCheckInFavorite: newVal })
    
    if (newVal) {
      if (this.data.checkInImage) {
         this.addToFavorites(this.data.checkInImage)
      }
    } else {
      const favorites = wx.getStorageSync('favoritedCheckIns') || []
      const newFavorites = favorites.filter(item => item.imageUrl !== this.data.checkInImage)
      wx.setStorageSync('favoritedCheckIns', newFavorites)
      
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
  }
})