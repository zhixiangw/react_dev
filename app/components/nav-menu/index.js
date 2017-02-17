import React, { Component } from 'react'
import { Link } from 'react-router'

import { Menu } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

export default class Nav extends Component {
  constructor (props) {
    super(props)

    this.state = this.getSelectedKeys(this.props.location)
  }

  componentWillReceiveProps (nextProps) {
    const { location } = nextProps
    if (location !== this.props.location) {
      this.setState(this.getSelectedKeys(location))
    }
  }

  getSelectedKeys (location) {
    const { pathname } = location

    const defaultOpenKeys = ['sub1']
    let selectedKeys
    const menuArr = [
      'userList',
      'cashList',
      'operationList',
      'verifyList'
    ]
    menuArr.forEach(item => {
      if (pathname.indexOf(item) !== -1) {
        selectedKeys = [item]
      }
      return
    })
    return {
      defaultOpenKeys,
      selectedKeys
    }
  }

  render () {
    const { defaultOpenKeys, selectedKeys } = this.state
    const { type } = this.props
    console.log(type)
    return (
      <Menu theme="dark"
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        mode="inline">
        <SubMenu key="sub1" title="UI Kits" >
          <MenuItem key="userList" >
            <Link to={`${__STATIC_BASE__}/userList`}>用户列表</Link>
          </MenuItem>
          <MenuItem key="cashList" >
            <Link to={`${__STATIC_BASE__}/cashList`}>提现记录</Link>
          </MenuItem>
          <MenuItem key="verifyList">
            <Link to={`${__STATIC_BASE__}/verifyList`}>待审核微信号</Link>
          </MenuItem>
          <MenuItem key="operationList" disabled={type !== 'ADMIN'} >
            <Link to={`${__STATIC_BASE__}/operationList`}>管理员列表</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    )
  }
}
