import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Upload, Icon, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import validata from './validate'
import './index.less'

class BasicInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
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

  disabledDate (current) {
    return current && current.valueOf() < Date.now()
  }

  getChargeTimeOptions () {
    return [1].map((item, index) => {
      return <Option key={index + 1} value={'1'}>{`每月${index + 1}号`}</Option>
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const fieldValidata = validata(getFieldDecorator)
    return (
      <div className="customer-form-box">
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

          <FormItem
            {...formItemLayout}
            label="客户联系方式"
            hasFeedback >
            {fieldValidata.customerMobile()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="营业执照注册号"
            hasFeedback >
            {fieldValidata.businessLicense()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="营业执照副本扫描件"
            extra={`点击上传营业执照副本扫描件点击上传营业执照副本扫描件
              点击上传营业执照副本扫描件点击上传营业执照副本扫描件点击上传营业执照副本扫描件
              点击上传营业执照副本扫描件点击上传营业执照副本扫描件点击上传营业执照副本扫描件
              点击上传营业执照副本扫描件点击上传营业执照副本扫描件`}
            hasFeedback >
            {fieldValidata.businessLicensePic()(
              <Upload
                action="/upload.do"
                name="businessLicensePic"
                accept=".jpg,.png,.jpeg,.bmp,.gif"
                onChange={this.handleUpload} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传营业执照副本扫描件
              </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手续费状态"
            hasFeedback >
            {fieldValidata.feeStatus()(
              <Select>
                <Option value={'null'}>请选择</Option>
                <Option value={'1'}>未缴费</Option>
                <Option value={'2'}>已缴费</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="借款金额"
            hasFeedback >
            {fieldValidata.loanAmount()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="借款期限"
            hasFeedback >
            {fieldValidata.loanTerm()(<DatePicker disabledDate={this.disabledDate} />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="每期扣款时间"
            hasFeedback >
            {fieldValidata.eachChargeTime()(
              <Select>
                {this.getChargeTimeOptions()}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属诺亚信业务员"
            hasFeedback >
            {fieldValidata.noainClerk()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属诺亚信业务员联系方式"
            hasFeedback >
            {fieldValidata.businessLicense()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员"
            hasFeedback >
            {fieldValidata.businessLicense()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员联系方式"
            hasFeedback >
            {fieldValidata.businessLicense()(<Input />)}
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
