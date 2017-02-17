export default function (getFieldDecorator) {
  return {
    username: () => getFieldDecorator('username', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入姓名'
      }]
    }),

    accountName: () => getFieldDecorator('accountName', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账号'
      }]
    }),

    password: () => getFieldDecorator('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入密码'
      }]
    }),

    phoneNumber: () => getFieldDecorator('phoneNumber', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入手机号码'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的手机号码')
          }
          callback()
        }
      }]
    })
  }
}