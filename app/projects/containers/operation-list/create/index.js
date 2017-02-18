import React, { Component } from 'react'

import { Input, Form, Modal } from 'antd'
const FormItem = Form.Item

import validate from './validate'

class CreateUser extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { form: { setFieldsValue, resetFields }, isShow } = this.props
    const { type, cord } = nextProps
    if (!isShow && nextProps.isShow) {
      if (type === 'edit') {
        setFieldsValue(cord)
        resetFields(['password'])
      } else {
        resetFields()
      }
    }
  }

  handleSubmit () {
    const { form: { validateFields }, confirm } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      confirm(values)
    })
  }

  render() {
    const { form: { getFieldDecorator }, title, isShow, cancel, cord } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const fieldValidate = validate(getFieldDecorator)
    return (
    <Modal
      title={title}
      visible={isShow}
      onOk={this.handleSubmit}
      onCancel={cancel} >
      <div className="create-form-box">
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback >
            {fieldValidate.accountName()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback >
            {fieldValidate.username()(<Input disabled={cord && cord.type === 'ADMIN'} />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback >
            {fieldValidate.password()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback >
            {fieldValidate.phoneNumber()(<Input />)}
          </FormItem>
        </Form>
      </div>
    </Modal>
    )
  }
}

CreateUser = Form.create()(CreateUser)
export default CreateUser
