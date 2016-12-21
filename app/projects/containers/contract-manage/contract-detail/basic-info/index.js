import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Upload, Icon, DatePicker, Alert, Row, Col } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

import validata from './validate'
import './index.less'

class CarsInfo extends Component {
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
      <div className="cars-info-form-box">
        <Row className="cars-info-title">
          <Col span="6">保单信息</Col>
        </Row>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="保单号"
            hasFeedback >
            {fieldValidata.policyNumber()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="保单附件上传"
            hasFeedback >
            {fieldValidata.policyAttachment()(
              <Upload
                action="/upload.do"
                name="policyAttachment"
                accept=".pdf"
                onChange={this.handleUpload} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传保单附件
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
            label="其他文档上传"
            hasFeedback >
            {fieldValidata.otherAttachment()(
              <Upload
                action="/upload.do"
                name="contractAttachment"
                accept=".pdf"
                onChange={this.handleUpload} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传其他文档
              </Button>
              </Upload>
            )}
          </FormItem>

          <Row className="cars-info-title">
            <Col span="6">车辆信息</Col>
          </Row>
          <FormItem
            {...formItemLayout}
            label="借款金额"
            hasFeedback >
            {fieldValidata.carNumber()(<Input />)}
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
            label="车辆识别号"
            hasFeedback >
            {fieldValidata.carIdNumber()(<Input />)}
          </FormItem>

          <Row className="cars-info-title">
            <Col span="6">驾驶证信息</Col>
          </Row>
           <FormItem
             {...formItemLayout}
             label="驾驶证号"
             hasFeedback >
             {fieldValidata.drivingLicense()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="驾驶证副本扫描件"
            extra={`请上传驾驶证清晰彩色原件扫描件或者数码照，支持jpg、jpeg、bmp、png、gif格式照片，
              大小不超过2M`}
            hasFeedback >
            {fieldValidata.drivingLicenseAttachment()(
              <Upload
                action="/upload.do"
                name="businessLicensePic"
                accept=".jpg,.png,.jpeg,.bmp,.gif"
                onChange={this.handleUpload} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传驾驶证副本扫描件
              </Button>
              </Upload>
            )}
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

CarsInfo = Form.create()(CarsInfo)
const mapStateToProps = (state) => ({
  list: state.test.testFetch
})

export default connect(mapStateToProps)(CarsInfo)
