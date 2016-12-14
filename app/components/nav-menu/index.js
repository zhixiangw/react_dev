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
    const selectedKeys = pathname && pathname === '/' ? ['5s'] : ['7p']
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
        <SubMenu
          key="sub1"
          title="水果管理" >
          <MenuItem
            key="5s" >
            <Link to="/">苹果5S</Link>
          </MenuItem>
          <MenuItem
            key="7p" >
            <Link to="/something">苹果7P</Link>
          </MenuItem>
        </SubMenu>
      </Menu>
    )
  }
}
