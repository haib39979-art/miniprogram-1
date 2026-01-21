
const addresses = [
  "北京市通州区小堡南街与小堡路交叉口正东方130米左右",
  "广东省深圳市南山区粤海街道科技园",
  "河北省廊坊市三河市燕郊镇",
  "上海市浦东新区陆家嘴",
  "四川省甘孜藏族自治州康定市",
  "香港特别行政区中西区",
  "新疆维吾尔自治区乌鲁木齐市天山区",
  "不知名的地方"
];

const regex = /^(.*?[省自治区]|.*?行政区|.*?市)?(.*?[市州地区盟]|.*?自治州)?(.*?[区县市旗])?/;

addresses.forEach(addr => {
  const match = addr.match(regex);
  if (match) {
    const result = (match[1]||'') + (match[2]||'') + (match[3]||'');
    console.log(`Original: ${addr}\nResult:   ${result}\n`);
  } else {
    console.log(`Original: ${addr}\nResult:   (No match)\n`);
  }
});
