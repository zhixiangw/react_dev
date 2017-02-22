import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs, Table, Row, Col, notification, Popover, Select, Input, message, Button } from 'antd'
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
    this.parseKey1Data = this.parseKey1Data.bind(this)
    this.parseKey2Data = this.parseKey2Data.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.search = this.search.bind(this)
  }

  componentWillMount() {
    const condition = {
      type: 1,
      title: null
    }
    this.search(condition)
  }

  tabChange(key) {
    const { title, activeTabKey } = this.state
    if (+key === +activeTabKey) {
      return
    }
    let condition = {
      type: +key,
      title
    }
    this.setState({ activeTabKey: key }, () => {
      this.search(condition)
    })
  }

  getKey1Columns () {
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '单身狗名称',
      dataIndex: 'name'
    }, {
      title: '单身狗性别',
      dataIndex: 'sex'
    }, {
      title: '单身狗狗龄',
      dataIndex: 'age'
    }, {
      title: '单身狗自我估价',
      dataIndex: 'selfPrice'
    }, {
      title: '提交日期',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: `${__STATIC_BASE__}/contractManage/detail`,
          query: {
            id,
            handleType: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.customerName)}>审核</a>
          </div>
        )
      }
    }]
  }

  getKey2Columns () {
    return [{
      title: '单身狗名称',
      dataIndex: 'name'
    }, {
      title: '单身狗性别',
      dataIndex: 'sex'
    }, {
      title: '单身狗狗龄',
      dataIndex: 'age'
    }, {
      title: '单身狗手机',
      dataIndex: 'mobile'
    }, {
      title: '单身狗个性签名',
      dataIndex: 'personalSign'
    }, {
      title: '单身狗自我估价',
      dataIndex: 'selfPrice'
    }, {
      title: '提交日期',
      dataIndex: 'createTime'
    }, {
      title: '是否单身狗会员',
      dataIndex: 'isMember'
    }, {
      title: '是否潜在单身狗',
      dataIndex: 'isPotential'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: `${__STATIC_BASE__}/contractManage/detail`,
          query: {
            id,
            handleType: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.customerName)}>查看头像</a>
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
      handle: item.id
    }))
  }

  toggleShow (name) {
    this.setState({ isShow: !this.state.isShow, currentName: name || this.state.currentName })
  }

  handleChange (field, e) {
    this.setState({ [field]: e && e.target ? e.target.value : e })
  }

  handleSearch (value) {
    this.setState({ name: value })
    const { activeTabKey, selectType } = this.state
    let condition = {
      status: +activeTabKey,
      isPotential: selectType === 'all' ? null : +selectType,
      name: value
    }
    this.search(condition)
  }

  search (condition) {
    const { queryContractList4key1, queryContractList4key2 } = this.props
    if (condition.status === 1) {
      queryContractList4key1(condition)
    } else if (condition.status === 2) {
      queryContractList4key2(condition)
    }
  }

  operations () {
    const { selectType } = this.state
    return (
      <Row style={{ width: '400px' }}>
        <Col span="8">
        {
          <Select value={selectType} onChange={this.handleChange.bind(this, 'selectType')} style={{ width: '100%' }} >
            <Option value="all">全部</Option>
            <Option value="0">当下单身狗</Option>
            <Option value="1">潜在单身狗</Option>
          </Select>
        }
        </Col>
        <Col span="16">
          <Search placeholder="请输入单身狗名称" onSearch={this.handleSearch} style={{ width: '100%' }} />
        </Col>
      </Row>
    )
  }

  createContractButton () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    if (type === 'admin') {
      const option = {
        pathname: `${__STATIC_BASE__}/contractManage/detail`,
        query: {
          handleType: 'create'
        }
      }
      return <Link to={option}><Button type="primary">创建单身狗</Button></Link>
    }
    return null
  }

  render() {
    const { activeTabKey } = this.state
    const { list4key1, list4key2 } = this.props
    return (
      <div className="contract-list">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange}
          tabBarExtraContent={activeTabKey !== '1' && this.operations() || this.createContractButton()}>
          <TabPane tab="待审核" key="1">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list4key1.get('doing')}
                dataSource={this.parseKey1Data(list4key1.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="审核通过" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getKey2Columns()}
                loading={list4key2.get('doing')}
                dataSource={this.parseKey2Data(list4key2.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list4key1: state.contract.contractList4key1,
  list4key2: state.contract.contractList4key2,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  queryContractList4key1: (condition) => dispatch(contractAction.queryContractList4key1(condition)),
  queryContractList4key2: (condition) => dispatch(contractAction.queryContractList4key2(condition)),
  sendNotification: (condition) => dispatch(contractAction.sendNotification(condition)),
  deleteContract: () => dispatch(contractAction.deleteContract())
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractList)
