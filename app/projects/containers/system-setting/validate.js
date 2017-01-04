export default function (getFieldDecorator) {
  return {
    periodicDay: () => getFieldDecorator('periodicDay'),

    expWarning: () => getFieldDecorator('expWarning'),

    contractTemplate: () => getFieldDecorator('contractTemplate', {
      rules: [{
        whitespace: true,
        type: 'array',
        message: '请上传合同附件'
      }],
      valuePropName: 'fileList',
      normalize: e => {
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      getValueFromEvent: (e) => {
        if (!e || !e.fileList) {
          return e
        }
        return e && e.fileList.slice(-1)
      }
    })
  }
}
