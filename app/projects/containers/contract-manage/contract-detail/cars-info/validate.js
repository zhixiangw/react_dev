export default function (getFieldDecorator) {
  return {
    no: () => getFieldDecorator('no', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入保单号'
      }]
    }),

    insuranceAttachmentPath: () => getFieldDecorator('insuranceAttachmentPath', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请上传保单附件'
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
    }),

    premium: () => getFieldDecorator('premium', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入商业保险费'
      }]
    }),

    otherAttachmentPath: () => getFieldDecorator('otherAttachmentPath', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请上传其他文档'
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
    }),

    plateNumber: () => getFieldDecorator('plateNumber', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车牌号码'
      }]
    }),

    carBrand: () => getFieldDecorator('carBrand', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆品牌'
      }]
    }),

    carModel: () => getFieldDecorator('carModel', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆型号'
      }]
    }),

    carIdentifyNumber: () => getFieldDecorator('carIdentifyNumber', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆识别号'
      }]
    }),

    driverLicense: () => getFieldDecorator('driverLicense', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入行驶证号'
      }]
    }),

    driverLicensePath: () => getFieldDecorator('driverLicensePath', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请上传行驶证副本扫描件'
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
