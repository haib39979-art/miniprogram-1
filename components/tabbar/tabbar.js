Component({
  properties: {
    active: {
      type: String,
      value: 'calendar'
    }
  },
  methods: {
    onTapTab(e) {
      const key = e.currentTarget.dataset.key
      if (key === this.data.active) return

      if (key === 'calendar') {
        wx.redirectTo({ url: '/pages/index/index' })
      } else if (key === 'recipe') {
        wx.redirectTo({ url: '/pages/recipe/recipe' })
      } else if (key === 'me') {
        wx.redirectTo({ url: '/pages/me/me' })
      }
    }
  }
})