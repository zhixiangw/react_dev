export default function (getFieldProps) {
  return {
    oldPassword: (password) => getFieldProps('oldpassword', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改前密码'
      }, {
        validator: (rule, value, callback) => {
          if (value && value !== password) {
            callback('当期密码错误')
          }
          callback()
        }
      }]
    }),

    newPassword: () => getFieldProps('newpassword', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改后密码'
      }]
    })
  }
}
