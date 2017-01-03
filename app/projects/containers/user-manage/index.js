import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Table, message, Button, Popconfirm } from 'antd'
const TabPane = Tabs.TabPane

import { user as userAction } from '../../actions'

import CreateUser from './create'
import './index.less'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: '1',
      isShow: false
    }

    this.tabChange = this.tabChange.bind(this)
    this.getKey1Columns = this.getKey1Columns.bind(this)
    this.getKey2Columns = this.getKey2Columns.bind(this)
    this.parseKey1Data = this.parseKey1Data.bind(this)
    this.parseKey2Data = this.parseKey2Data.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.sendConfirm = this.sendConfirm.bind(this)
    this.search = this.search.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  componentWillMount() {
    this.search(this.state.activeTabKey)
  }

  tabChange(key) {
    const { activeTabKey } = this.state
    if (+key === +activeTabKey) {
      return
    }
    this.setState({ activeTabKey: key }, () => {
      this.search(key)
    })
  }

  resetPassword (id) {
    const { resetPasswordFunc } = this.props
    const hide = message.loading('', 0)
    resetPasswordFunc(id).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  getKey1Columns () {
    return [{
      title: '业务员账号',
      dataIndex: 'clerkAccount'
    }, {
      title: '业务员名称',
      dataIndex: 'clerkName'
    }, {
      title: '已分配的合同数',
      dataIndex: 'assignedContractNumb'
    }, {
      title: '签约中',
      dataIndex: 'contractIn'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        return (<div>
          <Popconfirm
            title="确定要重置密码吗？"
            onConfirm={this.resetPassword.bind(this, id)}
            okText="确定"
            cancelText="取消">
              <a>重置密码</a>
          </Popconfirm>
        </div>)
      }
    }]
  }

  getKey2Columns () {
    return [{
      title: '审核员账号',
      dataIndex: 'verifyAccount'
    }, {
      title: '审核员名称',
      dataIndex: 'verifyName'
    }, {
      title: '已录入合同',
      dataIndex: 'entryContract'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        return (<div>
          <Popconfirm
            title="确定要重置密码吗？"
            onConfirm={this.resetPassword.bind(this, id)}
            okText="确定"
            cancelText="取消">
              <a>重置密码</a>
          </Popconfirm>
        </div>)
      }
    }]
  }

  parseKey1Data (list) {
    return list.map(item => ({
      clerkAccount: item.account,
      clerkName: item.name,
      assignedContractNumb: item.counts,
      contractIn: item.xcounts,
      handle: item.id
    }))
  }

  parseKey2Data (list) {
    return list.map(item => ({
      verifyAccount: item.account,
      verifyName: item.name,
      entryContract: item.counts,
      handle: item.id
    }))
  }


  toggleShow () {
    this.setState({ isShow: !this.state.isShow })
  }

  sendConfirm (condition) {
    const { createUser } = this.props
    const hide = message.loading('', 0)
    createUser(condition).then(() => {
      this.setState({ isShow: false })
      setTimeout(hide, 0)
      this.search(this.state.activeTabKey)
    }, () => setTimeout(hide, 0))
  }

  search (key) {
    const { queryUserList4key1, queryUserList4key2 } = this.props
    if (+key === 1) {
      queryUserList4key1(key)
    } else {
      queryUserList4key2(key)
    }
  }

  render() {
    const { activeTabKey, isShow } = this.state
    const { list4key1, list4key2 } = this.props
    return (
      <div className="user-list">
        <div className="create-user">
            <Button type="primary" onClick={this.toggleShow}>新建账号</Button>
        </div>
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="业务员" key="1">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list4key1.get('doing')}
                dataSource={this.parseKey1Data(list4key1.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="审核员" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getKey2Columns()}
                loading={list4key2.get('doing')}
                dataSource={this.parseKey2Data(list4key2.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
        </Tabs>

        <CreateUser
          title="新建账号"
          isShow={isShow}
          confirm={this.sendConfirm}
          cancel={this.toggleShow} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list4key1: state.user.userList4key1,
  list4key2: state.user.userList4key2
})
const mapDispatchToProps = (dispatch) => ({
  queryUserList4key1: (condition) => dispatch(userAction.queryUserList4key1(condition)),
  queryUserList4key2: (condition) => dispatch(userAction.queryUserList4key2(condition)),
  createUser: (condition) => dispatch(userAction.createUser(condition)),
  resetPasswordFunc: (id) => dispatch(userAction.resetPassword(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
