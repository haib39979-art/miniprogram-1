const aiService = require('../../services/ai.js');

Page({
  data: {
    questions: [
      { id: 'q1', text: '您是否手脚冰凉？' },
      { id: 'q2', text: '您是否容易疲乏、精神不振？' },
      { id: 'q3', text: '您是否容易出汗（稍微活动就出汗）？' },
      { id: 'q4', text: '您是否感到口干、口苦？' },
      { id: 'q5', text: '您是否面部或鼻部容易油腻？' },
      { id: 'q6', text: '您是否容易失眠或多梦？' },
      { id: 'q7', text: '您是否大便黏滞不爽或便秘？' },
      { id: 'q8', text: '您是否容易过敏（如鼻塞、皮肤痒）？' },
      { id: 'q9', text: '您是否性格内向、容易抑郁或焦虑？' },
      { id: 'q10', text: '您对气候变化的适应能力是否较差？' }
    ],
    answers: {},
    loading: false,
    result: null,
    loadingQuestions: true
  },

  onLoad(options) {
    this.loadQuestions()
  },

  async loadQuestions() {
    try {
      const questions = await aiService.generateConstitutionQuestions()
      const answers = {}
      questions.forEach(q => answers[q.id] = null)
      this.setData({ questions, answers, loadingQuestions: false })
    } catch (error) {
      const answers = {}
      this.data.questions.forEach(q => answers[q.id] = null)
      this.setData({ answers, loadingQuestions: false })
    }
  },

  selectOption(e) {
    const { qid, val } = e.currentTarget.dataset;
    this.setData({
      [`answers.${qid}`]: val
    });
  },

  async submitTest() {
    // Check if all questions are answered
    const { answers, questions } = this.data;
    const unanswered = questions.find(q => !answers[q.id]);
    
    if (unanswered) {
      wx.showToast({
        title: '请回答所有问题',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    try {
      // Construct prompt from answers
      const answerText = questions.map(q => `${q.text}: ${this.getAnswerText(answers[q.id])}`).join('\n');
      
      const result = await aiService.analyzeConstitution(answerText);
      
      if (result) {
        this.setData({ result });
        wx.setStorageSync('lastTizhiResult', result);
        const userProfile = wx.getStorageSync('userProfile') || {};
        userProfile.constitution = result.type;
        wx.setStorageSync('userProfile', userProfile);
        wx.setStorageSync('tizhiDetail', result);
      }
    } catch (error) {
      console.error('Test failed:', error);
      const local = this.localAnalyze(answers)
      if (local) {
        this.setData({ result: local });
        wx.setStorageSync('lastTizhiResult', local);
        const userProfile = wx.getStorageSync('userProfile') || {};
        userProfile.constitution = local.type;
        wx.setStorageSync('userProfile', userProfile);
        wx.setStorageSync('tizhiDetail', local);
        wx.showToast({
          title: 'AI失败，已本地判定',
          icon: 'none'
        });
      } else {
        wx.showToast({
          title: error?.message || '分析失败，请重试',
          icon: 'none'
        });
      }
    } finally {
      this.setData({ loading: false });
    }
  },

  getAnswerText(val) {
    const map = { 'yes': '是', 'sometimes': '有时', 'no': '否' };
    return map[val] || val;
  },

  localAnalyze(answers) {
    const score = {
      '平和质': 0,
      '气虚质': 0,
      '阳虚质': 0,
      '阴虚质': 0,
      '痰湿质': 0,
      '湿热质': 0,
      '气郁质': 0,
      '血瘀质': 0,
      '特禀质': 0
    }
    if (answers.q1 === 'yes') score['阳虚质'] += 2
    if (answers.q2 === 'yes') score['气虚质'] += 2
    if (answers.q3 === 'yes') score['气虚质'] += 1
    if (answers.q4 === 'yes') score['阴虚质'] += 2
    if (answers.q5 === 'yes') { score['湿热质'] += 2; score['痰湿质'] += 1 }
    if (answers.q6 === 'yes') score['阴虚质'] += 1
    if (answers.q7 === 'yes') { score['痰湿质'] += 2; score['阴虚质'] += 1 }
    if (answers.q8 === 'yes') score['特禀质'] += 3
    if (answers.q9 === 'yes') score['气郁质'] += 2
    if (answers.q10 === 'yes') { score['气虚质'] += 1; score['阳虚质'] += 1 }
    const type = Object.keys(score).reduce((a,b)=> score[a] >= score[b] ? a : b)
    if (!type || score[type] === 0) return null
    const templates = {
      '阳虚质': {
        description: '畏寒肢冷，精神不振，代谢偏慢，易腹泻或水肿。',
        advice: '宜温补，常食羊肉生姜等，注意保暖与适度运动，少食生冷。'
      },
      '气虚质': {
        description: '容易乏力、气短出汗，抵抗力偏弱，语声低弱。',
        advice: '宜健脾益气，多休息，适度运动，饮食清淡，少劳累。'
      },
      '阴虚质': {
        description: '口干咽燥、心烦失眠、手足心热，容易便秘。',
        advice: '宜滋阴清补，规律作息，避免熬夜与辛辣煎炸食品。'
      },
      '痰湿质': {
        description: '形体肥胖、困倦黏腻、痰多便黏，舌苔厚腻。',
        advice: '宜化痰祛湿，多运动少甜腻，饮食清淡，作息规律。'
      },
      '湿热质': {
        description: '面油口苦、汗味重，易生痘痘或口腔溃疡。',
        advice: '宜清热祛湿，少辛辣油炸，多喝温水，保证睡眠。'
      },
      '气郁质': {
        description: '多忧多虑、情绪低落、胸闷叹气，睡眠不安。',
        advice: '宜疏肝解郁，多户外与社交，规律运动与作息。'
      },
      '血瘀质': {
        description: '肤色晦暗、疼痛固定、舌质紫暗或有瘀点。',
        advice: '宜活血化瘀，适度有氧运动，少久坐，饮食清淡。'
      },
      '特禀质': {
        description: '过敏体质，易鼻塞喷嚏或皮肤瘙痒，对花粉尘螨敏感。',
        advice: '宜增强体质，避敏原，规律作息，加强户外锻炼。'
      },
      '平和质': {
        description: '精力充沛、体态适中、睡眠良好、抵抗力正常。',
        advice: '保持均衡饮食与适度运动，规律生活，心态平和。'
      }
    }
    return { type, description: templates[type].description, advice: templates[type].advice }
  },

  finishTest() {
    if (this.data.result) {
      // Update global user profile or specific storage
      const userProfile = wx.getStorageSync('userProfile') || {};
      userProfile.constitution = this.data.result.type;
      wx.setStorageSync('userProfile', userProfile);
      
      // Also save the full result for detail pages
      wx.setStorageSync('tizhiDetail', this.data.result);

      wx.showToast({
        title: '更新成功',
        icon: 'success'
      });

      setTimeout(() => {
        wx.switchTab({ url: '/pages/me/me' });
      }, 1200);
    }
  }
});
