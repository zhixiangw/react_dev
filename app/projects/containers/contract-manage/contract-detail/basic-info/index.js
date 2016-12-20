import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Upload, Icon, DatePicker, Alert, Row, Col } from 'antd'
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
    return current && current.valueOf() >= Date.now()
  }

  getChargeTimeOptions () {
    return Array.from({ length: 31 }, (item, index) => index).map((item, index) => {
      return <Option key={index + 1} value={`${index + 1}`}>{`每月${index + 1}号`}</Option>
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const afterFormItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
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
            label="借款时间"
            hasFeedback >
            {fieldValidata.loanDate()(<DatePicker disabledDate={this.disabledDate} />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="客户姓名"
            hasFeedback >
            {fieldValidata.customerName()(<Input />)}
          </FormItem>

          <Row>
            <Col span="16">
              <FormItem
                {...afterFormItemLayout}
                label="客户联系方式"
                hasFeedback >
                {fieldValidata.customerMobile()(<Input />)}
              </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="扣款前两天，将短信通知客户还款" type="info" /></Col>
          </Row>

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
            label="借款金额"
            hasFeedback >
            {fieldValidata.loanAmount()(<Input />)}
          </FormItem>

          <Row>
            <Col span="16">
            <FormItem
              {...afterFormItemLayout}
              label="借款期限"
              hasFeedback >
              {fieldValidata.loanTerm()(
                <Select placeholder="请选择">
                  <Option value={'11'}>11期</Option>
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="每期还款1200.00" type="info" /></Col>
          </Row>

          <Row>
            <Col span="16">
            <FormItem
              {...afterFormItemLayout}
              label="每期扣款时间"
              hasFeedback >
              {fieldValidata.eachChargeTime()(
                <Select>
                  {this.getChargeTimeOptions()}
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="扣款时间将通知第三方机构扣款，以及提前两天将通知客户还款" type="info" /></Col>
          </Row>

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
            {fieldValidata.noainClerkMobile()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员"
            hasFeedback >
            {fieldValidata.salesClerk()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员联系方式"
            hasFeedback >
            {fieldValidata.salesClerkMobile()(<Input />)}
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
