export default function (getFieldDecorator) {
  return {
    name: () => getFieldDecorator('name', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入单身狗名称'
      }]
    }),

    sex: () => getFieldDecorator('sex', {
      initialValue: 1,
      rules: [{
        required: true,
        whitespace: true,
        type: 'number',
        message: '请选择单身狗性别'
      }]
    }),

    age: () => getFieldDecorator('age', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入单身狗狗龄'
      }]
    }),

    mobile: () => getFieldDecorator('mobile', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入单身狗手机'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的单身狗手机')
          }
          callback()
        }
      }]
    }),

    personalSign: () => getFieldDecorator('personal_sign', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入单身狗个性签名'
      }]
    }),

    selfPrice: () => getFieldDecorator('self_price', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入单身狗自我估价'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{1,4}(\.\d{1,2})?$/.test(value)) {
            callback('最多就值这个xxxx.xx价格,别想多了，单！身！狗！')
          }
          callback()
        }
      }]
    }),

    isPotential: () => getFieldDecorator('is_potential', {
      initialValue: 0,
      rules: [{
        required: true,
        whitespace: true,
        type: 'number',
        message: '请选择是否潜在单身狗'
      }]
    }),

    isMember: () => getFieldDecorator('is_member', {
      initialValue: 0,
      rules: [{
        required: true,
        whitespace: true,
        type: 'number',
        message: '请选择是否单身狗会员'
      }]
    }),

    image: () => getFieldDecorator('image', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请点击上传单身狗头像'
      }],
      valuePropName: 'fileList',
      normalize: e => {
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      getValueFromEvent: (e) => {
        if (!e || !e.fileList) {
          return e
        }
        return e && e.fileList.slice(-1)
      }
    })
  }
}
