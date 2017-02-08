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
      title: '',
      businessLicencePath: '',
      driverLicensePath: '',
      attachmentPath: '',
      insuranceAttachmentPath: '',
      otherAttachmentPath: ''
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
    const { title, selectType, activeTabKey } = this.state
    if (+key === +activeTabKey) {
      return
    }
    let condition = {
      type: +key,
    }
    if (+key > 1) {
      condition.title = title
      condition.status = selectType === 'all' ? '' : +selectType
    }
    this.setState({ activeTabKey: key, selectType: 'all' }, () => {
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
      dataIndex: 'no'
    }, {
      title: '客户姓名',
      dataIndex: 'customer'
    }, {
      title: '手续费状态',
      dataIndex: 'serviceCharge'
    }, {
      title: '首期保费',
      dataIndex: 'initialPremium'
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
            <a onClick={this.toggleShow.bind(this,
              cord.customer,
              cord.businessLicencePath,
              cord.driverLicensePath,
              cord.attachmentPath,
              cord.insuranceAttachmentPath,
              cord.otherAttachmentPath)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customer, cord.index)}
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
      dataIndex: 'no'
    }, {
      title: '客户姓名',
      dataIndex: 'customer'
    }, {
      title: '业务状态',
      dataIndex: 'status'
    }, {
      title: '剩余借款金额',
      dataIndex: 'notPaidAmount'
    }, {
      title: '总借款金额',
      dataIndex: 'loanMoney'
    }, {
      title: '每期扣款时间',
      dataIndex: 'periodicDay',
      render: (periodicDay) => `每月${periodicDay}号`
    }, {
      title: '当期还款状态',
      dataIndex: 'repaymentStatus'
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
            <a onClick={this.toggleShow.bind(this,
              cord.customer,
              cord.businessLicencePath,
              cord.driverLicensePath,
              cord.attachmentPath,
              cord.insuranceAttachmentPath,
              cord.otherAttachmentPath)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customer, cord.index)}
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
      dataIndex: 'no'
    }, {
      title: '客户姓名',
      dataIndex: 'customer'
    }, {
      title: '结束原因',
      dataIndex: 'endReason'
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
            <a onClick={this.toggleShow.bind(this,
              cord.customer,
              cord.businessLicencePath,
              cord.driverLicensePath,
              cord.attachmentPath,
              cord.insuranceAttachmentPath,
              cord.otherAttachmentPath)}>附件</a>
            &nbsp;&nbsp;
            { type !== 'salesman' ?
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.customer, cord.index)}
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
    const obj = {
      1: '未缴费',
      2: '已缴费'
    }
    return list.map((item, index) => ({
      index: index + 1,
      no: item.no,
      customer: item.customer,
      serviceCharge: obj[+item.contractStatus.serviceCharge] || '--',
      initialPremium: obj[+item.contractStatus.initialPremium] || '--',
      businessLicencePath: item.businessLicencePath,
      driverLicensePath: item.insurancePolicyList && item.insurancePolicyList[0].driverLicensePath,
      attachmentPath: item.attachmentPath,
      insuranceAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].insuranceAttachmentPath,
      otherAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].otherAttachmentPath,
      handle: item.id
    }))
  }

  parseKey2Data (list) {
    const repaymentStatusObj = {
      1: '当期已还',
      2: '警告一次',
      3: '欠缴费',
      4: '当期待还'
    }
    return list.map((item, index) => ({
      index: index + 1,
      no: item.no,
      customer: item.customer,
      status: item.status,
      notPaidAmount: item.contractStatus.notPaid && Number(item.contractStatus.notPaid).toFixed(2) || '--',
      loanMoney: item.loanMoney,
      periodicDay: item.periodicDay,
      repaymentStatus: repaymentStatusObj[+item.contractStatus.repaymentStatus] || '--',
      businessLicencePath: item.businessLicencePath,
      driverLicensePath: item.insurancePolicyList && item.insurancePolicyList[0].driverLicensePath,
      attachmentPath: item.attachmentPath,
      insuranceAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].insuranceAttachmentPath,
      otherAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].otherAttachmentPath,
      handle: item.id
    }))
  }

  parseKey3Data (list) {
    const endReasonObj = {
      1: '正常还款完成',
      2: '提前还款已结束',
      3: '已退保',
      4: '车辆全损已结清',
      5: '合同报废'
    }
    return list.map((item, index) => ({
      index: index + 1,
      no: item.no,
      customer: item.customer,
      endReason: endReasonObj[+item.contractStatus.endReason] || '--',
      businessLicencePath: item.businessLicencePath,
      driverLicensePath: item.insurancePolicyList && item.insurancePolicyList[0].driverLicensePath,
      attachmentPath: item.attachmentPath,
      insuranceAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].insuranceAttachmentPath,
      otherAttachmentPath: item.insurancePolicyList && item.insurancePolicyList[0].otherAttachmentPath,
      handle: item.id
    }))
  }

  toggleShow (name, ...rest) {
    this.setState({ isShow: !this.state.isShow,
      currentName: name || this.state.currentName,
      businessLicencePath: rest[0],
      driverLicensePath: rest[1],
      attachmentPath: rest[2],
      insuranceAttachmentPath: rest[3],
      otherAttachmentPath: rest[4],
    })
  }

  handleMore (contractId, customer, listIndex, name, type) {
    let isNeedConfirm = true
    // 请求接口，获取是否需要确认的字段
    if (!isNeedConfirm && type <= 3) {
      notification.warning({
        message: name,
        description: type <= 3 ? `${customer}本期已经${name.replace('通知', '')},
        无需发送${name}` : `第三方客户已经向${customer}客户扣款成功，无需发送${name}`
      })
    } else {
      this.setState({ isModalShow: true, type, contractId, currentName: customer })
    }
    this.setState({ [`isPopShow4key${this.state.activeTabKey}${listIndex}`]: false })
  }

  getContent (contractId, customer, listIndex) {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    let optionArr = [
      { name: '放款通知', type: 1 },
      { name: '还款通知', type: 2 },
      { name: '扣款通知', type: 3 },
      { name: '删除合同', type: 4 }
    ]
    if (+this.state.activeTabKey === 3) {
      optionArr.splice(0, 3)
    } else if (type === 'verify') {
      optionArr.shift()
    }
    return (
      optionArr.map((item, index) =>
        <p key={index + 1} className="list-popover-content"
          onClick={this.handleMore.bind(this, contractId, customer, listIndex, item.name, item.type)} >
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
    const { type, contractId } = this.state
    const { sendNotification, deleteContract } = this.props
    const condition = {
      type,
      contractId
    }
    const hide = message.loading('', 0)
    if (type === 4) {
      deleteContract(contractId).then(() => {
        this.hideComfrimModal()
        this.handleSearch(this.state.value)
        setTimeout(hide, 0)
      })
    } else {
      sendNotification(condition).then(() => {
        this.hideComfrimModal()
        this.handleSearch(this.state.value)
        setTimeout(hide, 0)
      })
    }
  }

  handleChange (field, e) {
    this.setState({ [field]: e && e.target ? e.target.value : e }, () => {
      if (field === 'selectType') {
        this.handleSearch(this.state.value)
      }
    })
  }

  handleSearch (value) {
    this.setState({ title: value })
    const { activeTabKey, selectType } = this.state
    let condition = {
      type: +activeTabKey,
      status: selectType === 'all' ? '' : +selectType,
      title: value
    }
    this.search(condition)
  }

  search (condition) {
    const { queryContractList4key1, queryContractList4key2, queryContractList4key3 } = this.props
    if (condition.type === 1) {
      queryContractList4key1(condition).catch((err) => console.info(err))
    } else if (condition.type === 2) {
      queryContractList4key2(condition).catch((err) => console.info(err))
    } else {
      queryContractList4key3(condition).catch((err) => console.info(err))
    }
  }

  operations () {
    const { selectType, activeTabKey } = this.state
    return (
      <Row style={{ width: '400px' }}>
        <Col span="8">
        {
          +activeTabKey === 2 ?
          <Select value={selectType} onChange={this.handleChange.bind(this, 'selectType')} style={{ width: '100%' }} >
            <Option value="all">全部</Option>
            <Option value="1">当期还清</Option>
            <Option value="2">一次警告</Option>
            <Option value="3">欠缴费</Option>
          </Select> : +activeTabKey === 3 &&
          <Select value={selectType} onChange={this.handleChange.bind(this, 'selectType')} style={{ width: '100%' }} >
            <Option value="all">全部</Option>
            <Option value="1">正常还款完成</Option>
            <Option value="2">提前还款已结束</Option>
            <Option value="3">已退保</Option>
            <Option value="4">车辆全损已结清</Option>
            <Option value="5">合同报废</Option>
          </Select>
        }
        </Col>
        <Col span="16">
          <Search placeholder="请输入合同编号/客户名称" onSearch={this.handleSearch} style={{ width: '100%' }} />
        </Col>
      </Row>
    )
  }

  createContractButton () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    if (type !== 'salesman') {
      const option = {
        pathname: `${__STATIC_BASE__}/contractManage/detail`,
        query: {
          handleType: 'create'
        }
      }
      return <Link to={option}><Button type="primary">新建合同</Button></Link>
    }
    return null
  }

  render() {
    const { activeTabKey,
            isShow,
            isModalShow,
            currentName,
            type,
            businessLicencePath,
            driverLicensePath,
            attachmentPath,
            insuranceAttachmentPath,
            otherAttachmentPath } = this.state
    const { list4key1, list4key2, list4key3 } = this.props
    return (
      <div className="contract-list">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange}
          tabBarExtraContent={activeTabKey !== '1' && this.operations() || this.createContractButton()}>
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
          businessLicencePath={businessLicencePath}
          driverLicensePath={driverLicensePath}
          attachmentPath={attachmentPath}
          insuranceAttachmentPath={insuranceAttachmentPath}
          otherAttachmentPath={otherAttachmentPath}
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
  deleteContract: (contractId) => dispatch(contractAction.deleteContract(contractId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContractList)
