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
    }),

    fruit: () => getFieldProps('fruit', {
      initialValue: '1',
      rules: [{
        required: true,
        message: '请选择水果'
      }]
    })
  }
}
