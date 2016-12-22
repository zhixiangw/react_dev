import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs, Table, Row, Col, notification, Popover, Select, Input, message } from 'antd'
const TabPane = Tabs.TabPane
const Search = Input.Search
const Option = Select.Option

import { contract as contractAction } from '../../../actions'

import Attachment from './attachment'
import ConfirmModal from './confirm-modal'
import './index.less'

class ContractList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: '1',
      isShow: false,
      isModalShow: false,
      type: 1,
      currentName: '',
      selectType: 'all',
      title: ''
    }

    this.tabChange = this.tabChange.bind(this)
    this.getKey1Columns = this.getKey1Columns.bind(this)
    this.getKey2Columns = this.getKey2Columns.bind(this)
    this.getKey3Columns = this.getKey3Columns.bind(this)
    this.parseKey1Data = this.parseKey1Data.bind(this)
    this.parseKey2Data = this.parseKey2Data.bind(this)
    this.parseKey3Data = this.parseKey3Data.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.getContent = this.getContent.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleMore = this.handleMore.bind(this)
    this.hideComfrimModal = this.hideComfrimModal.bind(this)
    this.sendConfirm = this.sendConfirm.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.search = this.search.bind(this)
  }

  componentWillMount() {
    const condition = {
      type: 1,
    }
    this.search(condition)
  }

  tabChange(key) {
    const { title, selectType } = this.state
    let condition = {
      type: +key,
    }
    if (+key > 1) {
      condition.title = title
      condition.status = selectType === 'all' ? null : +selectType
    }
    this.setState({ activeTabKey: key }, () => {
      this.search(condition)
    })
  }

  getKey1Columns () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '合同编号',
      dataIndex: 'contractCode'
    }, {
      title: '客户姓名',
      dataIndex: 'customerName'
    }, {
      title: '手续费状态',
      dataIndex: 'poundageStatus'
    }, {
      title: '首期保费',
      dataIndex: 'initialPremium'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: '/contractManage/detail',
          query: {
            id,
            type: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.customerName)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customerName, cord.index, cord.isNeedConfirm)}
              trigger="click"
              visible={this.state[`isPopShow4key1${cord.index}`]}
              onVisibleChange={this.handleVisibleChange.bind(this, cord.index)} >
                <a>更多</a>
            </Popover> : null
            }
          </div>
        )
      }
    }]
  }

  getKey2Columns () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    return [{
      title: '合同编号',
      dataIndex: 'contractCode'
    }, {
      title: '客户姓名',
      dataIndex: 'customerName'
    }, {
      title: '业务状态',
      dataIndex: 'status'
    }, {
      title: '剩余借款金额',
      dataIndex: 'surplusLoanAmount'
    }, {
      title: '总借款金额',
      dataIndex: 'totalLoanAmount'
    }, {
      title: '每期扣款时间',
      dataIndex: 'eachChargeTime',
      render: (eachChargeTime) => `每月${eachChargeTime}号`
    }, {
      title: '当期还款状态',
      dataIndex: 'currentRepaymentStatus'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: '/contractManage/detail',
          query: {
            id,
            type: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.customerName)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customerName, cord.index, cord.isNeedConfirm)}
              trigger="click"
              visible={this.state[`isPopShow4key2${cord.index}`]}
              onVisibleChange={this.handleVisibleChange.bind(this, cord.index)} >
                <a>更多</a>
            </Popover> : null
            }
          </div>
        )
      }
    }]
  }

  getKey3Columns () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '合同编号',
      dataIndex: 'contractCode'
    }, {
      title: '客户姓名',
      dataIndex: 'customerName'
    }, {
      title: '结束原因',
      dataIndex: 'endReason'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: '/contractManage/detail',
          query: {
            id,
            type: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.customerName)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customerName, cord.index, cord.isNeedConfirm)}
              trigger="click"
              visible={this.state[`isPopShow4key3${cord.index}`]}
              onVisibleChange={this.handleVisibleChange.bind(this, cord.index)} >
                <a>更多</a>
            </Popover> : null
            }
          </div>
        )
      }
    }]
  }

  parseKey1Data (list) {
    return list.map((item, index) => ({
      index: index + 1,
      contractCode: item.contractCode,
      customerName: item.customerName,
      poundageStatus: item.poundageStatus,
      initialPremium: item.initialPremium,
      isNeedConfirm: item.isNeedConfirm,
      handle: item.id
    }))
  }

  parseKey2Data (list) {
    return list.map((item, index) => ({
      index: index + 1,
      contractCode: item.contractCode,
      customerName: item.customerName,
      status: item.status,
      surplusLoanAmount: item.surplusLoanAmount,
      totalLoanAmount: item.totalLoanAmount,
      eachChargeTime: item.eachChargeTime,
      currentRepaymentStatus: item.currentRepaymentStatus,
      isNeedConfirm: item.isNeedConfirm,
      handle: item.id
    }))
  }

  parseKey3Data (list) {
    return list.map((item, index) => ({
      index: index + 1,
      contractCode: item.contractCode,
      customerName: item.customerName,
      endReason: item.endReason,
      isNeedConfirm: item.isNeedConfirm,
      handle: item.id
    }))
  }

  toggleShow (name) {
    this.setState({ isShow: !this.state.isShow, currentName: name || this.state.currentName })
  }

  handleMore (customerId, customer, listIndex, name, type, isNeedConfirm) {
    if (!isNeedConfirm && type <= 3) {
      notification.warning({
        message: name,
        description: type <= 3 ? `${customer}本期已经${name.replace('通知', '')},
        无需发送${name}` : `第三方客户已经向${customer}客户扣款成功，无需发送${name}`
      })
    } else {
      this.setState({ isModalShow: true, type, customerId, currentName: customer })
    }
    this.setState({ [`isPopShow4key${this.state.activeTabKey}${listIndex}`]: false })
  }

  getContent (customerId, customer, listIndex, isNeedConfirm) {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    let optionArr = [
      { name: '放款通知', type: 1 },
      { name: '还款通知', type: 2 },
      { name: '扣款通知', type: 3 },
      { name: '删除合同', type: 4 }
    ]
    if (type === 'verify') {
      optionArr.shift()
    }
    return (
      optionArr.map((item, index) =>
        <p key={index + 1} className="list-popover-content"
          onClick={this.handleMore.bind(this, customerId, customer, listIndex, item.name, item.type, isNeedConfirm)} >
            {item.name}
        </p>
      )
    )
  }

  handleVisibleChange (index, visible) {
    const { activeTabKey } = this.state
    this.setState({ [`isPopShow4key${activeTabKey}${index}`]: visible })
  }

  hideComfrimModal () {
    this.setState({ isModalShow: false })
  }

  sendConfirm () {
    const { type, customerId } = this.state
    const { sendNotification, deleteContract } = this.props
    const condition = {
      type,
      customerId
    }
    const hide = message.loading('', 0)
    if (type === 4) {
      deleteContract().then(() => {
        this.hideComfrimModal()
        setTimeout(hide, 0)
      })
    } else {
      sendNotification(condition).then(() => {
        this.hideComfrimModal()
        setTimeout(hide, 0)
      })
    }
  }

  handleChange (field, e) {
    this.setState({ [field]: e && e.target ? e.target.value : e })
  }

  handleSearch (value) {
    this.setState({ title: value })
    const { activeTabKey, selectType } = this.state
    let condition = {
      type: +activeTabKey,
      status: selectType === 'all' ? null : +selectType,
      title: value
    }
    this.search(condition)
  }

  search (condition) {
    const { queryContractList4key1, queryContractList4key2, queryContractList4key3 } = this.props
    if (condition.type === 1) {
      queryContractList4key1(condition)
    } else if (condition.type === 2) {
      queryContractList4key2(condition)
    } else {
      queryContractList4key3(condition)
    }
  }

  operations () {
    const { selectType } = this.state
    return (
      <Row style={{ width: '400px' }}>
        <Col span="6">
          <Select value={selectType} onChange={this.handleChange.bind(this, 'selectType')} style={{ width: '100%' }} >
            <Option value="all">全部</Option>
            <Option value="1">当期还清</Option>
            <Option value="2">一次警告</Option>
            <Option value="3">前缴费</Option>
          </Select>
        </Col>
        <Col span="18">
          <Search placeholder="请输入合同编号/客户名称" onSearch={this.handleSearch} style={{ width: '100%' }} />
        </Col>
      </Row>
    )
  }

  render() {
    const { activeTabKey, isShow, isModalShow, currentName, type } = this.state
    const { list4key1, list4key2, list4key3 } = this.props
    return (
      <div className="contract-list">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange}
          tabBarExtraContent={activeTabKey !== '1' && this.operations() || null}>
          <TabPane tab="签约中" key="1">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list4key1.get('doing')}
                dataSource={this.parseKey1Data(list4key1.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="还款中" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getKey2Columns()}
                loading={list4key2.get('doing')}
                dataSource={this.parseKey2Data(list4key2.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="已结束" key="3">
            <div className="tabel-box">
              <Table
                columns={this.getKey3Columns()}
                loading={list4key3.get('doing')}
                dataSource={this.parseKey3Data(list4key3.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
        </Tabs>

        <Attachment
          isShow={isShow}
          cancel={this.toggleShow.bind(this, null)}
          title={`${currentName}附件资料下载`} />

        <ConfirmModal
          isShow={isModalShow}
          cancel={this.hideComfrimModal}
          confirm={this.sendConfirm}
          title={`${type === 3 ? '扣款' : type === 1 && '放款' || type === 2 && '还款' || type === 4 && '删除合同'}通知`} >
            <p>
              { type < 3 ? `是否通知${currentName}客户进行${type === 1 && '放款' || '还款'}`
                : type === 3 && `是否通知第三方向${currentName}客户进行扣款`
                || '是否删除合同'
              }
            </p>
        </ConfirmModal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list4key1: state.contract.contractList4key1,
  list4key2: state.contract.contractList4key2,
  list4key3: state.contract.contractList4key3,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  queryContractList4key1: (condition) => dispatch(contractAction.queryContractList4key1(condition)),
  queryContractList4key2: (condition) => dispatch(contractAction.queryContractList4key2(condition)),
  queryContractList4key3: (condition) => dispatch(contractAction.queryContractList4key3(condition)),
  sendNotification: (condition) => dispatch(contractAction.sendNotification(condition)),
  deleteContract: () => dispatch(contractAction.deleteContract())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractList)
