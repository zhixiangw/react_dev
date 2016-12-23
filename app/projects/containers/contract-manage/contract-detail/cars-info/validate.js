export default function (getFieldDecorator) {
  return {
    policyNumber: () => getFieldDecorator('policyNumber', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入保单号'
      }]
    }),

    policyAttachment: () => getFieldDecorator('policyAttachment', {
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

    commercialInsurancePremium: () => getFieldDecorator('commercialInsurancePremium', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入商业保险费'
      }]
    }),

    otherAttachment: () => getFieldDecorator('otherAttachment', {
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

    carNumber: () => getFieldDecorator('carNumber', {
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

    carIdNumber: () => getFieldDecorator('carIdNumber', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆识别号'
      }]
    }),

    drivingLicense: () => getFieldDecorator('drivingLicense', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入驾驶证号'
      }]
    }),

    drivingLicenseAttachment: () => getFieldDecorator('drivingLicenseAttachment', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请上传驾驶证副本扫描件'
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
