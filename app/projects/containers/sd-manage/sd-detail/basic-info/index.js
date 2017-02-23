import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Input, Form, Button, Upload, Icon, Alert, Row, Col, message, Radio } from 'antd'
const RadioGroup = Radio.Group
const FormItem = Form.Item

import validate from './validate'
import './index.less'

class BasicInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBeforeUpload = this.handleBeforeUpload.bind(this)
  }

  componentWillMount() {
    const { info, form: { setFieldsValue }, handleType } = this.props
    if (handleType !== 'create') {
      info.age = `${info.age}`
      info.self_price = `${info.self_price}`
      if (info.image) {
        info.image = this.normalizeObj(info.image)
      }
      setFieldsValue(info)
    }
  }

  componentDidUpdate (prevProps) {
    const { info, form: { setFieldsValue }, handleType } = this.props
    if (info !== prevProps.info && handleType !== 'create') {
      info.age = `${info.age}`
      info.self_price = `${info.self_price}`
      if (info.image) {
        info.image = this.normalizeObj(info.image)
      }
      setFieldsValue(info)
    }
  }

  normalizeObj (url) {
    if (url && url.split(',')) {
      return url.split(',').map((item, index) => {
        return {
          name: item,
          url,
          uid: `-1${index}`
        }
      })
    }
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      values.age = +values.age
      values.self_price = +values.self_price
      values.image = values.image[0].response && values.image[0].response.url
      onSubmit(values)
    })
  }

  handleBeforeUpload(file) {
    const typeArr = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/bmp']
    if (typeArr.indexOf(file.type) === -1) {
      message.error('上传文件格式不正确')
      return false
    }
    if (file.size > 1024 * 1024) {
      message.error('文件大小必须小于1M')
      return false
    }
    return true
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, loginInfo } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const afterFormItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    }
    const fieldValidate = validate(getFieldDecorator)
    const readonly = +loginInfo.get('type') !== 1
    return (
      <div className="basic-info-form-box">
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="单身狗名称" >
            {fieldValidate.name()(<Input disabled={readonly} />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="单身狗性别" >
            {fieldValidate.sex()(<RadioGroup disabled={readonly}><Radio value={1}>男</Radio><Radio value={0}>女</Radio></RadioGroup>)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="单身狗狗龄" >
            {fieldValidate.age()(<Input disabled={readonly} />)}
          </FormItem>

          <Row>
            <Col span="16">
              <FormItem
                {...afterFormItemLayout}
                label="单身狗手机" >
                {fieldValidate.mobile()(<Input disabled={readonly} />)}
              </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="来吧，交出你的号码！" type="info" /></Col>
          </Row>

          <FormItem
            {...formItemLayout}
            label="单身狗个性签名" >
            {fieldValidate.personalSign()(<Input disabled={readonly} maxLength="50" type="textarea" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="单身狗自我估价" >
            {fieldValidate.selfPrice()(<Input disabled={readonly} addonAfter="元" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否潜在单身狗" >
            {fieldValidate.isPotential()(<RadioGroup disabled={readonly}><Radio value={1}>是</Radio><Radio value={0}>否</Radio></RadioGroup>)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否单身狗会员" >
            {fieldValidate.isMember()(<RadioGroup disabled={readonly}><Radio value={1}>是</Radio><Radio value={0}>否</Radio></RadioGroup>)}
          </FormItem>

          {
            getFieldValue('is_member') ? (
            <FormItem
              {...formItemLayout}
              label="单身狗会员必备清晰照"
              extra={`请上传个人清晰头像照片，由中国大陆单身狗管理总局颁发的荣誉头像可100%审核通过，
                支持jpg、jpeg、bmp、png、gif格式照片，大小不超过1M`} >
              {fieldValidate.image()(
                <Upload
                  action={`${__API_BASE__}file/upload.do`}
                  accept=".jpg,.png,.jpeg,.bmp,.gif"
                  listType="picture"
                  disabled={readonly}
                  beforeUpload={this.handleBeforeUpload.bind(this)} >
                  <Button type="ghost">
                    <Icon type="upload" /> 点击上传单身狗头像
                  </Button>
                </Upload>
              )}
            </FormItem>) : null
          }

          {
            !readonly ? (
              <FormItem>
                <p style={{ textAlign: 'center' }}>
                  <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                </p>
              </FormItem>
            ) : null
          }
        </Form>
      </div>
    )
  }
}


BasicInfo = Form.create()(BasicInfo)

export default connect()(BasicInfo)
