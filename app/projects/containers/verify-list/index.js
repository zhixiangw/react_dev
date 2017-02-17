import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Row, Modal } from 'antd'

import { verify as verifyAction } from '../../actions'
import './index.less'

class Verify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: null,
      pageIndex: 1,
      isShow: false
    }
    this.check = this.check.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentWillMount() {
    const { queryVerifyList } = this.props
    queryVerifyList(1)
  }

  getColumns () {
    return [{
      title: '微信号',
      dataIndex: 'wechat'
    }, {
      title: '微信昵称',
      dataIndex: 'nickname'
    }, {
      title: '游戏ID',
      dataIndex: 'uid'
    }, {
      title: '申请时间',
      dataIndex: 'applyTime'
    }, {
      title: '审核状态',
      dataIndex: 'checkStatus'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (bankId, cord) => {
        if (cord.checkStatus !== 'WAIT') {
          return '--'
        }
        return (<div>
          <a onClick={this.toggleShow.bind(this, 'pass', bankId)}>审核通过</a>
          &nbsp;&nbsp;
          <a onClick={this.toggleShow.bind(this, 'reject', bankId)}>拒绝</a>
        </div>)
      }
    }]
  }

  parseData (list) {
    return list.map(item => ({
      key: item.uid,
      wechat: item.wechat,
      nickname: item.nickname,
      uid: item.uid,
      applyTime: item.applyTime,
      checkStatus: item.checkStatus,
      handle: item.bankId
    }))
  }

  getPagination() {
    const { list, queryVerifyList } = this.props
    return {
      total: list.get('totalNum'),
      onChange: (current) => {
        this.setState({ pageIndex: current })
        queryVerifyList(current)
      },
    }
  }

  toggleShow (type, bankId) {
    this.setState({ isShow: !this.state.isShow, type, bankId })
  }

  check () {
    const { checkItem, queryVerifyList } = this.props
    const { pageIndex, type, bankId } = this.state
    let condition = { bankId }
    if (type === 'pass') {
      condition.checkStatus = 'PASS'
    } else {
      condition.checkStatus = 'REJECT'
    }
    checkItem(condition).then(() => {
      queryVerifyList(this.state.pageIndex)
      this.setState({ isShow: false })
    })
  }

  render() {
    const { list } = this.props
    const { type, isShow } = this.state
    return (
      <section>
        <section className="tabel">
          <Row className="title">
            <p>待审核微信号</p>
          </Row>
          <div className="tabel-box">
            <Table
              columns={this.getColumns()}
              loading={list.get('doing')}
              dataSource={this.parseData(list.get('resultData').toJS() || [])}
              pagination={this.getPagination()} />
          </div>
        </section>

        <Modal
          title={type === 'pass' && '审核通过提示' || '拒绝提示'}
          visible={isShow}
          onOk={this.check}
          onCancel={this.toggleShow} >
          <p>{`您确定要${type === 'pass' && '审核通过' || '拒绝'}吗？`}</p>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.verify.verifyList
})
const mapDispatchToProps = (dispatch) => ({
  queryVerifyList: (pageIndex) => dispatch(verifyAction.queryVerifyList(pageIndex)),
  checkItem: (condition) => dispatch(verifyAction.checkItem(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(Verify)
