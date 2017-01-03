export default function (getFieldDecorator) {
  return {
    no: () => getFieldDecorator('no', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入合同编号'
      }]
    }),

    attachmentPath: (handleType) => getFieldDecorator('attachmentPath', {
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

    loantime: () => getFieldDecorator('loantime', {
      rules: [{
        required: true,
        whitespace: true,
        type: 'object',
        message: '请选择借款时间'
      }]
    }),

    customer: () => getFieldDecorator('customer', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入客户姓名'
      }]
    }),

    customerContact: () => getFieldDecorator('customerContact', {
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

    businessLicence: () => getFieldDecorator('businessLicence', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入营业执照注册号'
      }]
    }),

    businessLicencePath: () => getFieldDecorator('businessLicencePath', {
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

    loanMoney: () => getFieldDecorator('loanMoney', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入借款金额'
      }]
    }),

    repaymentPeriod: () => getFieldDecorator('repaymentPeriod', {
      initialValue: '11',
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择借款期限'
      }]
    }),

    periodicDay: () => getFieldDecorator('periodicDay', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请选择每期扣款时间'
      }]
    }),

    salesName: () => getFieldDecorator('salesName', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属诺亚信业务员'
      }]
    }),

    salesContact: () => getFieldDecorator('salesContact', {
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

    insuranceSales: () => getFieldDecorator('insuranceSales', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入所属保险业务员'
      }]
    }),

    insuranceSalesContact: () => getFieldDecorator('insuranceSalesContact', {
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
