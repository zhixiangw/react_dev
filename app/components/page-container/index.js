import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { Col, Row, message, Icon, Popover } from 'antd'

import { system as systemAction } from '../../projects/actions'
import NavMenu from '../nav-menu'
import UserInfo from '../user-info'

import './index.less'

class PageContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isShow: false,
      isPopShow: false
    }
    this.clickLogout = this.clickLogout.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.modifyPassword = this.modifyPassword.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  //在任意时刻，组件的props都可以通过父类组件来更改。出现这种情况时componentWillReceiveProps方法被调用。组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。
  
  componentWillReceiveProps(nextProps) {
    
    // nextProps是Map结构，初始化成实例后，Map结构还提供了一些实例的属性和方法供我们实现对实例的操作。get()获取指定键名的键值，返回键值

    if (nextProps.systemMsg && nextProps.systemMsg.get('msg') && nextProps.systemMsg.get('type')) {
      switch (nextProps.systemMsg.get('type')) {
        case systemAction.SHOW_ERROR:
          message.error(nextProps.systemMsg.get('msg'))
          break;

        case systemAction.SHOW_WARNING:
          message.warning(nextProps.systemMsg.get('msg'))
          break;

        case systemAction.SHOW_SUCCESS:
          message.success(nextProps.systemMsg.get('msg'))
          break;

        default:
          message.success(nextProps.systemMsg.get('msg'))
          break;
      }

      //提示完之后清掉
      this.props.cleanMsg()
    }
  }

  clickLogout () {
    const { logout } = this.props
    this.setState({ isPopShow: false })
    logout()
  }

  toggleShow () {
    this.setState({ isShow: !this.state.isShow, isPopShow: false })
  }

  modifyPassword (params) {
    console.info(params)
    this.toggleShow()
  }

  getContent () {
    return (<div className="user-pop">
      <p onClick={this.toggleShow}>个人信息</p>
      <p onClick={this.clickLogout}>退出</p>
    </div>)
  }

  handleVisibleChange (visible) {
    this.setState({ isPopShow: visible })
  }

  render () {
    const { isShow, isPopShow } = this.state
    return (
      <div className="contain">
        <Row className="top-nav">
          <Col span="4" className="left-metro">
            <Icon type="appstore-o" />
            <span>HeyMetro 1.3</span>
            <Icon type="down-circle-o" />
          </Col>
          <Col span="20" className="right-metro">
            <p>David M.</p>
            <Popover
              visible={isPopShow}
              placement="bottomRight"
              content={this.getContent()}
              trigger="click"
              onVisibleChange={this.handleVisibleChange} >
              <Icon type="user" />
            </Popover>
          </Col>
        </Row>
        <Row type="flex" className="layout">
          <Col span="4" className="side-nav">
            <NavMenu location={this.props.location} />
          </Col>

          <Col span="20" className="content">
            {this.props.children}
          </Col>
        </Row>

        <UserInfo
          isShow={isShow}
          cancel={this.toggleShow}
          confirm={this.modifyPassword} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.locationBeforeTransitions,
  systemMsg: state.system.systemMsg
})

const mapDispatchToProps = dispatch => ({
  cleanMsg: () => dispatch(systemAction.clean()),
  logout: () => dispatch(replace('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)

