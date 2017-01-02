export default function (getFieldDecorator) {
  return {
    role: () => getFieldDecorator('role', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择角色'
      }]
    }),

    account: () => getFieldDecorator('account', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账号'
      }]
    }),

    name: () => getFieldDecorator('name', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入账号名称'
      }]
    }),

    contact: () => getFieldDecorator('contact', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入联系方式'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的联系方式')
          }
          callback()
        }
      }]
    })
  }
}
