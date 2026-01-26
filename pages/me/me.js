Page({
  data: {
    userInfo: {
      name: '',
      id: '',
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
    constitutionTested: false,
    daysCount: 1258,
    startDate: '2022.08.01',
    customGridImage: '/assets/recipe-yangdujun.png',
    collectedRecipes: [],
    collectedHerbs: [],
    recordList: [],
    todayCheckInImage: '',
    hasTodayCheckIn: false
  },

  onShow() {
    this.updateFavorites()
    this.updateDays()
    this.updateConstitution()
    this.updateUserInfo()
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
    const todayCheckIn = wx.getStorageSync('todayCheckIn') || null
    const today = new Date().toLocaleDateString()
    const todayItem = todayCheckIn && todayCheckIn.date === today ? todayCheckIn : null
    this.setData({
      recordList: favorites,
      collectedRecipes: collectedRecipes,
      collectedHerbs: collectedHerbs,
      todayCheckInImage: todayItem ? todayItem.imageUrl : '',
      hasTodayCheckIn: !!todayItem
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
    const userProfile = wx.getStorageSync('userProfile') || {}
    const detail = wx.getStorageSync('tizhiDetail') || null
    const tested = !!userProfile.constitution
    if (!tested) {
      wx.navigateTo({ url: '/pages/tizhi-test/tizhi-test' })
      return
    }
    const type = detail?.type || userProfile.constitution || this.data.healthGuide.type
    const subtitle = this.buildSubtitle(type)
    wx.navigateTo({ 
      url: `/pages/health-detail/health-detail?type=${encodeURIComponent(type)}&subtitle=${encodeURIComponent(subtitle)}`
    })
  },

  onTapSettings() {
    wx.navigateTo({ url: '/packageSettings/pages/settings/settings' })
  },

  onTapAvatar() {
    const avatar = this.data.userInfo.avatar || ''
    const url = avatar
      ? `/pages/avatar-detail/avatar-detail?avatar=${encodeURIComponent(avatar)}`
      : '/pages/avatar-detail/avatar-detail'
    wx.navigateTo({ url })
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
  },
  updateConstitution() {
    const userProfile = wx.getStorageSync('userProfile') || {}
    const tested = !!userProfile.constitution
    const type = userProfile.constitution || '阳虚质'
    const items = this.buildGuideItems(type)
    this.setData({
      constitutionTested: tested,
      healthGuide: {
        type,
        title: '生活指南',
        items
      }
    })
  },
  buildGuideItems(type) {
    const presets = {
      '阳虚质': [
        { label: '饮食', content: '宜温补食物，忌生冷寒凉' },
        { label: '运动', content: '适度运动避免过度消耗阳气' },
        { label: '作息', content: '早睡早起，保暖避寒' },
        { label: '情绪', content: '避免过度忧思，调节情绪' },
        { label: '环境', content: '晒太阳，居住环境温暖干燥' },
        { label: '季节', content: '春夏养阳，秋冬防寒' },
        { label: '习惯', content: '艾叶生姜煮水泡脚' }
      ],
      '气虚质': [
        { label: '饮食', content: '健脾益气，多清淡少油腻' },
        { label: '运动', content: '循序渐进，避免过度劳累' },
        { label: '作息', content: '保证睡眠，午后适度休息' },
        { label: '情绪', content: '放松心情，减少压力' },
        { label: '环境', content: '通风阳光，避免潮湿' },
        { label: '季节', content: '春秋加强调理，冬季保暖' },
        { label: '习惯', content: '少熬夜，多温水' }
      ],
      '阴虚质': [
        { label: '饮食', content: '滋阴清补，少辛辣煎炸' },
        { label: '运动', content: '温和为主，避免夜间剧烈' },
        { label: '作息', content: '规律作息，避免熬夜' },
        { label: '情绪', content: '静心养性，减少烦躁' },
        { label: '环境', content: '避免干燥炎热，适度加湿' },
        { label: '季节', content: '夏季尤需清补，冬季少燥' },
        { label: '习惯', content: '温水代替冷饮' }
      ],
      '痰湿质': [
        { label: '饮食', content: '少甜少油，清淡少黏腻' },
        { label: '运动', content: '每日快走或慢跑30分钟' },
        { label: '作息', content: '早睡早起，规律排便' },
        { label: '情绪', content: '保持积极，避免懒散' },
        { label: '环境', content: '干燥通风，避免潮湿' },
        { label: '季节', content: '梅雨季注意祛湿' },
        { label: '习惯', content: '饭后久坐需避免' }
      ],
      '湿热质': [
        { label: '饮食', content: '少辛辣油炸，多绿叶蔬菜' },
        { label: '运动', content: '适度出汗，避免闷热' },
        { label: '作息', content: '保证睡眠，减少熬夜' },
        { label: '情绪', content: '清心少怒，避免浮躁' },
        { label: '环境', content: '降温除湿，保持清爽' },
        { label: '季节', content: '夏季清热解暑为主' },
        { label: '习惯', content: '常饮温水，少冰饮' }
      ],
      '气郁质': [
        { label: '饮食', content: '清淡少油，多水果蔬菜' },
        { label: '运动', content: '多户外与社交，舒展身体' },
        { label: '作息', content: '保持规律，提高睡眠质量' },
        { label: '情绪', content: '疏肝解郁，听音乐聊天' },
        { label: '环境', content: '明亮通风，减少压抑' },
        { label: '季节', content: '春季重在疏肝理气' },
        { label: '习惯', content: '写日记或冥想' }
      ],
      '血瘀质': [
        { label: '饮食', content: '少油少盐，适量活血食材' },
        { label: '运动', content: '规律有氧运动，避免久坐' },
        { label: '作息', content: '固定作息，适度拉伸' },
        { label: '情绪', content: '放松心态，减压增乐' },
        { label: '环境', content: '温暖舒适，避免寒凝' },
        { label: '季节', content: '冬季注意保暖与活动' },
        { label: '习惯', content: '久坐每小时起身活动' }
      ],
      '特禀质': [
        { label: '饮食', content: '避免过敏原，清淡饮食' },
        { label: '运动', content: '循序渐进，增强体质' },
        { label: '作息', content: '规律作息，早睡早起' },
        { label: '情绪', content: '保持愉悦，降低焦虑' },
        { label: '环境', content: '清洁除螨，避花粉尘螨' },
        { label: '季节', content: '花粉季加强防护' },
        { label: '习惯', content: '佩戴口罩，常通风' }
      ],
      '平和质': [
        { label: '饮食', content: '均衡饮食，少油少盐' },
        { label: '运动', content: '适度运动，强身健体' },
        { label: '作息', content: '规律作息，保持充足睡眠' },
        { label: '情绪', content: '心态平和，乐观向上' },
        { label: '环境', content: '清洁明亮，通风良好' },
        { label: '季节', content: '四季顺应，稍作调整' },
        { label: '习惯', content: '坚持好习惯，持续优化' }
      ]
    }
    return presets[type] || presets['平和质']
  },
  buildSubtitle(type) {
    const map = {
      '阳虚质': '畏寒肢冷·代谢缓慢·排泄异常',
      '气虚质': '乏力气短·易汗感冒·声低懒言',
      '阴虚质': '口干心烦·失眠多梦·手足心热',
      '痰湿质': '形体偏胖·困倦黏腻·痰多苔厚',
      '湿热质': '面油口苦·痤疮口臭·汗味较重',
      '气郁质': '情绪抑郁·胸闷多叹·睡眠不安',
      '血瘀质': '肤色晦暗·疼痛固定·舌质紫暗',
      '特禀质': '过敏体质·鼻塞喷嚏·皮肤瘙痒',
      '平和质': '精力充沛·气血调和·体态匀称'
    }
    return map[type] || '生活指南'
  },
  updateUserInfo() {
    const profile = wx.getStorageSync('userProfile') || null
    const name = profile && profile.name ? profile.name : ''
    const id = profile && profile.id ? profile.id : ''
    const avatar = profile && profile.avatar ? profile.avatar : ''
    this.setData({
      userInfo: {
        name,
        id,
        avatar
      }
    })
  }
})
