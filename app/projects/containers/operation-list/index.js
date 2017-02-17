import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, message, Button } from 'antd'

import { operation as operationAction } from '../../actions'

import CreateUser from './create'
import './index.less'

class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShow: false
    }

    this.getColumns = this.getColumns.bind(this)
    this.parseData = this.parseData.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.sendConfirm = this.sendConfirm.bind(this)
    this.search = this.search.bind(this)
  }

  componentWillMount() {
    this.search()
  }

  getColumns () {
    return [{
      title: '姓名',
      dataIndex: 'username'
    }, {
      title: '账号',
      dataIndex: 'accountName'
    }, {
      title: '登录密码',
      dataIndex: 'password'
    }, {
      title: '手机',
      dataIndex: 'phoneNumber'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        return (<div>
          <a onClick={this.toggleShow.bind(this, 'edit', cord)}>编辑</a>
          &nbsp;&nbsp;
          <a onClick={this.delete.bind(this, id)}>删除</a>
        </div>)
      }
    }]
  }

  parseData (list) {
    return list.map(item => ({
      username: item.username,
      accountName: item.accountName,
      password: item.password,
      phoneNumber: item.phoneNumber,
      handle: item.adminId
    }))
  }

  toggleShow (type, cord) {
    this.setState({ isShow: !this.state.isShow, type, cord })
  }

  sendConfirm (condition) {
    const { createUser, editUser } = this.props
    const { type } = this.state
    const hide = message.loading('', 0)
    if (type === 'edit') {
      condition.adminId = this.state.cord.handle
      editUser(condition).then(() => {
        this.setState({ isShow: false, type: null, cord: null })
        this.search()
        setTimeout(hide, 0)
      }, () => setTimeout(hide, 0))
    } else if (type === 'create') {
      createUser(condition).then(() => {
        this.setState({ isShow: false, type: null, cord: null })
        setTimeout(hide, 0)
        this.search()
      }, () => setTimeout(hide, 0))
    }
  }

  delete (id) {
    const { deleteUser } = this.props
    deleteUser(id).then(() => {
      this.search()
    })
  }

  search () {
    const { queryUserList } = this.props
    queryUserList()
  }

  render() {
    const { isShow, cord, type } = this.state
    const { list } = this.props
    return (
      <div className="user-list">
        <div className="create-user">
            <Button type="primary" onClick={this.toggleShow.bind(this, 'create')}>新建账号</Button>
        </div>
        <div className="tabel-box">
          <Table
            columns={this.getColumns()}
            loading={list.get('doing')}
            dataSource={this.parseData(list.get('resultData').toJS() || [])}
            pagination={false} />
        </div>

        <CreateUser
          title="新建账号"
          isShow={isShow}
          cord={cord}
          type={type}
          confirm={this.sendConfirm}
          cancel={this.toggleShow} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.operation.operationList
})
const mapDispatchToProps = (dispatch) => ({
  queryUserList: () => dispatch(operationAction.queryUserList()),
  createUser: (condition) => dispatch(operationAction.createUser(condition)),
  editUser: (condition) => dispatch(operationAction.editUser(condition)),
  deleteUser: (condition) => dispatch(operationAction.deleteUser(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
