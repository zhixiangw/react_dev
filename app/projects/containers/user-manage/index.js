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
    this.getColumns = this.getColumns.bind(this)
    this.parseData = this.parseData.bind(this)
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
    resetPasswordFunc({ id }).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  getColumns (key) {
    return [{
      title: `${+key === 1 ? '管理' : '审核'}员账号`,
      dataIndex: 'account'
    }, {
      title: `${+key === 1 ? '管理' : '审核'}员名称`,
      dataIndex: 'name'
    }, {
      title: `${+key === 1 ? '管理' : '审核'}员联系方式`,
      dataIndex: 'mobile'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id) => {
        const { loginInfo } = this.props
        const readOnly = +loginInfo.get('type') !== 1
        return (!readOnly && <div>
          <Popconfirm
            title="确定要重置密码吗？"
            onConfirm={this.resetPassword.bind(this, id)}
            okText="确定"
            cancelText="取消">
              <a>重置密码</a>
          </Popconfirm>
        </div> || '--')
      }
    }]
  }

  parseData (list) {
    return list.map(item => ({
      account: item.account,
      name: item.name,
      mobile: item.mobile,
      handle: item.id
    }))
  }


  toggleShow () {
    this.setState({ isShow: !this.state.isShow })
  }

  sendConfirm (condition) {
    const { createUser } = this.props
    const { activeTabKey } = this.state
    const hide = message.loading('', 0)
    createUser(condition).then(() => {
      this.setState({ isShow: false })
      this.search(activeTabKey)
      setTimeout(hide, 0)
    }, () => setTimeout(hide, 0))
  }

  search (key) {
    const { queryUserList } = this.props
    queryUserList(+key)
  }

  render() {
    const { activeTabKey, isShow } = this.state
    const { list, loginInfo } = this.props
    const readOnly = +loginInfo.get('type') !== 1
    return (
      <div className="user-list">
        {
          !readOnly ? (
            <div className="create-user">
              <Button type="primary" onClick={this.toggleShow}>新建账号</Button>
            </div>
          ) : null
        }
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="管理员" key="1">
            <div className="tabel-box">
              <Table
                columns={this.getColumns(+activeTabKey)}
                loading={list.get('doing')}
                dataSource={this.parseData(list.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="审核员" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getColumns(+activeTabKey)}
                loading={list.get('doing')}
                dataSource={this.parseData(list.get('dataList').toJS() || [])}
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
  list: state.user.userList,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  queryUserList: (key) => dispatch(userAction.queryUserList(key)),
  createUser: (condition) => dispatch(userAction.createUser(condition)),
  resetPasswordFunc: (id) => dispatch(userAction.resetPassword(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
