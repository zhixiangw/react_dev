import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

import { test as testAction } from '../../actions'

import './index.less'
import BasicInfo from './basic-info'
import CarsInfo from './cars-info'
import ExecutiveInfo from './executive-info'

class CustomerManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: '1'
    }

    this.tabChange = this.tabChange.bind(this)
    this.saveBasicInfo = this.saveBasicInfo.bind(this)
    this.saveCarsInfo = this.saveCarsInfo.bind(this)
    this.saveExecutiveInfo = this.saveExecutiveInfo.bind(this)
  }

  tabChange (key) {
    this.setState({ activeTabKey: key })
  }

  saveBasicInfo (values) {
    console.info(values)
  }

  saveCarsInfo (values) {
    console.info(values)
  }

  saveExecutiveInfo (values) {
    console.info(values)
  }

  render() {
    const { activeTabKey } = this.state
    return (
      <div className="customer-manage">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="基础信息" key="1">
            <BasicInfo
              onSubmit={this.saveBasicInfo} />
          </TabPane>
          <TabPane tab="车辆信息" key="2">
            <CarsInfo
              onSubmit={this.saveCarsInfo} />
          </TabPane>
          <TabPane tab="执行情况" key="3">
            <ExecutiveInfo
              onSubmit={this.saveExecutiveInfo} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.test.testFetch
})
const mapDispatchToProps = (dispatch) => ({
  sendAsyncAction: () => dispatch(testAction.testFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage)
