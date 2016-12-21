export default function (getFieldDecorator) {
  return {
    preNotice: () => getFieldDecorator('preNotice'),

    expWarning: () => getFieldDecorator('expWarning'),

    contractTemplate: () => getFieldDecorator('contractTemplate', {
      rules: [{
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
    })
  }
}
