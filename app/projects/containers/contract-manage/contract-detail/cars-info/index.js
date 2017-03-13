import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Button } from 'antd'
const FormItem = Form.Item

import Item from './item'

class CarsInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      info: this.props.info,
      pathArr: [
        'insuranceAttachmentPath',
        'otherAttachmentPath',
        'driverLicensePath',
        'premium'
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reFormatValues = this.reFormatValues.bind(this)
    this.formatValues = this.formatValues.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  componentWillMount() {
    const { form: { setFieldsValue } } = this.props
    setFieldsValue(this.formatValues(this.state.info))
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
        url: `${__API_BASE__}file/${item.response && item.response.obj || item.name}?filePath=${item.response && item.response.obj || item.name}`,
        uid: item.uid
      }
    })
  }

  formatValues (info) {
    let result = {}
    info.forEach((item, index) => {
      Object.getOwnPropertyNames(item).forEach(itemKey => {
        if (this.state.pathArr.indexOf(itemKey) !== -1) {
          if (itemKey === 'premium') {
            result[`[${index}].${itemKey}`] = item[itemKey] && item[itemKey].toString() || item[itemKey]
          } else {
            result[`[${index}].${itemKey}`] = this.normalizeObj(item[itemKey])
          }
        } else {
          result[`[${index}].${itemKey}`] = item[itemKey]
        }
      })
    })
    return result
  }

  reFormatValues (values) {
    let result = []
    Object.getOwnPropertyNames(values).forEach(key => {
      Object.getOwnPropertyNames(values[key]).forEach(itemKey => {
        if (this.state.pathArr.indexOf(itemKey) !== -1) {
          if (itemKey !== 'premium') {
            values[key][itemKey] = this.normalize(values[key][itemKey])[0].url
          }
        }
      })
      result.push(values[key])
    })
    return result
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      onSubmit(this.reFormatValues(values))
    })
  }

  addItem () {
    this.setState({
      info: this.state.info.concat({})
    })
  }

  deleteItem (index) {
    if (this.state.info.filter(item => item).length === 1) return
    let oldInfo = this.state.info
    delete oldInfo[index]
    this.setState({
      info: oldInfo
    })
  }

  render() {
    const { info } = this.state
    const { form: { setFieldsValue, getFieldDecorator }, type, handleType } = this.props
    const readOnly = type === 'salesman'
    return (
      <div className="cars-info-form-box">
        {
          handleType === 'create' ?
          <div><Button type="primary" disabled={readOnly} onClick={this.addItem}>新增保单</Button></div> :
          null
        }
        <Form horizontal>
          {info.map((item, index) => {
            if (!item) return null
            return (
              <Item
                key={index}
                index={index}
                readOnly={readOnly}
                handleType={handleType}
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
