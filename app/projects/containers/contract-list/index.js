import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Tabs, Table, Row, Col, notification, Popover, Select, Input } from 'antd'
const TabPane = Tabs.TabPane
const Search = Input.Search
const Option = Select.Option

import Attachment from './attachment'
import ConfirmModal from './confirm-modal'
import './index.less'

class ContractList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: "1",
      isShow: false,
      isPopShow: false,
      isModalShow: false,
      type: 1,
      currentName: '',
      selectType: 'all'
    }

    this.tabChange = this.tabChange.bind(this)
    this.getKey1Columns = this.getKey1Columns.bind(this)
    this.parseKey1Data = this.parseKey1Data.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.getContent = this.getContent.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.handleMore = this.handleMore.bind(this)
    this.hideComfrimModal = this.hideComfrimModal.bind(this)
    this.sendConfirm = this.sendConfirm.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  tabChange(key) {
    this.setState({ activeTabKey: key })
  }

  getKey1Columns () {
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '合同编号',
      dataIndex: 'title'
    }, {
      title: '客户姓名',
      dataIndex: 'author'
    }, {
      title: '手续费状态',
      dataIndex: 'lastReplyTime'
    }, {
      title: '首期保费',
      dataIndex: 'id'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: '/userManager',
          query: {
            id,
            type: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <a onClick={this.toggleShow.bind(this, cord.author)}>附件</a>
            &nbsp;&nbsp;
            <Popover
              placement="bottom"
              content={this.getContent(id, cord.author, cord.index)}
              trigger="click"
              visible={this.state[`isPopShow${cord.index}`]}
              onVisibleChange={this.handleVisibleChange.bind(this, cord.index)} >
                <a>更多</a>
            </Popover>
          </div>
        )
      }
    }]
  }

  parseKey1Data (list) {
    return list.map((item, index) => ({
      index,
      title: item.title,
      author: item.author && item.author.loginname,
      lastReplyTime: item.last_reply_at,
      id: item.id,
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
      this.setState({ isModalShow: true,  type, customerId, currentName: customer})
    }
    this.setState({ [`isPopShow${listIndex}`]: false })
  }

  getContent (customerId, customer, listIndex) {
    const optionArr = [
      { name: '放款通知', type: 1, isNeedConfirm: false },
      { name: '还款通知', type: 2, isNeedConfirm: true },
      { name: '扣款通知', type: 3, isNeedConfirm: true },
      { name: '删除合同', type: 4 }
    ]
    return (
      optionArr.map((item, index) =>
        <p key={index + 1} className="list-popover-content"
          onClick={this.handleMore.bind(this, customerId, customer, listIndex, item.name, item.type, item.isNeedConfirm)} >
            {item.name}
        </p>
      )
    )
  }

  handleVisibleChange (index, visible) {
    this.setState({ [`isPopShow${index}`]: visible })
  }

  hideComfrimModal () {
    this.setState({ isModalShow: false })
  }

  sendConfirm () {
    const { type, customerId } = this.state
    console.info(type, customerId)
    this.hideComfrimModal()
  }

  handleChange (field, e) {
    this.setState({ [field]: e && e.target ? e.target.value : e })
  }

  handleSearch (value) {
    console.info(value)
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
    const { list } = this.props
    const listData = list.getIn(['data', 'recent_replies']) && list.getIn(['data', 'recent_replies']).toJS()
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
                loading={list.get('doing')}
                dataSource={this.parseKey1Data(listData || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="还款中" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list.get('doing')}
                dataSource={this.parseKey1Data(listData || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="已结束" key="3">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list.get('doing')}
                dataSource={this.parseKey1Data(listData || [])}
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
                || `是否删除合同`
              }
            </p>
        </ConfirmModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContractList)