export default function (getFieldProps) {
  return {
    oldPassword: (password, md5) => getFieldProps('oldPassword', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改前密码'
      }, {
        validator: (rule, value, callback) => {
          if (value && md5(value) !== password) {
            callback('当期密码错误')
          }
          callback()
        }
      }]
    }),

    password: () => getFieldProps('password', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改后密码'
      }]
    })
  }
}
