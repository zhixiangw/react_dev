import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Button, Row, Col, Upload, Icon } from 'antd'
const FormItem = Form.Item

import { test as testAction } from '../../actions'

import validate from './validate'
import './index.less'

class SystemSetting extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { form: { validateFields } } = this.props
    validateFields((errors, values) => {
      if (!!errors) return
      console.info(values)
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
                {fieldValidate.preNotice()(<Input />)}
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
                    action="/upload.do"
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
  list: state.test.testFetch
})
const mapDispatchToProps = (dispatch) => ({
  sendAsyncAction: (condition) => dispatch(testAction.testFetch(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(SystemSetting)
