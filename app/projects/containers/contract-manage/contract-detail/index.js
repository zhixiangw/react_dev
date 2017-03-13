import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
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
      activeTabKey: '1',
      contractId: null
    }

    this.tabChange = this.tabChange.bind(this)
    this.saveBasicInfo = this.saveBasicInfo.bind(this)
    this.saveCarsInfo = this.saveCarsInfo.bind(this)
    this.saveExecutiveInfo = this.saveExecutiveInfo.bind(this)
  }

  componentWillMount() {
    const { location: { query: { handleType, id } } } = this.props
    if (id && handleType === 'edit') {
      this.setState({ contractId: null })
      this.queryDetail()
    }
  }

  queryDetail (cid) {
    const { location: { query: { id = this.state.contractId } }, queryContractDetail } = this.props
    const hide = message.loading('', 0)
    queryContractDetail(cid || id).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  tabChange (key) {
    if (+key === +this.state.activeTabKey) {
      return
    }
    this.setState({ activeTabKey: key })
  }

  saveBasicInfo (values) {
    const { saveBasicInfoFunc, location: { query: { handleType, id } } } = this.props
    const hide = message.loading('', 0)
    if (handleType === 'edit' && id) {
      values.id = id
    }
    saveBasicInfoFunc(values).then((response) => {
      setTimeout(hide, 0)
      this.setState({ contractId: response.id, contractNo: response.no })
      this.queryDetail(response.id)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  saveCarsInfo (values) {
    const { saveCarsInfoFunc, location: { query: { handleType, id } }, contractDetail } = this.props
    const hide = message.loading('', 0)
    if (handleType === 'edit') {
      values.forEach((item, index) => {
        item.contractId = id
        item.id = contractDetail.getIn(['insurancePolicyList', index]) && contractDetail.getIn(['insurancePolicyList', index, 'id'])
      })
    } else {
      values.forEach(item => {
        item.contractId = this.state.contractId
      })
    }
    saveCarsInfoFunc(values).then(() => {
      setTimeout(hide, 0)
      this.queryDetail()
    }, () => {
      setTimeout(hide, 0)
    })
  }

  saveExecutiveInfo (values) {
    const { saveExecutiveInfoFunc, location: { query: { handleType, id } }, contractDetail } = this.props
    const hide = message.loading('', 0)
    if (handleType === 'edit') {
      values.contractId = id
      values.id = contractDetail.get('contractStatus') && contractDetail.get('contractStatus').toJS().id
    } else {
      values.contractId = this.state.contractId
    }
    saveExecutiveInfoFunc(values).then(() => {
      setTimeout(hide, 0)
      this.queryDetail()
    }, () => {
      setTimeout(hide, 0)
    })
  }

  render() {
    const { activeTabKey } = this.state
    const { contractDetail, location: { query: { handleType, id } }, salesManList, loginInfo } = this.props
    const type = loginInfo.get('type')
    return (
      <div className="customer-manage">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="基础信息" key="1">
            <BasicInfo
              info={handleType !== 'create' && contractDetail.toJS() || {}}
              handleType={handleType}
              type={type}
              id={id}
              salesManList={salesManList.get('dataList').toJS()}
              onSubmit={this.saveBasicInfo} />
          </TabPane>
          <TabPane tab="车辆信息" key="2">
            <CarsInfo
              info={handleType !== 'create' && contractDetail.get('insurancePolicyList') && contractDetail.get('insurancePolicyList').toJS() || [{}]}
              handleType={handleType}
              type={type}
              id={id}
              onSubmit={this.saveCarsInfo} />
          </TabPane>
          <TabPane tab="执行情况" key="3">
            <ExecutiveInfo
              type={type}
              info={handleType !== 'create' && contractDetail.get('contractStatus') && contractDetail.get('contractStatus').toJS() || {}}
              periodicDay={handleType !== 'create' && contractDetail.get('periodicDay') || null}
              repaymentPeriod={handleType !== 'create' && contractDetail.get('repaymentPeriod') || null}
              executionRecordList={handleType !== 'create' && contractDetail.get('executionRecordList') && contractDetail.get('executionRecordList').toJS() || []}
              id={id}
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
  saveExecutiveInfoFunc: (condition) => dispatch(contractAction.saveExecutiveInfo(condition)),
  replaceRouter: (url) => dispatch(replace(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManage)
