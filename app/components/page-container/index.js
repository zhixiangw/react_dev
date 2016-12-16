import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, message } from 'antd'

import { system as systemAction } from '../../projects/actions'
import NavMenu from '../nav-menu'

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


  render () {
    return (
      <Row type="flex" className="layout">
        <Col span="4" className="side-nav">
          <NavMenu location={this.props.location} />
        </Col>

        <Col span="20" className="content">
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.locationBeforeTransitions,
  systemMsg: state.system.systemMsg
})

const mapDispatchToProps = dispatch => ({
  cleanMsg: () => dispatch(systemAction.clean())
})

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)

