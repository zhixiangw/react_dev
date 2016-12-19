export default function (getFieldDecorator) {
  return {
    account: () => getFieldDecorator('account', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账户名'
      }]
    }),

    password: () => getFieldDecorator('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入密码'
      }]
    })
  }
}
