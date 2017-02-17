import React, { Component } from 'react'

import { Input, Form, Modal, Radio } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

import validate from './validate'

class CreateUser extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { isShow, form: { resetFields } } = this.props
    if (!isShow && nextProps.isShow) {
      resetFields()
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
    const { form: { getFieldDecorator }, title, isShow, cancel } = this.props
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
            label="角色"
            hasFeedback >
            {fieldValidate.type()(
              <RadioGroup>
                <Radio value="1">业务员</Radio>
                <Radio value="2">审核员</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback >
            {fieldValidate.account()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="账号名称"
            hasFeedback >
            {fieldValidate.accountName()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="联系方式"
            hasFeedback >
            {fieldValidate.mobile()(<Input />)}
          </FormItem>
        </Form>
      </div>
    </Modal>
    )
  }
}

CreateUser = Form.create()(CreateUser)
export default CreateUser
