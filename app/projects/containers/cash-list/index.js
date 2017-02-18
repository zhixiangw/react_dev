import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Row, Button, Modal } from 'antd'

import { overView as overViewAction } from '../../actions'

class OverView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      pageIndex: 1
    }
    this.handClick = this.handClick.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentWillMount() {
    const { queryWithdrawsList } = this.props
    queryWithdrawsList(1)
  }

  handClick() {
    const { finishWithdraw, queryWithdrawsList, loginInfo } = this.props
    const { id } = this.state
    const condition = {
      withdrawId: id,
      adminId: loginInfo.get('adminId') || JSON.parse(window.localStorage.getItem('loginInfo')).adminId
    }
    finishWithdraw(condition).then(() => {
      this.setState({ isShow: false })
      queryWithdrawsList(this.state.pageIndex)
    })
  }

  toggleShow (id) {
    this.setState({ isShow: !this.state.isShow, id })
  }

  getColumns () {
    return [{
      title: '昵称',
      dataIndex: 'nickname'
    }, {
      title: '游戏ID',
      dataIndex: 'uid'
    }, {
      title: '提现金额(元)',
      dataIndex: 'withdrawAmount',
      render: (withdrawAmount) => <span>{withdrawAmount / 100}</span>
    }, {
      title: '提现者微信号',
      dataIndex: 'withdrawWeChat'
    }, {
      title: '打款操作员',
      dataIndex: 'operator'
    }, {
      title: '提现时间',
      dataIndex: 'applyTime'
    }, {
      title: '打款时间',
      dataIndex: 'finishTime'
    }, {
      title: '状态',
      dataIndex: 'status'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (withdrawId, cord) => {
        const link = cord.status === 'WAIT' ?
        <Button type="primary" onClick={this.toggleShow.bind(this, withdrawId)}>打款</Button> :
        '已打款'
        return link
      }
    }]
  }

  parseData (list) {
    return list.map(item => ({
      nickname: item.nickname,
      uid: item.uid,
      withdrawAmount: item.withdrawAmount,
      withdrawWeChat: item.wechat,
      operator: item.operator,
      applyTime: item.applyTime,
      finishTime: item.finishTime,
      status: item.status,
      handle: item.withdrawId
    }))
  }

  getPagination() {
    const { list, queryWithdrawsList } = this.props
    return {
      total: list.get('totalNum'),
      onChange: (current) => {
        this.setState({ pageIndex: current })
        queryWithdrawsList(current)
      },
    }
  }

  render() {
    const { list } = this.props
    return (
      <section>
        <section className="tabel">
          <Row className="title">
            <p>提现记录</p>
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
          title="提示"
          visible={this.state.isShow}
          onOk={this.handClick}
          onCancel={this.toggleShow}>
           <p>请确认是否打款？</p>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.overView.withdrawsList,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  queryWithdrawsList: (pageIndex) => dispatch(overViewAction.queryWithdrawsList(pageIndex)),
  finishWithdraw: (condition) => dispatch(overViewAction.finishWithdraw(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
