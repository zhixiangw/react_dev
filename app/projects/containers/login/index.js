import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'

import { login as loginAction } from '../../actions'
import { Input, Form, Button, message  } from 'antd'
const FormItem = Form.Item

import validate from './validate'
import './index.less'
import logoImg from './logo.png'

class Login extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { form: { validateFields }, dispatch } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      const hide = message.loading('', 0)
      dispatch(loginAction.login(values)).then(() => {
        dispatch(replace(`${__STATIC_BASE__}/userList`))
        setTimeout(hide, 0)
      }, () => {
        message.error('登录失败', 2)
        setTimeout(hide, 0)
      })
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const fieldValidate = validate(getFieldDecorator)
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
            {fieldValidate.username()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback >
            {fieldValidate.password()(<Input type="password" />)}
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

Login = Form.create()(Login)
export default connect()(Login)
