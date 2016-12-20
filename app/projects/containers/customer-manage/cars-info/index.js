import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Upload, Icon, DatePicker, Row, Col } from 'antd'
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

  render() {
    const { form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
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
            label="商业保险费"
            hasFeedback >
            {fieldValidata.commercialInsurancePremium()(<Input />)}
          </FormItem>

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
            label="车牌号码"
            hasFeedback >
            {fieldValidata.carNumber()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆品牌"
            hasFeedback >
            {fieldValidata.carBrand()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆型号"
            hasFeedback >
            {fieldValidata.carModel()(<Input />)}
          </FormItem>

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
