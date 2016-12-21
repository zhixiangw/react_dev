export default function (getFieldProps) {
  return {
    oldPassword: () => getFieldProps('oldPassword', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改前密码'
      }]
    }),

    newPassword: () => getFieldProps('newPassword', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入修改后密码'
      }]
    })
  }
}
