import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { Col, Row, message, Icon, Popover } from 'antd'

import { system as systemAction, login as loginAction, user as userAction } from '../../projects/actions'
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
    this.modifyPasswordFunc = this.modifyPasswordFunc.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  componentWillMount() {
    const { logout, loginInfo } = this.props
    if (!loginInfo.get('hasLogin')) {
      logout()
    }
  }

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

  clickLogout () {
    const { logout } = this.props
    this.setState({ isPopShow: false })
    logout()
  }

  toggleShow () {
    this.setState({ isShow: !this.state.isShow, isPopShow: false })
  }

  modifyPasswordFunc ({ password }) {
    const { modifyPassWord, logout, loginInfo } = this.props
    modifyPassWord({ id: loginInfo.get('id'), password }).then(() => {
      this.toggleShow()
      logout()
    })
  }

  getContent () {
    return (
    <div className="user-pop">
      <p onClick={this.toggleShow}>个人信息</p>
      <p onClick={this.clickLogout}>退出</p>
    </div>
    )
  }

  handleVisibleChange (visible) {
    this.setState({ isPopShow: visible })
  }

  render () {
    const { isShow, isPopShow } = this.state
    const { loginInfo } = this.props
    const password = loginInfo.get('password')
    return (
      <div className="contain">
        <Row className="top-nav">
          <Col span="4" className="left-metro">
            <Icon type="appstore-o" />
            <span>SingleDog 1.0</span>
            <Icon type="down-circle-o" />
          </Col>
          <Col span="20" className="right-metro">
            <p>{loginInfo.get('name')}</p>
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
          password={password}
          confirm={this.modifyPasswordFunc} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.locationBeforeTransitions,
  systemMsg: state.system.systemMsg,
  loginInfo: state.login.loginInfo
})

const mapDispatchToProps = dispatch => ({
  cleanMsg: () => dispatch(systemAction.clean()),
  modifyPassWord: (condition) => dispatch(loginAction.modifyPassword(condition)),
  logout: () => dispatch(loginAction.logout()).then(() => dispatch(replace(`${__STATIC_BASE__}/`)))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)

