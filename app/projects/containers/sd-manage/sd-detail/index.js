import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, message } from 'antd'
const TabPane = Tabs.TabPane

import { contract as contractAction } from '../../../actions'

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

  componentWillMount() {
    const { location: { query: { handleType, id } }, queryContractDetail } = this.props
    if (id && handleType === 'edit') {
      const hide = message.loading('', 0)
      queryContractDetail(id).then(() => {
        setTimeout(hide, 0)
      }, () => {
        setTimeout(hide, 0)
      })
    }
  }

  tabChange (key) {
    if (+key === +this.state.activeTabKey) {
      return
    }
    this.setState({ activeTabKey: key })
  }

  saveBasicInfo (values) {
    const { saveBasicInfoFunc } = this.props
    const hide = message.loading('', 0)
    saveBasicInfoFunc(values).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  saveCarsInfo (values) {
    const { saveCarsInfoFunc } = this.props
    const hide = message.loading('', 0)
    saveCarsInfoFunc(values).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  saveExecutiveInfo (values) {
    const { saveExecutiveInfoFunc } = this.props
    const hide = message.loading('', 0)
    saveExecutiveInfoFunc(values).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  render() {
    const { activeTabKey } = this.state
    const { contractDetail, location: { query: { handleType } }, salesManList } = this.props
    return (
      <div className="customer-manage">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="基础信息" key="1">
            <BasicInfo
              info={handleType !== 'create' && contractDetail.get('basicInfo').toJS() || {}}
              handleType={handleType}
              salesManList={salesManList.get('dataList').toJS()}
              onSubmit={this.saveBasicInfo} />
          </TabPane>
          <TabPane tab="车辆信息" key="2">
            <CarsInfo
              info={handleType !== 'create' && contractDetail.get('carsInfo').toJS() || {}}
              handleType={handleType}
              onSubmit={this.saveCarsInfo} />
          </TabPane>
          <TabPane tab="执行情况" key="3">
            <ExecutiveInfo
              info={handleType !== 'create' && contractDetail.get('executiveInfo').toJS() || {}}
              eachChargeTime={handleType !== 'create' && contractDetail.getIn(['basicInfo', 'eachChargeTime']) || null}
              onSubmit={this.saveExecutiveInfo} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  contractDetail: state.contract.contractDetail,
  salesManList: state.user.userList4key1,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  queryContractDetail: (id) => dispatch(contractAction.queryContractDetail(id)),
  saveBasicInfoFunc: (condition) => dispatch(contractAction.saveBasicInfo(condition)),
  saveCarsInfoFunc: (condition) => dispatch(contractAction.saveCarsInfo(condition)),
  saveExecutiveInfoFunc: (condition) => dispatch(contractAction.saveExecutiveInfo(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage)
