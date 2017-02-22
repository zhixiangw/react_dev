export default function (getFieldDecorator) {
  return {
    contractCode: () => getFieldDecorator('contractCode', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入合同编号'
      }]
    }),

    contractAttachment: (handleType) => getFieldDecorator('contractAttachment', {
      rules: [{
        required: handleType !== 'create',
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
    }),

    loanDate: () => getFieldDecorator('loanDate', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'object',
        message: '请选择借款时间'
      }]
    }),

    customerName: () => getFieldDecorator('customerName', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入客户姓名'
      }]
    }),

    customerMobile: () => getFieldDecorator('customerMobile', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入客户联系方式'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的客户联系方式')
          }
          callback()
        }
      }]
    }),

    businessLicense: () => getFieldDecorator('businessLicense', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入营业执照注册号'
      }]
    }),

    businessLicensePic: () => getFieldDecorator('businessLicensePic', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'array',
        message: '请选择营业执照副本扫描件'
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

    loanAmount: () => getFieldDecorator('loanAmount', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入借款金额'
      }]
    }),

    loanTerm: () => getFieldDecorator('loanTerm', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择借款期限'
      }]
    }),

    eachChargeTime: () => getFieldDecorator('eachChargeTime', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择每期扣款时间'
      }]
    }),

    noainClerk: () => getFieldDecorator('noainClerk', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属诺亚信业务员'
      }]
    }),

    noainClerkMobile: () => getFieldDecorator('noainClerkMobile', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属诺亚信业务员联系方式'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的所属诺亚信业务员联系方式')
          }
          callback()
        }
      }]
    }),

    salesClerk: () => getFieldDecorator('salesClerk', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属保险业务员'
      }]
    }),

    salesClerkMobile: () => getFieldDecorator('salesClerkMobile', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属保险业务员联系方式'
      }, {
        validator: (rule, value, callback) => {
          if (value && !/^\d{11}$/.test(value)) {
            callback('请输入正确的所属保险业务员联系方式')
          }
          callback()
        }
      }]
    })
  }
}
