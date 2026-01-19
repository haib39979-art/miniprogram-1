Page({
  data: {
    herb: {}
  },
  onLoad(options) {
    // Simulate fetching data or use passed data
    // For now, we use static data similar to index page
    this.setData({
      herb: {
        name: '三七',
        alias: '金不换',
        imageUrl: '/assets/herb-sanqi.png',
        distribution: '产地分布：主要产于云南、广西等地区',
        feature: '形态特征：高约60cm，根茎短，茎直立，光滑无毛，掌状复叶',
        effect: '功效：外敷止血消肿，跌打及淤血肿痛',
        usage: '用法：可入汤或泡茶，孕期及特殊人群慎用',
        intro: '三七，中药名。主产于云南文山州，故名文山三七，又名文州三七，为五加科植物三七的干燥根和根茎。秋季花开前采挖，洗净，分开主根、支根及根茎，干燥。支根称为“筋条”，根茎称为“剪口”。'
      }
    })
  }
})