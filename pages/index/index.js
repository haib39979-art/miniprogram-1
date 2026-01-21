function pad2(num) {
  return num < 10 ? `0${num}` : String(num)
}

Page({
  data: {
    isFavorite: false,
    weather: {
      iconUrl: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.png',
      text: '多云',
    },
    date: {
      day: '--',
      month: '--',
      lunar: '冬月初八',
    },
    daily: {
      yi: '喝汤养胃',
      ji: '熬夜伤神',
    },
    herb: {
      name: '三七',
      alias: '金不换',
      imageUrl: '/assets/herb-sanqi.png',
      distribution: '产地分布：主要产于云南、广西等地区',
      feature: '形态特征：高约60cm，根茎短，茎直立，光滑无毛，掌状复叶',
      effect: '功效：外敷止血消肿，跌打及淤血肿痛',
      usage: '用法：可入汤或泡茶，孕期及特殊人群慎用',
    },
    huangli: {
      imageUrl: '/assets/huangli.png',
    },
    todos: [],
  },

  onLoad() {
    const now = new Date()
    const day = String(now.getDate())
    const month = pad2(now.getMonth() + 1)
    this.setData({
      date: {
        ...this.data.date,
        day,
        month,
      },
    })
    this.checkIfFavorite()
  },

  onShow() {
    console.log('Index Page onShow triggered')
    this.loadTodos()
  },

  loadTodos() {
    try {
      const todos = wx.getStorageSync('todos') || []
      console.log('Loaded todos from storage:', todos)
      this.setData({ todos })
    } catch (e) {
      console.error('Failed to load todos:', e)
    }
  },

  checkIfFavorite() {
    const collectedHerbs = wx.getStorageSync('collectedHerbs') || []
    const isFavorite = collectedHerbs.some(h => h.name === this.data.herb.name)
    this.setData({ isFavorite })
  },

  onToggleFavorite() {
    const isFavorite = !this.data.isFavorite
    this.setData({ isFavorite })

    let collectedHerbs = wx.getStorageSync('collectedHerbs') || []
    const currentHerbName = this.data.herb.name

    if (isFavorite) {
      // Add to collection if not already present
      if (!collectedHerbs.some(h => h.name === currentHerbName)) {
        const newHerb = {
          id: Date.now(),
          name: this.data.herb.name,
          alias: this.data.herb.alias,
          imageUrl: this.data.herb.imageUrl,
          day: this.data.date.day,
          month: this.data.date.month,
          lunarDate: this.data.date.lunar,
          yi: this.data.daily.yi,
          ji: this.data.daily.ji,
          origin: this.data.herb.distribution.replace('产地分布：', ''),
          details: [
            { label: '产地', content: this.data.herb.distribution.replace('产地分布：', '') },
            { label: '特征', content: this.data.herb.feature.replace('形态特征：', '') },
            { label: '功效', content: this.data.herb.effect.replace('功效：', '') },
            { label: '用法', content: this.data.herb.usage.replace('用法：', '') }
          ]
        }
        collectedHerbs.unshift(newHerb)
        wx.setStorageSync('collectedHerbs', collectedHerbs)
        wx.showToast({ title: '已收藏', icon: 'success' })
      }
    } else {
      // Remove from collection
      collectedHerbs = collectedHerbs.filter(h => h.name !== currentHerbName)
      wx.setStorageSync('collectedHerbs', collectedHerbs)
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    }
  },

  onOpenMore() {
    wx.showActionSheet({
      itemList: ['分享', '反馈'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.showToast({ title: '请在右上角分享', icon: 'none' })
        }
        if (res.tapIndex === 1) {
          wx.navigateTo({ url: '../logs/logs' })
        }
      },
    })
  },

  onAddTodo() {
    wx.navigateTo({ url: '/pages/new-item/new-item' })
  },

  onTapTodo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/new-item/new-item?id=${id}` })
  },

  onTapWeather() {
    const url = '/pages/weather-detail/weather-detail'
    console.log('Navigating to:', url)
    wx.navigateTo({
      url: url,
      fail: (err) => {
        console.error('Navigation failed (absolute):', err)
        // Try relative path as fallback
        wx.navigateTo({
          url: '../weather-detail/weather-detail',
          fail: (err2) => {
             console.error('Navigation failed (relative):', err2)
             wx.showToast({
               title: '跳转失败: ' + (err.errMsg || err2.errMsg),
               icon: 'none',
               duration: 3000
             })
          }
        })
      }
    })
  },

  onTapTab(e) {
    const key = e.currentTarget.dataset.key
    if (key === 'today') return
    if (key === 'calendar') {
      wx.redirectTo({ url: '/pages/calendar/calendar' })
    } else if (key === 'me') {
      wx.redirectTo({ url: '/pages/me/me' })
    }
  },

  onTapHero() {
    wx.navigateTo({ url: '/pages/detail/detail' })
  },
})
