export default function (getFieldProps) {
  return {
    account: () => getFieldProps('account', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账户名'
      }]
    }),

    password: () => getFieldProps('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入密码'
      }]
    })
  }
}
