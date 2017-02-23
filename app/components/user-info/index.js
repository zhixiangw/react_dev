import React, { Component } from 'react'
import md5 from 'md5'
import { Col, Row, Modal, Input, Form } from 'antd'
const FormItem = Form.Item

import validate from './validate'
import './index.less'

class UserInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isShowPasswordInput: false
    }
    this.editPassword = this.editPassword.bind(this)
    this.showPasswordInput = this.showPasswordInput.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isShow && !this.props.isShow) {
      const { form: { resetFields } } = nextProps
      resetFields(['oldPassword', 'newPassword'])
      this.setState({ isShowPasswordInput: false })
    }
  }

  editPassword () {
    const { form: { validateFields }, confirm } = this.props
    validateFields((errors, values) => {
      if (!!errors) return
      confirm(values)
    })
  }

  handleChange (type, e) {
    this.setState({
      [type]: e && e.target ? e.target.value : e
    })
  }

  showPasswordInput () {
    this.setState({ isShowPasswordInput: true })
  }


  render () {
    const { isShow, cancel, form: { getFieldDecorator }, password } = this.props
    const { isShowPasswordInput } = this.state
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
    }
    const fieldValidate = validate(getFieldDecorator)

    return (
        <Modal
          visible={isShow}
          onOk={isShowPasswordInput && this.editPassword || cancel}
          onCancel={cancel} >
          <div className="user-info">
            <Row>
              <Col span="8">登录账号：</Col>
              <Col span="14">a52659854467876464</Col>
            </Row>
            <Row>
              <Col span="8">登录名称：</Col>
              <Col span="14">David M.</Col>
            </Row>
            <Form horizontal>
            {
              isShowPasswordInput ?
              <section>
                <FormItem
                  {...formItemLayout}
                  label="修改前密码"
                  hasFeedback >
                  {fieldValidate.oldPassword(password, md5)(<Input type="password" />)}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="修改后密码"
                  hasFeedback >
                  {fieldValidate.password()(<Input type="password" />)}
                </FormItem>
              </section> :
              <Row>
                <Col span="8">登录密码：</Col>
                <Col span="14"><a onClick={this.showPasswordInput}>修改密码</a></Col>
              </Row>
            }
            </Form>
          </div>
        </Modal>
    )
  }
}

UserInfo = Form.create()(UserInfo)
export default UserInfo

