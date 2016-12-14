import { Component } from 'react'
import { connect } from 'react-redux'

class PageContainer extends Component {

  // 这边可以加一些全局提示的逻辑

  render () {
    return this.props.children
  }
}

export default connect()(PageContainer)

