import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Row, Col } from 'antd'

import { system as systemAction, test as testAction } from '../../actions';
import './index.less'

class OverView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageIndex: 1,
      activeId: 1
    }
    this.login = this.login.bind(this)
    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive (activeId) {
    this.setState({ activeId })
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
    const { activeId } = this.state

    return (
      <div>
        <Row gutter={32} className="index-over-view">
          <Col span="6">
            <div className="index-over-view-box">
              <p>980</p>
              <p>合同总数</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>8</p>
              <p>欠缴合同数量</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>90000.00</p>
              <p>借款总金额</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>109</p>
              <p>已结束/已退保合同数</p>
            </div>
          </Col>
        </Row>
        <section className="chart">
          <Row>
            <Col span="3" className="title">
              <p>趋势图</p>
            </Col>
            <Col span="9" className="tablink">
              <a className={activeId === 1 && 'active' || null}
                 onClick={this.toggleActive.bind(this, 1)}>新增合同数</a>
              <a className={activeId === 2 && 'active' || null}
                 onClick={this.toggleActive.bind(this, 2)}>已放款合同数</a>
              <a className={activeId === 3 && 'active' || null}
                 onClick={this.toggleActive.bind(this, 3)}>欠款合同数</a>
            </Col>
          </Row>

        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
