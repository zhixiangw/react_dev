import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Input, Form, Select, Button, Row, Col, Timeline, Progress } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import validata from './validate'
import './index.less'

class BasicInfo extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { form: { validateFields, getFieldsValue }, onSubmit } = this.props
    validateFields((errors) => {
      if (!!errors) return
      const feildValues = getFieldsValue()
      onSubmit(feildValues)
    })
  }

  handleUpload (e) {
    console.info(e)
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const fieldValidata = validata(getFieldDecorator)
    return (
      <div className="executive-info-form-box">
        <Row type="flex">
          <Col span="10">
            <section className="logic-status">
              <Form horizontal>
                <FormItem
                  {...formItemLayout}
                  label="手续费状态"
                  hasFeedback >
                  {fieldValidata.feeStatus()(
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
                  {fieldValidata.initialPremium()(
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
                  {fieldValidata.contractStatus()(
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
                    {fieldValidata.contractEndReason()(
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
            <section>
              <Progress type="circle" percent={65} />
            </section>
          </Col>

          <Col span="14">
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </Col>
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
