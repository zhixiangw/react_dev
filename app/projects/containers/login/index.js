import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { Input, Form, Button } from 'antd'
const FormItem = Form.Item

import validata from './validate'
import './index.less'
import logoImg from './logo.png'

class HelloWorld extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { form: { validateFields, getFieldsValue }, dispatch } = this.props
    validateFields((errors) => {
      if (!!errors) return
      const feildValues = getFieldsValue()
      console.info(feildValues)
      dispatch(replace('/overView'))
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
      <div className="form-box">
        <div className="logo">
          <img src={logoImg} />
        </div>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="登录账号"
            hasFeedback >
            {fieldValidata.account()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback >
            {fieldValidata.password()(<Input type="password" />)}
          </FormItem>

          <FormItem>
            <p style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </p>
          </FormItem>
        </Form>
      </div>
    )
  }
}

HelloWorld = Form.create()(HelloWorld)
export default connect()(HelloWorld)
