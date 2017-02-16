export default function (getFieldDecorator) {
  return {
    username: () => getFieldDecorator('username', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账户名'
      }, {
        validator: (rule, value, callback) => {
          if (value && value !== 'yjbadmin') {
            callback('请输入正确的账号')
          }
          callback()
        }
      }]
    }),

    password: () => getFieldDecorator('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入密码'
      }, {
        validator: (rule, value, callback) => {
          if (value && value !== 'Yjb@2017') {
            callback('请输入正确的密码')
          }
          callback()
        }
      }]
    })
  }
}
