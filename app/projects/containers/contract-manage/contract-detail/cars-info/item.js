import React, { Component } from 'react'

import { Input, Form, Button, Upload, Icon, Row, Col, message } from 'antd'
const FormItem = Form.Item

import validate from './validate'
import './index.less'

class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      insuranceAttachmentPathName: 'default',
      otherAttachmentPathName: 'default',
      driverLicensePathName: 'default'
    }
    this.handleBeforeUpload = this.handleBeforeUpload.bind(this)
  }

  // componentWillMount() {
  //   const { info, setFieldsValue } = this.props
  //   info.insuranceAttachmentPath = this.normalizeObj(info.insuranceAttachmentPath)
  //   info.otherAttachmentPath = this.normalizeObj(info.otherAttachmentPath)
  //   info.driverLicensePath = this.normalizeObj(info.driverLicensePath)
  //   info.premium = info.premium && info.premium.toString()
  //   setFieldsValue(info)
  // }

  // componentDidUpdate (prevProps) {
  //   const { info, setFieldsValue } = this.props
  //   if (info !== prevProps.info) {
  //     info.insuranceAttachmentPath = this.normalizeObj(info.insuranceAttachmentPath)
  //     info.otherAttachmentPath = this.normalizeObj(info.otherAttachmentPath)
  //     info.driverLicensePath = this.normalizeObj(info.driverLicensePath)
  //     info.premium = info.premium && info.premium.toString()
  //     setFieldsValue(info)
  //   }
  // }

  getNameFromUrl (url) {
    let query = url && url.split('?')[1] || ''
    let sigleQuery = query && query.split('&')
    let queryArr = sigleQuery && sigleQuery.map(item => item.split('=')) || []
    let name = 'defalut'
    queryArr.forEach(item => {
      if (item[0] === 'filePath') {
        name = item[1]
      }
    })
    return name
  }

  normalizeObj (url) {
    return [{
      name: this.getNameFromUrl(url),
      url,
      uid: -1
    }]
  }

  normalize (arr) {
    return arr.map(item => {
      return {
        name: item.name,
        url: `${__API_BASE__}file/${item.response && item.response.obj}?filePath=${item.response && item.response.obj}`,
        uid: item.uid
      }
    })
  }

  handleBeforeUpload(type, file) {
    const isPDF = file.type === 'application/pdf'
    if (type !== 'driverLicensePath' && !isPDF) {
      message.error('必须上传PDF格式的文件')
      return false
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error('文件大小必须小于2M')
      return false
    }
    this.setState({ [type === 'insuranceAttachmentPath' && 'insuranceAttachmentPathName'
     || type === 'otherAttachmentPath' && 'otherAttachmentPathName' || 'driverLicensePathName']: file.name.toString().replace(/.pdf|.png|.jpg|.jpeg|.bmp|.gif/, '') })
    return true
  }

  render() {
    const { getFieldDecorator, index, deleteItem } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const fieldValidate = validate(getFieldDecorator)
    return (
      <div className="cars-info-form-box">
        <Row className="cars-info-title">
          <Col span="6">保单信息</Col>
          <Col offset="20"><Button type="primary" onClick={deleteItem.bind(this, index)}>删除</Button></Col>
        </Row>
          <FormItem
            {...formItemLayout}
            label="保单号"
            hasFeedback >
            {fieldValidate.no(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="保单附件上传"
            hasFeedback >
            {fieldValidate.insuranceAttachmentPath(index)(
              <Upload
                action={`${__API_BASE__}file/upload?token=${window.localStorage.getItem('token')}`}
                name="insuranceAttachmentPath"
                data={{ fileName: this.state.insuranceAttachmentPathName }}
                accept=".pdf"
                beforeUpload={this.handleBeforeUpload.bind(this, 'insuranceAttachmentPath')} >
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
            {fieldValidate.premium(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="其他文档上传"
            hasFeedback >
            {fieldValidate.otherAttachmentPath(index)(
              <Upload
                action={`${__API_BASE__}file/upload?token=${window.localStorage.getItem('token')}`}
                name="otherAttachmentPath"
                data={{ fileName: this.state.otherAttachmentPathName }}
                accept=".pdf"
                beforeUpload={this.handleBeforeUpload.bind(this, 'otherAttachmentPath')} >
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
            {fieldValidate.plateNumber(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆品牌"
            hasFeedback >
            {fieldValidate.carBrand(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆型号"
            hasFeedback >
            {fieldValidate.carModel(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="车辆识别号"
            hasFeedback >
            {fieldValidate.carIdentifyNumber(index)(<Input />)}
          </FormItem>

          <Row className="cars-info-title">
            <Col span="6">行驶证信息</Col>
          </Row>
           <FormItem
             {...formItemLayout}
             label="行驶证号"
             hasFeedback >
            {fieldValidate.driverLicense(index)(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="行驶证副本扫描件"
            extra={`请上传行驶证清晰彩色原件扫描件或者数码照，支持jpg、jpeg、bmp、png、gif格式照片，
              大小不超过2M`}
            hasFeedback >
            {fieldValidate.driverLicensePath(index)(
              <Upload
                action={`${__API_BASE__}file/upload?token=${window.localStorage.getItem('token')}`}
                name="driverLicensePath"
                data={{ fileName: this.state.driverLicensePathName }}
                accept=".jpg,.png,.jpeg,.bmp,.gif"
                beforeUpload={this.handleBeforeUpload.bind(this, 'driverLicensePath')} >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传行驶证副本扫描件
              </Button>
              </Upload>
            )}
          </FormItem>
      </div>
    )
  }
}

export default Item
