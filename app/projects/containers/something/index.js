import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { system as systemAction, test as testAction } from '../../actions';

class SomeThing extends Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
  }

  sendMsg (type) {
    const { sendSysMsg } = this.props
    sendSysMsg('随便显示点什么？？？！！！', type)
  }

  login () {
    const { sendAsyncAction } = this.props
    sendAsyncAction({
      username: 'alsotang'
    })
  }

  render() {
    return (
      <div>
        <p>{'这里只是演示一下路由'}</p>
        <Button onClick={this.sendMsg.bind(this, 'error')}>点击我是一个全局错误提示</Button>
        <Button onClick={this.sendMsg.bind(this, 'warning')}>点击我是一个全局警告提示</Button>
        <Button onClick={this.sendMsg.bind(this, 'success')}>点击我是一个全局成功提示</Button>
        <Button onClick={this.login}>点击我是发送一个异步GET请求</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.test.testFetch
})
const mapDispatchToProps = (dispatch) => ({
  sendSysMsg: (msg, type) => dispatch(systemAction[type](msg)),
  sendAsyncAction: (condition) => dispatch(testAction.testFetch(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(SomeThing)
