import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Select, Button, Row, Col, Timeline, Progress } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import validate from './validate'
import './index.less'

class BasicInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { info, form: { setFieldsValue } } = this.props
    setFieldsValue(info)
  }

  componentDidUpdate (prevProps) {
    const { info, form: { setFieldsValue } } = this.props
    if (info !== prevProps.info) {
      setFieldsValue(info)
    }
  }

  handleSubmit () {
    const { form: { validateFields }, onSubmit } = this.props
    validateFields((errors, values) => {
      if (!!errors) {
        return
      }
      onSubmit(values)
    })
  }

  getTimelineItem (record) {
    return record.map((item, index) => {
      return (
        <Timeline.Item key={index}>
          { item.title ? <p className="time-line-title" >{item.title}</p> : null }
          { item.content.map((list, cindex) => <p key={`p${cindex}`}>{`${list.time}  ${list.desc}`}</p>) }
        </Timeline.Item>
      )
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, info, eachChargeTime } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    const fieldValidate = validate(getFieldDecorator)
    return (
      <div className="executive-info-form-box">
        <Row type="flex">
          <Col span="10">
            <section className="logic-status">
              <p className="logic-status-title">业务状态</p>
              <Form horizontal>
                <FormItem
                  {...formItemLayout}
                  label="手续费状态"
                  hasFeedback >
                  {fieldValidate.feeStatus()(
                    <Select placeholder="请选择">
                      <Option value={'1'}>未缴费</Option>
                      <Option value={'2'}>已缴费</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="首期保费"
                  hasFeedback >
                  {fieldValidate.initialPremium()(
                    <Select placeholder="请选择">
                      <Option value={'1'}>未缴费</Option>
                      <Option value={'2'}>已缴费</Option>
                    </Select>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="是否放款"
                  hasFeedback >
                  <p>{'未放款'}</p>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="合同状态"
                  hasFeedback >
                  {fieldValidate.contractStatus()(
                    <Select placeholder="请选择">
                      <Option value={'1'}>签约中</Option>
                      <Option value={'2'}>还款中</Option>
                      <Option value={'3'}>已结束</Option>
                    </Select>
                  )}
                </FormItem>

                { +getFieldValue('contractStatus') === 3 ?
                  <FormItem
                    {...formItemLayout}
                    label="合同结束原因"
                    hasFeedback >
                    {fieldValidate.contractEndReason()(
                      <Select placeholder="请选择">
                        <Option value={'1'}>正常还款完成</Option>
                        <Option value={'2'}>提前还款已结束</Option>
                        <Option value={'3'}>已退保</Option>
                        <Option value={'4'}>车辆全损已结清</Option>
                        <Option value={'5'}>合同报废</Option>
                      </Select>
                    )}
                  </FormItem> : null
                }
              </Form>
            </section>
            <section className="logic-status">
              <p className="logic-status-title" style={{ margin: 0 }}>还款完成度</p>
              <p className="logic-status-content">{`剩余${Number(info.surplusAmount).toFixed(2)}未结清`}</p>
              <div className="logic-progress">
                <Progress type="circle" percent={+info.repaymentSchedule || 0} />
              </div>
            </section>
          </Col>

          <Col span="14">
            <section className="logic-status">
              <p className="logic-status-title" style={{ margin: 0 }}>执行记录</p>
              <p className="logic-status-content">{`每月${eachChargeTime}号发送扣款指令，并提前两天短信通知客户`}</p>
              <Row>
                <Col span="20" offset="4">
                  <Timeline>
                    {this.getTimelineItem(info.repaymentRecord)}
                  </Timeline>
                </Col>
              </Row>

            </section>
          </Col>
        </Row>

        <Row style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
        </Row>
      </div>
    )
  }
}

BasicInfo = Form.create()(BasicInfo)
const mapStateToProps = (state) => ({
  list: state.test.testFetch
})

export default connect(mapStateToProps)(BasicInfo)
