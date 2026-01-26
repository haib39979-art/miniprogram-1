const API_KEY = '90e6fb96-0412-4bec-afdf-c0ba019aedd2';
const API_URL_IMAGE = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const API_URL_CHAT = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
// Vision endpoint from user curl (using /responses to match their successful test)
const API_URL_VISION = 'https://ark.cn-beijing.volces.com/api/v3/responses'; 

const MODEL_IMAGE = 'doubao-seedream-4-0-250828';
const MODEL_VISION = 'doubao-seed-1-6-flash-250828';
// Using the same flash model for text chat as it's fast and capable
const MODEL_CHAT = 'doubao-seed-1-6-flash-250828'; 

/**
 * Call Volcengine Ark API to generate image
 * @param {string} prompt - The prompt for image generation
 * @returns {Promise<string>} - Resolves with the image URL
 */
function generateImage(prompt) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_URL_IMAGE,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        model: MODEL_IMAGE,
        prompt: prompt,
        size: '2K', 
        sequential_image_generation: 'disabled',
        response_format: 'url',
        stream: false,
        watermark: true
      },
      success: (res) => {
        console.log('Image API Response:', res);
        if (res.statusCode === 200 && res.data && res.data.data && res.data.data.length > 0) {
          resolve(res.data.data[0].url);
        } else {
          console.error('Image API Error:', res);
          reject(new Error(res.data?.error?.message || 'Image generation failed'));
        }
      },
      fail: (err) => {
        console.error('Request Failed:', err);
        reject(err);
      }
    });
  });
}

/**
 * Call Volcengine Ark Vision API to analyze image
 * @param {string} imageUrl - The URL of the image to analyze
 * @param {string} prompt - The text prompt/question about the image
 * @returns {Promise<string>} - Resolves with the AI's response text
 */
function analyzeImage(imageUrl, prompt) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_URL_VISION,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        model: MODEL_VISION,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_image",
                image_url: imageUrl
              },
              {
                type: "input_text",
                text: prompt
              }
            ]
          }
        ]
      },
      success: (res) => {
        console.log('Vision API Response:', res);
        if (res.statusCode === 200 && res.data) {
           if (res.data.choices && res.data.choices.length > 0 && res.data.choices[0].message) {
             resolve(res.data.choices[0].message.content);
           } else {
             resolve(JSON.stringify(res.data));
           }
        } else {
          console.error('Vision API Error:', res);
          reject(new Error(res.data?.error?.message || 'Vision analysis failed'));
        }
      },
      fail: (err) => {
        console.error('Request Failed:', err);
        reject(err);
      }
    });
  });
}

/**
 * Call Volcengine Ark Chat API for text generation
 * @param {string} systemPrompt - System instruction
 * @param {string} userPrompt - User input
 * @returns {Promise<string>} - Resolves with the AI's response text
 */
function chat(systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: API_URL_CHAT,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        model: MODEL_CHAT,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      },
      success: (res) => {
        console.log('Chat API Response:', res);
        if (res.statusCode === 200 && res.data && res.data.choices && res.data.choices.length > 0) {
          resolve(res.data.choices[0].message.content);
        } else {
          console.error('Chat API Error:', res);
          reject(new Error(res.data?.error?.message || 'Chat generation failed'));
        }
      },
      fail: (err) => {
        console.error('Chat API Network Error:', err);
        reject(err);
      }
    });
  });
}

function extractJson(text) {
  if (!text) return null
  const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim()
  try {
    return JSON.parse(cleaned)
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (match) {
      try {
        return JSON.parse(match[0])
      } catch (err) {}
    }
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/)
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[0])
      } catch (err) {}
    }
  }
  return null
}

async function generateConstitutionQuestions() {
  const systemPrompt = `你是专业中医体质测试题的设计专家。
请生成10道用于体质辨识的问题。
要求：
1. 每题必须是可回答的问句。
2. 必须覆盖不同体质的典型症状（气虚/阳虚/阴虚/痰湿/湿热/气郁/血瘀/特禀/平和）。
3. 返回格式必须是纯JSON数组，不要包含markdown格式标记。
4. 数组元素结构如下：
[
  {"id":"q1","text":"问题内容"},
  ...
]`;
  const userPrompt = '请生成体质测试题。';
  const jsonStr = await chat(systemPrompt, userPrompt);
  const questions = extractJson(jsonStr)
  if (Array.isArray(questions) && questions.length > 0) {
    return questions;
  }
  throw new Error('Invalid questions format');
}

async function analyzeConstitution(answerText) {
  const systemPrompt = `你是中医体质辨识专家。
请根据用户回答，判断其主要体质类型，并给出简短特征与调理建议。
要求：
1. 体质类型必须是以下之一：平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、气郁质、血瘀质、特禀质。
2. 返回格式必须是纯JSON，不要包含markdown格式标记。
3. JSON结构如下：
{
  "type": "体质类型",
  "description": "体质特征（20-50字）",
  "advice": "调理建议（30-80字）"
}`;
  const userPrompt = `用户回答如下：\n${answerText}`;
  const jsonStr = await chat(systemPrompt, userPrompt);
  const result = extractJson(jsonStr)
  if (result && result.type) {
    return result;
  }
  throw new Error('Invalid result format');
}

/**
 * Generate daily herb content (Text + Image)
 * @param {Object} currentHerb - The current herb to avoid repetition
 * @returns {Promise<Object>} - The new herb object
 */
async function generateDailyHerb(currentHerbName) {
  const systemPrompt = `你是一个精通中国传统中药材的专家。
请推荐一味不同于"${currentHerbName || '三七'}"的常见中药材。
要求：
1. 必须是真实的植物类中药材。
2. 返回格式必须是纯JSON，不要包含markdown格式标记。
3. JSON结构如下：
{
  "name": "药材名",
  "alias": "别名",
  "distribution": "产地分布：xxxx",
  "feature": "形态特征：xxxx (简练描述)",
  "effect": "功效：xxxx (简练描述)",
  "usage": "用法：xxxx (简练描述)",
  "yi": "宜xx (4个字)",
  "ji": "忌xx (4个字)"
}`;

  const userPrompt = "请推荐今日的每日一草。";

  try {
    // 1. Get Text Data
    const jsonStr = await chat(systemPrompt, userPrompt);
    // Clean up potential markdown code blocks if any
    const cleanJsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
    const herbData = JSON.parse(cleanJsonStr);

    // 2. Generate Image
    // Prompt optimized for white background illustration
    const imagePrompt = `中国传统中药材，${herbData.name}，${herbData.feature}，单体植物插画，纯白背景，无背景，去掉背景，主体突出，极简主义，水彩风格，高品质，细节丰富，自然光`;
    
    let imageUrl = '/assets/herb-sanqi.png'; // Fallback
    try {
      imageUrl = await generateImage(imagePrompt);
    } catch (imgErr) {
      console.error('Image generation failed, using fallback', imgErr);
    }

    return {
      ...herbData,
      imageUrl
    };

  } catch (err) {
    console.error('Daily Herb Generation Failed:', err);
    throw err;
  }
}

module.exports = {
  generateImage,
  analyzeImage,
  chat,
  generateDailyHerb,
  generateConstitutionQuestions,
  analyzeConstitution
};
