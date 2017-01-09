import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Input, Form, Select, Button, Upload, Icon, DatePicker, Alert, Row, Col, message } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

import validate from './validate'
import './index.less'

class CarsInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attachmentPathName: 'default',
      businessLicencePathName: 'default'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBeforeUpload = this.handleBeforeUpload.bind(this)
  }

  componentWillMount() {
    const { info, form: { setFieldsValue } } = this.props
    info.loantime = info.loantime && moment(info.loantime) || null
    info.attachmentPath = this.normalizeObj(info.attachmentPath)
    info.businessLicencePath = this.normalizeObj(info.businessLicencePath)
    info.loanMoney = info.loanMoney && info.loanMoney.toString()
    info.periodicDay = info.periodicDay && info.periodicDay.toString()
    info.repaymentPeriod = info.repaymentPeriod && info.repaymentPeriod.toString()
    setFieldsValue(info)
  }

  componentDidUpdate (prevProps) {
    const { info, form: { setFieldsValue } } = this.props
    if (info !== prevProps.info) {
      info.loantime = info.loantime && moment(info.loantime) || null
      info.attachmentPath = this.normalizeObj(info.attachmentPath)
      info.businessLicencePath = this.normalizeObj(info.businessLicencePath)
      info.loanMoney = info.loanMoney && info.loanMoney.toString()
      info.periodicDay = info.periodicDay && info.periodicDay.toString()
      info.repaymentPeriod = info.repaymentPeriod && info.repaymentPeriod.toString()
      setFieldsValue(info)
    }
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
        url: `${__API_BASE__}file/${item.response && item.response.obj}?filePath=${item.response && item.response.obj}`,
        uid: item.uid
      }
    })
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      values.loantime = values.loantime.format('YYYY-MM-DD')
      values.attachmentPath = this.normalize(values.attachmentPath)[0].url
      values.businessLicencePath = this.normalize(values.businessLicencePath)[0].url
      onSubmit(values)
    })
  }

  handleBeforeUpload(type, file) {
    const isPDF = file.type === 'application/pdf'
    if (type !== 'businessLicencePath' && !isPDF) {
      message.error('必须上传PDF格式的文件')
      return false
    }

    if (file.size > 2 * 1024 * 1024) {
      message.error('文件大小必须小于2M')
      return false
    }
    this.setState({ [type === 'attachmentPath' && 'attachmentPathName' || 'businessLicencePathName']: file.name.replace(/.pdf|.png|.jpg|.jpeg|.bmp|.gif/, '') })
    return true
  }

  disabledDate (current) {
    return current && current.valueOf() >= Date.now()
  }

  getChargeTimeOptions () {
    return Array.from({ length: 31 }, (item, index) => index).map((item, index) => {
      return <Option key={index + 1} value={`${index + 1}`}>{`每月${index + 1}号`}</Option>
    })
  }

  getSalesManOptions () {
    const { salesManList } = this.props
    return salesManList.map((item, index) => {
      return <Option key={index + 1} value={item.account}>{item.account}</Option>
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, handleType } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    }
    const afterFormItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 },
    }
    const fieldValidate = validate(getFieldDecorator)
    return (
      <div className="basic-info-form-box">
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="合同编号"
            hasFeedback >
            {fieldValidate.no()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="合同附件上传"
            hasFeedback >
            {fieldValidate.attachmentPath(handleType)(
              <Upload
                action={`${__API_BASE__}file/upload?token=${window.localStorage.getItem('token')}`}
                name="attachmentPath"
                data={{ fileName: this.state.attachmentPathName }}
                accept=".pdf"
                beforeUpload={this.handleBeforeUpload.bind(this, 'attachmentPath')} >
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传合同附件
                </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="借款时间"
            hasFeedback >
            {fieldValidate.loantime()(<DatePicker disabledDate={this.disabledDate} />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="客户姓名"
            hasFeedback >
            {fieldValidate.customer()(<Input />)}
          </FormItem>

          <Row>
            <Col span="16">
              <FormItem
                {...afterFormItemLayout}
                label="客户联系方式"
                hasFeedback >
                {fieldValidate.customerContact()(<Input maxLength="11" />)}
              </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="扣款前两天，将短信通知客户还款" type="info" /></Col>
          </Row>

          <FormItem
            {...formItemLayout}
            label="营业执照注册号"
            hasFeedback >
            {fieldValidate.businessLicence()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="营业执照副本扫描件"
            extra={`请上传驾驶证清晰彩色原件扫描件或者数码照，在有效期内全年检章齐全
              （当年注册的可无年检章），由中国大陆工商局或者市场监督管理局颁发，
              支持jpg、jpeg、bmp、png、gif格式照片，大小不超过2M`}
            hasFeedback >
            {fieldValidate.businessLicencePath()(
              <Upload
                action={`${__API_BASE__}file/upload?token=${window.localStorage.getItem('token')}`}
                name="businessLicencePath"
                data={{ fileName: this.state.businessLicencePathName }}
                accept=".jpg,.png,.jpeg,.bmp,.gif"
                beforeUpload={this.handleBeforeUpload.bind(this, 'businessLicencePath')} >
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传营业执照副本扫描件
                </Button>
              </Upload>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="借款金额"
            hasFeedback >
            {fieldValidate.loanMoney()(<Input />)}
          </FormItem>

          <Row>
            <Col span="16">
            <FormItem
              {...afterFormItemLayout}
              label="借款期限"
              hasFeedback >
              {fieldValidate.repaymentPeriod()(
                <Select placeholder="请选择">
                  <Option value={'11'}>11期</Option>
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span="6" offset="1">
              <Alert
                message={`每期还款${getFieldValue('loanMoney') ? Number(getFieldValue('loanMoney') * (0.0057 + 1 / 11)).toFixed(2) : 0}`}
                type="info" />
            </Col>
          </Row>

          <Row>
            <Col span="16">
            <FormItem
              {...afterFormItemLayout}
              label="每期扣款时间"
              hasFeedback >
              {fieldValidate.periodicDay()(
                <Select>
                  {this.getChargeTimeOptions()}
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span="6" offset="1"><Alert message="扣款时间将通知第三方机构扣款，以及提前两天将通知客户还款" type="info" /></Col>
          </Row>

          <FormItem
            {...formItemLayout}
            label="所属诺亚信业务员"
            hasFeedback >
            {fieldValidate.salesName()(
              <Select>
                {this.getSalesManOptions()}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属诺亚信业务员联系方式"
            hasFeedback >
            {fieldValidate.salesContact()(<Input maxLength="11" />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员"
            hasFeedback >
            {fieldValidate.insuranceSales()(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属保险业务员联系方式"
            hasFeedback >
            {fieldValidate.insuranceSalesContact()(<Input maxLength="11" />)}
          </FormItem>

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
