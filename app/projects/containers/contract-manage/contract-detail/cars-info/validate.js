export default function (getFieldDecorator) {
  return {
    no: (index) => getFieldDecorator(`[${index}].no`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入保单号'
      }]
    }),

    insuranceAttachmentPath: (index) => getFieldDecorator(`[${index}].insuranceAttachmentPath`, {
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

    premium: (index) => getFieldDecorator(`[${index}].premium`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入商业保险费'
      }]
    }),

    otherAttachmentPath: (index) => getFieldDecorator(`[${index}].otherAttachmentPath`, {
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

    plateNumber: (index) => getFieldDecorator(`[${index}].plateNumber`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车牌号码'
      }]
    }),

    carBrand: (index) => getFieldDecorator(`[${index}].carBrand`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆品牌'
      }]
    }),

    carModel: (index) => getFieldDecorator(`[${index}].carModel`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆型号'
      }]
    }),

    carIdentifyNumber: (index) => getFieldDecorator(`[${index}].carIdentifyNumber`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入车辆识别号'
      }]
    }),

    driverLicense: (index) => getFieldDecorator(`[${index}].driverLicense`, {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入行驶证号'
      }]
    }),

    driverLicensePath: (index) => getFieldDecorator(`[${index}].driverLicensePath`, {
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
