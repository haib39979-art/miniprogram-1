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
    collectedRecipes: [
      { 
        id: 1, 
        name: '羊肚菌山药汤', 
        tags: ['健胃养脾', '益气补血', '增强免疫力'],
        suitable: '阳虚质',
        imageUrl: '/assets/recipe-yangdujun.png' 
      },
      { 
        id: 2, 
        name: '羊肚菌山药汤', 
        tags: ['健胃养脾', '益气补血', '增强免疫力'],
        suitable: '阳虚质',
        imageUrl: '/assets/recipe-yangdujun.png' 
      }
    ],
    collectedHerbs: [
      {
        id: 1,
        day: '27',
         month: '12',
         lunarDate: '农历四八',
         yi: '安床开业',
         ji: '搬家出行',
         name: '三七',
        alias: '金不换',
        origin: '云南文山',
        details: [
           { label: '产地(中国)', content: '全国主产于云南、广西等地区' },
           { label: '性味', content: '性温，味甘微苦' },
           { label: '功效', content: '散瘀止血，消肿定痛' },
           { label: '主治', content: '出血症、跌打损伤、瘀血肿痛' }
         ],
         imageUrl: '/assets/herb-sanqi.png'
       },
       {
         id: 2,
         day: '27',
         month: '12',
         lunarDate: '农历四八',
         yi: '安床开业',
         ji: '搬家出行',
         name: '三七',
         alias: '金不换',
         origin: '云南文山',
         details: [
           { label: '产地(中国)', content: '全国主产于云南、广西等地区' },
           { label: '性味', content: '性温，味甘微苦' },
           { label: '功效', content: '散瘀止血，消肿定痛' },
           { label: '主治', content: '出血症、跌打损伤、瘀血肿痛' }
         ],
         imageUrl: '/assets/herb-sanqi.png'
       },
       {
         id: 3,
         day: '27',
         month: '12',
         lunarDate: '农历四八',
         yi: '安床开业',
         ji: '搬家出行',
         name: '三七',
         alias: '金不换',
         origin: '云南文山',
         details: [
           { label: '产地(中国)', content: '全国主产于云南、广西等地区' },
           { label: '性味', content: '性温，味甘微苦' },
           { label: '功效', content: '散瘀止血，消肿定痛' },
           { label: '主治', content: '出血症、跌打损伤、瘀血肿痛' }
         ],
         imageUrl: '/assets/herb-sanqi.png'
       }
    ],
    recordList: [
      { id: 1, date: '2025.01.12', imageUrl: '/assets/recipe-yangdujun.png' },
      { id: 2, date: '2025.01.12', imageUrl: '/assets/recipe-yangdujun.png' },
      { id: 3, date: '2025.01.12', imageUrl: '/assets/recipe-yangdujun.png' },
      { id: 4, date: '2025.01.12', imageUrl: '/assets/recipe-yangdujun.png' }
    ]
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
    wx.navigateTo({ url: '/pages/settings/settings' })
  },

  onTapAvatar() {
    wx.navigateTo({ url: '/pages/avatar-detail/avatar-detail' })
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