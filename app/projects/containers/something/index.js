import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'antd'

import { system as systemAction, test as testAction } from '../../actions'

class SomeThing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageIndex: 1
    }
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

  getColumns () {
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '主题',
      dataIndex: 'title'
    }, {
      title: '作者',
      dataIndex: 'author'
    }, {
      title: '最后回复时间',
      dataIndex: 'lastReplyTime'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id) => {
        return <span onClick={ () => console.info(id) }>查看</span>
      }
    }]
  }

  parseData (list) {
    return list.map((item, index) => ({
      index,
      title: item.title,
      author: item.author && item.author.loginname,
      lastReplyTime: item.last_reply_at,
      handle: item.id
    }))
  }

  getPagination () {
    const { list } = this.props
    const total = list.getIn(['data', 'recent_replies']) && list.getIn(['data', 'recent_replies']).size || 0
    return {
      total,
      showTotal: () => `共 ${total} 条`,
      pageSize: 3,
      current: this.state.pageIndex,
      onChange: (current) => {
        this.setState({ pageIndex: current })
      }
    }
  }

  render() {
    const { list } = this.props

    return (
      <div>
        <p>{'这里只是演示一下路由'}</p>
        <Button onClick={this.sendMsg.bind(this, 'error')}>点击我是一个全局错误提示</Button>
        <Button onClick={this.sendMsg.bind(this, 'warning')}>点击我是一个全局警告提示</Button>
        <Button onClick={this.sendMsg.bind(this, 'success')}>点击我是一个全局成功提示</Button>
        <Button onClick={this.login}>点击我是发送一个异步GET请求</Button>
        <hr />
        <hr />
        <div>
          <Table
            columns={this.getColumns()}
            loading={list.get('doing')}
            dataSource={this.parseData(list.getIn(['data', 'recent_replies']) && list.getIn(['data', 'recent_replies']).toJS() || [])}
            pagination={this.getPagination()} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.test.testFetch
})
const mapDispatchToProps = (dispatch) => ({
  sendSysMsg: (msg, type) => dispatch(systemAction[type](msg)),
  sendAsyncAction: (condition) => dispatch(testAction.testFetch(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(SomeThing)
