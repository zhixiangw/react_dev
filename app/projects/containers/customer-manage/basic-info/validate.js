export default function (getFieldDecorator) {
  return {
    contractCode: () => getFieldDecorator('contractCode', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入合同编号'
      }]
    }),

    contractAttachment: () => getFieldDecorator('contractAttachment', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请上传合同附件'
      }],
      valuePropName: 'fileList',
      normalize: e => {
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      }
    }),

    customerName: () => getFieldDecorator('customerName', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入客户姓名'
      }]
    }),
  }
}
