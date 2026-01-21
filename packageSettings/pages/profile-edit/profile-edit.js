Page({
  data: {
    userInfo: {
      name: 'Beau-Temps',
      id: '3225141371',
      gender: '女',
      phone: '13713535418',
      birthday: '2007-08-18',
      region: '北京',
      occupation: '学生',
      constitution: '待测试'
    }
  },
  onLoad() {
    // Usually fetch user data here
  },
  onTapName() { console.log('Tap Name'); },
  onTapId() { console.log('Tap ID'); },
  onTapGender() { console.log('Tap Gender'); },
  onTapPhone() { console.log('Tap Phone'); },
  onTapBirthday() { console.log('Tap Birthday'); },
  onTapRegion() { console.log('Tap Region'); },
  onTapOccupation() { console.log('Tap Occupation'); },
  onTapConstitution() { console.log('Tap Constitution'); }
})