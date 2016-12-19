import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Upload, Icon } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import validata from './validate'
import './index.less'
import logoImg from './logo.png'

class BasicInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleSubmit () {
    const { form: { validateFields, getFieldsValue }, onSubmit } = this.props
    validateFields((errors) => {
      if (!!errors) return
      const feildValues = getFieldsValue()
      onSubmit(feildValues)
    })
  }

  handleUpload (e) {
    console.info(e)
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const fieldValidata = validata(getFieldDecorator)
    return (
      <div className="form-box">
        <div className="logo">
          <img src={logoImg} />
        </div>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="合同编号"
            hasFeedback >
            {fieldValidata.contractCode()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="合同附件上传"
            hasFeedback >
            {fieldValidata.contractAttachment()(
              <Upload
                action="/upload.do"
                name="contractAttachment"
                accept=".pdf"
                onChange={this.handleUpload} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传合同附件
              </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="客户姓名"
            hasFeedback >
            {fieldValidata.customerName()(<Input />)}
          </FormItem>

          <FormItem>
            <p style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            </p>
          </FormItem>
        </Form>
      </div>
    )
  }
}

BasicInfo = Form.create()(BasicInfo)
const mapStateToProps = (state) => ({
  list: state.test.testFetch
})

export default connect(mapStateToProps)(BasicInfo)
