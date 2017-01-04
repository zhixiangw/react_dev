import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Button, Row, Col, Upload, Icon, message } from 'antd'
const FormItem = Form.Item

import { system as systemAction } from '../../actions'

import validate from './validate'
import './index.less'

class SystemSetting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contractTemplateName: 'default'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { querySystemSetting } = this.props
    const hide = message.loading('', 0)
    querySystemSetting().then(() => setTimeout(hide, 0), () => setTimeout(hide, 0))
  }

  componentDidUpdate (prevProps) {
    const { systemSettingInfo, form: { setFieldsValue } } = this.props
    if (systemSettingInfo !== prevProps.systemSettingInfo) {
      systemSettingInfo.eachChargeTime = systemSettingInfo.eachChargeTime && systemSettingInfo.eachChargeTime.toString()
      systemSettingInfo.expWarning = systemSettingInfo.expWarning && systemSettingInfo.expWarning.toString()
      setFieldsValue(systemSettingInfo.toJS())
    }
  }

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

  handleSubmit () {
    const { form: { validateFields }, submitSystemSetting, querySystemSetting } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      values.contractTemplate = this.normalize(values.contractTemplate)[0].url
      const hide = message.loading('', 0)
      submitSystemSetting(values).then(() => {
        setTimeout(hide, 0)
        const hidden = message.loading('', 0)
        querySystemSetting().then(() => setTimeout(hidden, 0), () => setTimeout(hidden, 0))
      }, () => {
        setTimeout(hide, 0)
      })
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
    this.setState({ contractTemplateName: file.name.toString().replace(/.pdf|.png|.jpg|.jpeg|.bmp|.gif/, '') })
    return true
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const fieldValidate = validate(getFieldDecorator)
    return (
      <div className="sys-form-box">
        <Form horizontal>
          <Row>
            <Col span="3">
              <p className="sys-title">提前还款日期</p>
            </Col>
            <Col span="2">
              <FormItem>
                {fieldValidate.eachChargeTime()(<Input />)}
              </FormItem>
            </Col>
            <Col span="3">
              <p>天通知客户</p>
            </Col>
          </Row>

          <Row>
            <Col span="3">
              <p className="sys-title">逾期</p>
            </Col>
            <Col span="2">
              <FormItem>
                {fieldValidate.expWarning()(<Input />)}
              </FormItem>
            </Col>
            <Col span="3">
              <p>天警告一次</p>
            </Col>
          </Row>

          <Row>
            <Col offset="2">
              <FormItem>
                {fieldValidate.contractTemplate()(
                  <Upload
                    action={`${__API_BASE__}file/upload`}
                    data={{ fileName: this.state.contractTemplateName }}
                    name="contractTemplate"
                    accept=".pdf"
                    beforeUpload={this.handleBeforeUpload.bind(this, 'contractTemplate')} >
                    <Button type="ghost">
                      <Icon type="upload" /> 合同模板上传
                    </Button>
                  </Upload>
                )}
              </FormItem>
            </Col>
          </Row>

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

SystemSetting = Form.create()(SystemSetting)

const mapStateToProps = (state) => ({
  systemSettingInfo: state.system.systemSettingInfo
})
const mapDispatchToProps = (dispatch) => ({
  querySystemSetting: () => dispatch(systemAction.querySystemSetting()),
  submitSystemSetting: (condition) => dispatch(systemAction.submitSystemSetting(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(SystemSetting)
