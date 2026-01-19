Page({
  data: {
    articles: [
      {
        id: 1,
        title: '如何设置高强度密码',
        summary: '密码设置建议：混合使用大小写字母、数字和符号，避免使用生日等简单信息。',
        date: '2025-01-15'
      },
      {
        id: 2,
        title: '防范网络诈骗指南',
        summary: '警惕陌生来电和短信，不轻易点击不明链接，不向陌生人透露验证码。',
        date: '2025-01-10'
      },
      {
        id: 3,
        title: '个人信息保护小贴士',
        summary: '定期检查账号登录设备，及时解绑废弃账号，注意隐私政策授权。',
        date: '2025-01-05'
      },
      {
        id: 4,
        title: '账号被盗急救措施',
        summary: '发现异常立即冻结账号，修改密码，并联系客服申诉找回。',
        date: '2024-12-28'
      }
    ]
  },
  onTapArticle(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在加载详情...',
      icon: 'none'
    });
  }
})