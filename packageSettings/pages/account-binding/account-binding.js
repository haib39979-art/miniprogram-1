Page({
  data: {
    bindings: [
      { id: 'wechat', name: '微信', status: '已绑定' },
      { id: 'qq', name: 'QQ', status: '未绑定' },
      { id: 'apple', name: 'Apple ID', status: '未绑定' }
    ]
  },
  onTapItem(e) {
    const id = e.currentTarget.dataset.id;
    const index = this.data.bindings.findIndex(b => b.id === id);
    if (index === -1) return;

    const item = this.data.bindings[index];
    const newStatus = item.status === '已绑定' ? '未绑定' : '已绑定';
    
    // Toggle binding status for demo
    const key = `bindings[${index}].status`;
    
    this.setData({
      [key]: newStatus
    });
    
    wx.showToast({
      title: newStatus === '已绑定' ? '绑定成功' : '解绑成功',
      icon: 'success'
    });
  }
})