Page({
  data: {
    title: '',
    content: '',
    isAllDay: true,
    isRepeat: true,
    startDate: '2025-10-09',
    startTime: '12:00',
    endDate: '2026-01-08',
    endTime: '12:00',
    travelTime: '5分钟'
  },

  onLoad(options) {

  },

  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value })
  },

  onAllDayChange(e) {
    this.setData({ isAllDay: e.detail.value })
  },

  onRepeatChange(e) {
    this.setData({ isRepeat: e.detail.value })
  },

  bindStartDateChange(e) {
    this.setData({ startDate: e.detail.value })
  },
  
  bindStartTimeChange(e) {
    this.setData({ startTime: e.detail.value })
  },

  bindEndDateChange(e) {
    this.setData({ endDate: e.detail.value })
  },

  bindEndTimeChange(e) {
    this.setData({ endTime: e.detail.value })
  }
})