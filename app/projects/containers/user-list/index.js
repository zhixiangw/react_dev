import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Row } from 'antd'

import { overView as overViewAction } from '../../actions'
import './index.less'

class OverView extends Component {

  componentWillMount() {
    const { queryOverViewList } = this.props
    queryOverViewList(1)
  }

  getColumns () {
    return [{
      title: '昵称',
      dataIndex: 'nickname'
    }, {
      title: '游戏ID',
      dataIndex: 'uid'
    }, {
      title: '总收益',
      dataIndex: 'totalIncome'
    }, {
      title: '昨日收益',
      dataIndex: 'yesterdayIncome'
    }, {
      title: '推荐人',
      dataIndex: 'inviteUser'
    }]
  }

  parseData (list) {
    return list.map(item => ({
      nickname: item.nickname,
      uid: item.uid,
      totalIncome: item.totalIncome,
      yesterdayIncome: item.yesterdayIncome,
      inviteUser: item.inviteUser
    }))
  }

  getPagination() {
    const { list, queryOverViewList } = this.props
    return {
      total: list.get('totalNum'),
      onChange: (current) => {
        this.setState({ pageIndex: current })
        queryOverViewList(current)
      },
    }
  }

  render() {
    const { list } = this.props
    return (
      <section>
        <section className="tabel">
          <Row className="title">
            <p>用户列表</p>
          </Row>
          <div className="tabel-box">
            <Table
              columns={this.getColumns()}
              loading={list.get('doing')}
              dataSource={this.parseData(list.get('resultData').toJS() || [])}
              pagination={this.getPagination()} />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.overView.overViewList
})
const mapDispatchToProps = (dispatch) => ({
  queryOverViewList: (pageIndex) => dispatch(overViewAction.queryOverViewList(pageIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
