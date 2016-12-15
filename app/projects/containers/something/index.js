import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { system as systemAction } from '../../actions';

class SomeThing extends Component {
  constructor(props) {
    super(props)

    this.sendErrorMsg = this.sendErrorMsg.bind(this)
  }

  sendErrorMsg () {
    const { sendSysMsg } = this.props
    sendSysMsg('随便显示点什么？？？！！！')
  }

  render() {
    return (
      <div>
        <p>{'这里只是演示一下路由'}</p>
        <Button onClick={this.sendErrorMsg}>点击我是一个全局提示</Button>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  sendSysMsg: (msg) => dispatch(systemAction.error(msg))
})

export default connect(mapStateToProps, mapDispatchToProps)(SomeThing) // mapDispatchToProps
