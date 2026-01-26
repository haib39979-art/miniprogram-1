Page({
  data: {
    type: '阳虚质',
    subtitle: '畏寒肢冷·代谢缓慢·排泄异常',
    guides: [
      {
        title: '日常调理',
        sections: [
          {
            title: '调节饮食',
            content: [
              '·宜食温补食物：如羊肉，牛肉，韭菜，核桃，栗子，生姜，肉桂等，可炖煮当归生姜羊肉汤，韭菜炒核桃仁等药膳',
              '·忌食生冷寒凉：少食西瓜，梨，冷饮等，夏季也需减少寒凉食物摄入，以防损伤脾胃阳气',
              '·烹饪方式：多用炖，煮，焖等方式，少用凉拌或生食'
            ]
          },
          {
            title: '运动与作息',
            content: [
              '·适度运动：选择慢跑，太极拳，八段锦等温和运动，每日30分钟以上，以微微出汗为度，避免过度消耗阳气',
              '·保暖避寒：注意腰腹，下肢及关节保暖，避免空调直吹，夏季减少露宿或久居树荫',
              '·作息规律：早睡早起，避免晚于23点睡觉，睡前排空小便以减少夜尿'
            ]
          }
        ]
      },
      {
        title: '日常调理',
        sections: [
          {
            title: '日常外治',
            content: [
              '·艾灸与穴位按摩：艾灸关元穴（补元气），命门穴（温肾阳），足三里（健脾胃）等，每周2-3次；或按摩气海，涌泉等穴位',
              '·药浴与泡脚：用艾叶，生姜煮水泡脚，促进血液循环，驱散寒气'
            ]
          }
        ],
        extraIcon: '穴位图'
      },
      {
        title: '日常调理',
        sections: [
          {
            title: '情绪与环境调适',
            content: [
              '·情绪管理：阳虚者易情绪低落，可通过社交，听激昂音乐调节情绪，避免忧思过滤',
              '·环境选择：居住环境保持温暖干燥，避免潮湿阴冷，冬季可适当晒太阳以“借阳气生发”'
            ]
          },
          {
            title: '季节调节',
            content: [
              '·春夏养阳：利用自然阳气升发的季节，多晒背，适度运动，可艾灸或贴敷温阳药物（如“三伏天”）',
              '·秋冬防寒：加强保暖，减少外出受寒，，饮食温补食材如羊肉，桂圆'
            ]
          }
        ]
      }
    ]
  },
  onLoad(options) {
    const detail = wx.getStorageSync('tizhiDetail') || null
    const type = detail?.type || options.type || this.data.type
    const subtitle = options.subtitle ? decodeURIComponent(options.subtitle) : this.buildSubtitle(type)
    const guides = this.buildGuides(type)
    this.setData({
      type,
      subtitle,
      guides
    })
  },
  onBack() {
    wx.navigateBack()
  },
  onTapExtra(e) {
    const type = e.currentTarget.dataset.type
    if (type === '穴位图') {
        wx.navigateTo({
            url: '/packageHealth/pages/acupoints/acupoints'
        })
    }
  },
  buildGuides(type) {
    const guides = {
      '阳虚质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·宜温补食材：羊肉、牛肉、韭菜、桂圆、生姜等',
                '·少食寒凉：西瓜、梨、冷饮、冰品',
                '·烹饪以炖煮为主，避免生冷凉拌'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·温和运动：慢跑、八段锦、太极等',
                '·早睡早起，避免熬夜与过度劳累',
                '·外出注意腰腹与下肢保暖'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·艾灸关元、命门、足三里等穴位',
                '·生姜艾叶泡脚，促进循环驱寒',
                '·腹部热敷，改善畏寒与腹泻'
              ]
            }
          ],
          extraIcon: '穴位图'
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·保持愉悦心情，避免情绪低落',
                '·居住环境干燥温暖，减少潮湿阴冷',
                '·冬季适当晒太阳以借阳气'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·春夏养阳，适度运动并注意出汗',
                '·秋冬重保暖，减少露宿与久居阴冷'
              ]
            }
          ]
        }
      ],
      '气虚质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·健脾益气：山药、莲子、黄豆、红枣',
                '·少油少甜，避免暴饮暴食',
                '·饭食温热，避免生冷刺激'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·循序渐进运动，避免大强度消耗',
                '·保证睡眠，午后可小憩',
                '·工作学习间歇起身活动'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·按揉足三里、气海以助元气',
                '·温水泡脚，促进气血运行',
                '·适度拉伸舒缓疲劳'
              ]
            }
          ],
          extraIcon: '穴位图'
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·减少压力，劳逸结合',
                '·环境通风采光好，少久坐久处密闭',
                '·避免过度焦虑与情绪波动'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·春秋加强调理，提升抵抗力',
                '·冬季注意保暖，避免受寒感冒'
              ]
            }
          ]
        }
      ],
      '阴虚质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·滋阴清补：银耳、百合、鸭肉、莲子',
                '·少辛辣煎炸与燥热食物',
                '·多饮温水，避免冷饮刺激'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·温和运动为主，避免夜间剧烈运动',
                '·规律作息，避免熬夜与久视',
                '·睡前远离刺激性饮品'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·温水足浴放松，避免过热',
                '·适度按摩肩颈与背部',
                '·室内保持舒适湿度'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·静心养性，减少烦躁与紧张',
                '·室内加湿，避免干燥环境',
                '·适量户外活动，避免高温曝晒'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·夏季清补为主，少辛辣',
                '·冬季避免大补燥热，宜温和'
              ]
            }
          ]
        }
      ],
      '痰湿质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·清淡少甜，减少油腻与奶茶甜品',
                '·多蔬菜粗粮，控制晚餐量',
                '·避免夜宵与久坐后进食'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·快走慢跑或有氧运动30分钟以上',
                '·避免久坐，饭后适度散步',
                '·保证睡眠，减少熬夜'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·温热泡脚，帮助祛湿',
                '·适度出汗排湿，避免过度',
                '·居家保持通风干燥'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·保持积极心态，增强执行力',
                '·环境干燥通风，避免潮湿',
                '·减少甜食与久卧久坐习惯'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·梅雨季重祛湿，减少湿冷外出',
                '·冬季保持运动与体重管理'
              ]
            }
          ]
        }
      ],
      '湿热质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·清热祛湿：苦瓜、绿豆、冬瓜等',
                '·少辣少酒少油炸，避免烧烤',
                '·多饮温水，减少含糖饮料'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·适度出汗，避免闷热久坐',
                '·保持清爽，运动后及时清洁',
                '·规律作息，避免熬夜上火'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·温水清洁皮肤，减少油脂堆积',
                '·避免高温环境久待',
                '·必要时保持床品干爽'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·少怒少躁，保持心平气和',
                '·居住环境降温除湿',
                '·减少辛辣刺激与重口味'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·夏季清热为主，注意补水',
                '·秋季防燥，避免过度辛辣'
              ]
            }
          ]
        }
      ],
      '气郁质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·清淡为主，多蔬果与高纤食物',
                '·少油腻刺激，避免过度咖啡因',
                '·三餐规律，避免情绪性进食'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·多户外运动与社交活动',
                '·规律作息，减少熬夜情绪波动',
                '·练习拉伸与深呼吸'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·按揉太冲、内关等穴位',
                '·舒缓拉伸放松肩颈',
                '·适当冥想或音乐放松'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·音乐减压与情绪表达',
                '·保持社交沟通，减少封闭',
                '·营造明亮舒适的生活环境'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·春季重在疏肝理气',
                '·夏季适度运动，注意补水'
              ]
            }
          ]
        }
      ],
      '血瘀质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·活血食材：黑木耳、山楂、红枣',
                '·少盐少油，避免高脂高糖',
                '·温热饮食，避免过冷刺激'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·规律有氧运动促进循环',
                '·久坐每小时起身活动',
                '·睡前热敷或拉伸'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·热敷按摩肩颈与腰背',
                '·适当泡脚与按揉穴位',
                '·避免寒凉久处'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·舒缓情绪，减少紧张与压抑',
                '·室内通风，保持舒适温度',
                '·减少长期高压工作'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·冬季保暖促循环',
                '·春季适动助气血生发'
              ]
            }
          ]
        }
      ],
      '特禀质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·避免过敏食物，记录过敏史',
                '·清淡饮食，减少刺激性调料',
                '·多饮温水，增强代谢'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·循序渐进增强体质',
                '·规律作息，避免熬夜',
                '·户外锻炼选择空气清新时段'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·防尘防敏，居家定期清洁',
                '·床品常洗晒，减少尘螨',
                '·外出季节性佩戴口罩'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·保持愉快心情，减少刺激',
                '·避免吸烟与二手烟环境',
                '·居住环境通风清洁'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·花粉季加强防护，减少户外暴露',
                '·冬季保暖以防诱发过敏'
              ]
            }
          ]
        }
      ],
      '平和质': [
        {
          title: '日常调理',
          sections: [
            {
              title: '饮食要点',
              content: [
                '·均衡饮食，荤素搭配',
                '·少油少盐，规律三餐',
                '·多饮温水，少含糖饮品'
              ]
            },
            {
              title: '运动作息',
              content: [
                '·适度运动，保持体能',
                '·规律作息，睡眠充足',
                '·久坐时注意起身活动'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '外治建议',
              content: [
                '·日常拉伸与放松',
                '·适度按摩缓解疲劳',
                '·保持良好作息习惯'
              ]
            }
          ]
        },
        {
          title: '日常调理',
          sections: [
            {
              title: '情绪环境',
              content: [
                '·心态平和，保持愉悦',
                '·环境清爽通风，适度日晒',
                '·合理安排工作与休息'
              ]
            },
            {
              title: '季节调节',
              content: [
                '·四季顺应，适度调整饮食与作息',
                '·换季注意保暖与防寒'
              ]
            }
          ]
        }
      ]
    }
    return this.appendAcupressure(guides[type] || guides['平和质'])
  },
  appendAcupressure(cards) {
    return cards.map(card => {
      const sections = card.sections || []
      const index = sections.findIndex(section => section.title === '外治建议')
      if (index === -1) return card
      const nextSections = sections.slice()
      nextSections.splice(index + 1, 0, {
        title: '穴位按摩',
        content: [
          '·按揉足三里、合谷、三阴交',
          '·每次3-5分钟，微酸胀为度'
        ]
      })
      return Object.assign({}, card, { sections: nextSections })
    })
  },
  buildSubtitle(type) {
    const map = {
      '阳虚质': '畏寒肢冷·代谢缓慢·排泄异常',
      '气虚质': '乏力气短·易汗感冒·声低懒言',
      '阴虚质': '口干心烦·失眠多梦·手足心热',
      '痰湿质': '形体偏胖·困倦黏腻·痰多苔厚',
      '湿热质': '面油口苦·痤疮口臭·汗味较重',
      '气郁质': '情绪抑郁·胸闷多叹·睡眠不安',
      '血瘀质': '肤色晦暗·疼痛固定·舌质紫暗',
      '特禀质': '过敏体质·鼻塞喷嚏·皮肤瘙痒',
      '平和质': '精力充沛·气血调和·体态匀称'
    }
    return map[type] || '生活指南'
  }
})
