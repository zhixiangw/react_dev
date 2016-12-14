import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd'

import NavMenu from '../nav-menu'

class PageContainer extends Component {

  // 这边可以加一些全局提示的逻辑

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
  location: state.routing.locationBeforeTransitions
})

export default connect(mapStateToProps)(PageContainer) // mapDispatchToProps

