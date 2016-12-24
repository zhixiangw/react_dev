import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Button, Upload, Icon, Row, Col, message } from 'antd'
const FormItem = Form.Item

import validate from './validate'
import './index.less'

class CarsInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBeforeUpload = this.handleBeforeUpload.bind(this)
  }

  componentWillMount() {
    const { info, form: { setFieldsValue } } = this.props
    setFieldsValue(info)
  }

  componentDidUpdate (prevProps) {
    const { info, form: { setFieldsValue } } = this.props
    if (info !== prevProps.info) {
      setFieldsValue(info)
    }
  }

  normalize (arr) {
    return arr.map(item => {
      return {
        name: item.name,
        url: item.response && item.response.url || 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        uid: item.uid
      }
    })
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      values.policyAttachment = this.normalize(values.policyAttachment)
      values.otherAttachment = this.normalize(values.otherAttachment)
      onSubmit(values)
    })
  }

  handleBeforeUpload(type, file) {
    const isPDF = file.type === 'application/pdf'
    if (type !== 'all' && !isPDF) {
      message.error('必须上传PDF格式的文件')
      return false
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error('文件大小必须小于2M')
      return false
    }
    return true
  }

  render() {
    const { form: { getFieldDecorator }, handleType } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const fieldValidate = validate(getFieldDecorator)
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
            {fieldValidate.policyNumber()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="保单附件上传"
            hasFeedback >
            {fieldValidate.policyAttachment()(
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                name="policyAttachment"
                accept=".pdf"
                beforeUpload={this.handleBeforeUpload.bind(this, 'application/pdf')} >
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
            {fieldValidate.commercialInsurancePremium()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="其他文档上传"
            hasFeedback >
            {fieldValidate.otherAttachment()(
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                name="contractAttachment"
                accept=".pdf"
                beforeUpload={this.handleBeforeUpload.bind(this, 'application/pdf')} >
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
            {fieldValidate.carNumber()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆品牌"
            hasFeedback >
            {fieldValidate.carBrand()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆型号"
            hasFeedback >
            {fieldValidate.carModel()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆识别号"
            hasFeedback >
            {fieldValidate.carIdNumber()(<Input />)}
          </FormItem>

          <Row className="cars-info-title">
            <Col span="6">驾驶证信息</Col>
          </Row>
           <FormItem
             {...formItemLayout}
             label="驾驶证号"
             hasFeedback >
            {fieldValidate.drivingLicense()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="驾驶证副本扫描件"
            extra={`请上传驾驶证清晰彩色原件扫描件或者数码照，支持jpg、jpeg、bmp、png、gif格式照片，
              大小不超过2M`}
            hasFeedback >
            {fieldValidate.drivingLicenseAttachment()(
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
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
              <Button type="primary" onClick={this.handleSubmit}>{ handleType === 'create' && '下一步' || '保存' }</Button>
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
