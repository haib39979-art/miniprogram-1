Page({
  data: {
    recipe: {
      name: '羊肚菌山药汤',
      imageUrl: '/assets/recipe-yangdujun.png', 
      description: 'Morel mushroom and yam soup',
      ingredients: [
        { name: '排骨', amount: '400g' }, 
        { name: '羊肚菌', amount: '8个' },
        { name: '铁棍山药', amount: '200g' },
        { name: '红枣', amount: '5颗' },
        { name: '枸杞', amount: '10粒' },
        { name: '姜', amount: '3片' },
        { name: '盐', amount: '适量' },
        { name: '胡椒粉', amount: '适量' }
      ],
      steps: [
        '步骤1: 羊肚菌用温水加1勺面粉浸泡20分钟，轻柔去泥沙，保留泡菌水，剪去根部硬蒂',
        '步骤2: 推荐砂锅，羊肚菌，泡菌水，肉类，姜片，红枣入锅，加足量开水：大火炖40分钟后加山药，在出锅前5分钟加枸杞，盐，胡椒粉调味'
      ]
    }
  },

  onLoad(options) {
    // In a real app, you would fetch details based on options.id
  },

  onBack() {
    wx.navigateBack()
  },

  onPreviewImage() {
    wx.previewImage({
      urls: [this.data.recipe.imageUrl],
      current: this.data.recipe.imageUrl
    })
  }
})