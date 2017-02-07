import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Button, Row, Col } from 'antd'
const FormItem = Form.Item

import Item from './item'

class CarsInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: this.props.list || [{index:1}]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentWillMount() {
    const { info, form: { setFieldsValue } } = this.props
    setFieldsValue(this.formatValues(info))
  }

  componentDidUpdate (prevProps) {
    const { info, form: { setFieldsValue } } = this.props
    if (info !== prevProps.info) {
      setFieldsValue(this.formatValues(info))
    }
  }

  formatValues (info) {
    return info
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      console.log(values)
      return
      onSubmit(values)
    })
  }

  addItem () {
    this.setState({
      info: this.state.info.concat({})
    })
  }

  deleteItem (index) {
    if (this.state.info.length === 1) return
    let oldInfo = this.state.info
    oldInfo.splice(index, 1)
    this.setState({
      info: oldInfo
    })
  }

  render() {
    const { info } = this.state
    const { form: { setFieldsValue, getFieldDecorator } } = this.props
    console.info(info)
    return (
      <div className="cars-info-form-box">
        <div><Button type="primary" onClick={this.addItem}>新增保单</Button></div>
        <Form horizontal>
          {info.map((item, index) => {
            return (
              <Item
                key={index}
                index={index}
                data={item}
                setFieldsValue={setFieldsValue}
                getFieldDecorator={getFieldDecorator}
                deleteItem={this.deleteItem} />
            )
          })}

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

CarsInfo = Form.create()(CarsInfo)

export default connect()(CarsInfo)
