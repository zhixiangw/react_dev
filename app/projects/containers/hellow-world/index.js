import React, { Component } from 'react'

import { Input, Form, Select, Button } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import validata from './validata'
import './index.less'

class HelloWorld extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit () {
    const { form: { validateFields, getFieldsValue } } = this.props
    validateFields((errors) => {
      if (!!errors) return
      const feildValues = getFieldsValue()
      console.info(feildValues)
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
      <div>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="Account"
            hasFeedback >
            {fieldValidata.account()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Password"
            hasFeedback >
            {fieldValidata.password()(<Input type="password" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Fruit" >
            {fieldValidata.fruit()(
              <Select>
                <Option value="1">橙子</Option>
                <Option value="2">苹果</Option>
                <Option value="3">西瓜</Option>
              </Select>
            )}
          </FormItem>

          <FormItem>
            <p style={{ textAlign: 'center' }}>
              <Button onClick={this.handleSubmit}>提交</Button>
            </p>
          </FormItem>
        </Form>
      </div>
    )
  }
}

HelloWorld = Form.create()(HelloWorld)
export default HelloWorld
