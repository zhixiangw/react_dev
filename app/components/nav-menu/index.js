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
      '/overView',
      '/contractList',
      '/userManager',
      '/systemSetting'
    ]
    if (menuArr.indexOf(pathname) !== -1) {
      selectedKeys = [pathname.replace('/', '')]
    }
    return {
      defaultOpenKeys,
      selectedKeys
    }
  }

  render () {
    const { defaultOpenKeys, selectedKeys } = this.state

    return (
      <Menu theme="dark"
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        mode="inline">
        <SubMenu key="sub1" title="UI Kits" >
          <MenuItem key="overView" >
            <Link to="/overView">首页概览</Link>
          </MenuItem>
          <MenuItem key="contractList" >
            <Link to="/contractList">合同列表</Link>
          </MenuItem>
          <MenuItem key="userManager" >
            <Link to="/userManager">用户管理</Link>
          </MenuItem>
          <MenuItem key="systemSetting" >
            <Link to="/systemSetting">系统设置</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    )
  }
}
