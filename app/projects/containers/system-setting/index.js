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

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { querySystemSetting, systemSettingInfo, form: { setFieldsValue } } = this.props

    querySystemSetting().then(() => setFieldsValue(systemSettingInfo.toJS()))
  }

  componentDidUpdate (prevProps) {
    const { systemSettingInfo, form: { setFieldsValue } } = this.props
    if (systemSettingInfo !== prevProps.systemSettingInfo) {
      setFieldsValue(systemSettingInfo.toJS())
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
    const { form: { validateFields }, submitSystemSetting } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      values.contractTemplate = this.normalize(values.contractTemplate)
      const hide = message.loading('', 0)
      submitSystemSetting(values).then(() => {
        setTimeout(hide, 0)
      }, () => {
        setTimeout(hide, 0)
      })
    })
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
                    action="//jsonplaceholder.typicode.com/posts/"
                    name="contractTemplate"
                    accept=".pdf"
                    onChange={this.handleUpload} >
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
