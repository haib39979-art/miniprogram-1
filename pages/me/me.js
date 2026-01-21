Page({
  data: {
    userInfo: {
      name: 'Beau-Temps',
      id: '3225141371',
      // Using a placeholder color/text for avatar if no image available
      avatar: '' 
    },
    activeTab: 'personal',
    tabs: [
      { key: 'personal', label: 'personal' },
      { key: 'collect', label: 'collect' },
      { key: 'record', label: 'record' }
    ],
    healthGuide: {
      type: '阳虚质',
      title: '生活指南',
      items: [
        { label: '饮食', content: '宜温补食物，忌生冷寒凉' },
        { label: '运动', content: '适度运动避免过度消耗阳气' },
        { label: '作息', content: '早睡早起，保暖避寒' },
        { label: '情绪', content: '避免过度忧思，调节情绪' },
        { label: '环境', content: '晒太阳，居住环境温暖干燥' },
        { label: '季节', content: '春夏养阳，秋冬防寒' },
        { label: '习惯', content: '艾叶生姜煮水泡脚' }
      ]
    },
    daysCount: 1258,
    startDate: '2022.08.01',
    customGridImage: '/assets/recipe-yangdujun.png',
    collectedRecipes: [],
    collectedHerbs: [],
    recordList: []
  },

  onShow() {
    this.updateFavorites()
    this.updateDays()
  },

  updateDays() {
    let startDate = wx.getStorageSync('startDate')
    if (!startDate) {
      startDate = '2022-08-01'
      wx.setStorageSync('startDate', startDate)
    }
    
    // Normalize date string for calculation
    const start = new Date(startDate.replace(/\./g, '-'))
    const now = new Date()
    const diffTime = Math.abs(now - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 
    
    // Format for display (Zen style: dots)
    const displayDate = startDate.replace(/-/g, '.')

    this.setData({
      startDate: displayDate,
      daysCount: diffDays
    })
  },

  updateFavorites() {
    const favorites = wx.getStorageSync('favoritedCheckIns') || []
    const collectedRecipes = wx.getStorageSync('collectedRecipes') || []
    const collectedHerbs = wx.getStorageSync('collectedHerbs') || []
    this.setData({
      recordList: favorites,
      collectedRecipes: collectedRecipes,
      collectedHerbs: collectedHerbs
    })
  },

  onLoad() {
    
  },

  onTabClick(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.key
    })
  },

  onTapHealthType() {
    wx.navigateTo({ url: '/pages/health-detail/health-detail' })
  },

  onTapSettings() {
    wx.navigateTo({ url: '/packageSettings/pages/settings/settings' })
  },

  onTapAvatar() {
    wx.navigateTo({ url: '/pages/avatar-detail/avatar-detail' })
  },

  onTapRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/record-detail/record-detail?id=${id}`
    })
  },

  onTapDays() {
    const { daysCount, startDate } = this.data;
    wx.navigateTo({
      url: `/pages/anniversary/anniversary?days=${daysCount}&date=${startDate}`
    })
  },

  onTapRecipe() {
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail' })
  },

  onChooseGridImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({
          customGridImage: tempFilePath
        })
      }
    })
  }
})