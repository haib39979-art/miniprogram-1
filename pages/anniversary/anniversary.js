Page({
  data: {
    daysCount: 0,
    startDate: '2022-08-01', // Format for picker value (YYYY-MM-DD)
    displayDate: '2022.08.01', // Format for display
    statusBarHeight: 20
  },

  onLoad(options) {
    // Get status bar height for custom nav layout
    const sysInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: sysInfo.statusBarHeight
    })

    this.loadDate()
  },

  loadDate() {
    let startDate = wx.getStorageSync('startDate')
    if (!startDate) {
      startDate = '2022-08-01'
      wx.setStorageSync('startDate', startDate)
    }

    // Ensure standard format for calculation and picker
    const stdDate = startDate.replace(/\./g, '-')

    this.calculateDays(stdDate)
  },

  calculateDays(dateStr) {
    const start = new Date(dateStr)
    const now = new Date()
    const diffTime = Math.abs(now - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    this.setData({
      startDate: dateStr,
      displayDate: dateStr.replace(/-/g, '.'),
      daysCount: diffDays
    })
  },

  bindDateChange(e) {
    const newDate = e.detail.value // YYYY-MM-DD
    wx.setStorageSync('startDate', newDate)
    this.calculateDays(newDate)
  },

  onBack() {
    wx.navigateBack()
  }
})