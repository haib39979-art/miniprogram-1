Page({
  data: {
    id: null,
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
    if (options.id) {
      this.loadTodo(options.id)
    }
  },

  loadTodo(id) {
    const todos = wx.getStorageSync('todos') || []
    const todo = todos.find(t => t.id == id)
    if (todo) {
      // Parse time if possible or keep existing defaults
      // For simplicity, we just load title and content
      this.setData({
        id: todo.id,
        title: todo.text,
        content: todo.content
      })
      wx.setNavigationBarTitle({
        title: '编辑事项'
      })
    }
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
  },

  onConfirm() {
    const { title, content, startDate, startTime, endDate, endTime, isAllDay } = this.data
    
    // Basic validation
    if (!title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }

    const newTodo = {
      id: Date.now(),
      text: title,
      content: content,
      time: isAllDay ? '全天' : `${startDate} ${startTime}`,
      completed: false
    }

    // Save to storage
    let todos = wx.getStorageSync('todos') || []
    if (!Array.isArray(todos)) {
      todos = []
    }
    todos.unshift(newTodo)
    wx.setStorageSync('todos', todos)
    console.log('Saved new todo to storage. Total todos:', todos.length)

    wx.showToast({
      title: '已添加',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})