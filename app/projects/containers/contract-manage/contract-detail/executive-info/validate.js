export default function (getFieldDecorator) {
  return {
    serviceCharge: () => getFieldDecorator('serviceCharge', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择手续费状态'
      }]
    }),

    initialPremium: () => getFieldDecorator('initialPremium', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择首期保费'
      }]
    }),

    contractStatus: () => getFieldDecorator('contractStatus', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择合同状态'
      }]
    }),

    endReason: () => getFieldDecorator('endReason', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择合同结束原因'
      }]
    })
  }
}
