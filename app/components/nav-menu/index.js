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
      'overView',
      'sdManage',
      'customerManage'
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

    return (
      <Menu theme="dark"
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        mode="inline">
        <SubMenu key="sub1" title="UI Kits" >
          <MenuItem key="overView" >
            <Link to={`${__STATIC_BASE__}/overView`}>首页概览</Link>
          </MenuItem>
          <MenuItem key="sdManage" >
            <Link to={`${__STATIC_BASE__}/sdManage`}>单身狗列表</Link>
          </MenuItem>
          <MenuItem key="customerManage"
            disabled={type !== 'admin'} >
            <Link to={`${__STATIC_BASE__}/customerManage`}>用户管理</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    )
  }
}
