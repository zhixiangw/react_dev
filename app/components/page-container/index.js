import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { Col, Row, message, Icon, Popover } from 'antd'

import { system as systemAction, login as loginAction, user as userAction } from '../../projects/actions'
import NavMenu from '../nav-menu'
import UserInfo from '../user-info'

import './index.less'

class PageContainer extends Component {
  componentWillReceiveProps(nextProps) {
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
      this.props.cleanMsg()
    }
  }

  logoutFunc () {
    const { logout } = this.props
    logout()
  }

  render () {
    const { loginInfo } = this.props
    return (
      <div className="contain">
        <Row className="top-nav">
          <Col span="4" className="left-metro">
            <Icon type="appstore-o" />
            <span>HeyMetro 1.3</span>
            <Icon type="down-circle-o" />
          </Col>
          <Col span="20" className="right-metro">
            <p>{loginInfo.get('username')}</p>
            <Icon type="logout" onClick={this.logoutFunc.bind(this)} />
          </Col>
        </Row>
        <Row type="flex" className="layout">
          <Col span="4" className="side-nav">
            <NavMenu location={this.props.location} type={loginInfo.get('type')} />
          </Col>

          <Col span="20" className="content">
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loginInfo: state.login.loginInfo,
  location: state.routing.locationBeforeTransitions,
  systemMsg: state.system.systemMsg
})

const mapDispatchToProps = dispatch => ({
  cleanMsg: () => dispatch(systemAction.clean()),
  logout: () => dispatch(replace(`${__STATIC_BASE__}/`))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)

