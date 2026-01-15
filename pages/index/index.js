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
  },

  onToggleFavorite() {
    this.setData({ isFavorite: !this.data.isFavorite })
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
    wx.showToast({ title: '后续接入新增事项', icon: 'none' })
  },

  onTapTab(e) {
    const key = e.currentTarget.dataset.key
    if (key === 'today') return
    wx.showToast({ title: '后续接入页面跳转', icon: 'none' })
  },
})
