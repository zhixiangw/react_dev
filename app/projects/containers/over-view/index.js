import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Button, Table, Row, Col, DatePicker  } from 'antd'
const RangePicker = DatePicker.RangePicker

import { system as systemAction, test as testAction } from '../../actions'
import Chart from './chart'
import './index.less'

class OverView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageIndex: 1,
      activeId: 1
    }
    this.toggleActive = this.toggleActive.bind(this)
    this.disabledDate = this.disabledDate.bind(this)
    this.handleRangePickerChange = this.handleRangePickerChange.bind(this)
    this.search = this.search.bind(this)
    this.getChartDate = this.getChartDate.bind(this)
  }

  componentWillMount() {
    const condition = {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      type: this.state.activeId
    }
    this.search(condition)
  }

  toggleActive (activeId) {
    const { startDate, endDate } = this.state
    if (this.state.activeId === activeId) return
    this.setState({ activeId }, () => {
      const condition = {
        startDate,
        endDate,
        type: activeId
      }
      this.search(condition)
    })
  }

  search (condition) {
    const { sendAsyncAction } = this.props
    console.info(condition)
    sendAsyncAction(condition)
  }

  disabledDate(current) {
    return current && current.valueOf() >= Date.now()
  }

  handleRangePickerChange (dates, dateStrings) {
    this.setState({
      startDate: dateStrings[0],
      endDate: dateStrings[1]
     }, () => {
      const condition = {
        startDate: dateStrings[0],
        endDate: dateStrings[1],
        type: this.state.activeId
      }
      this.search(condition)
    })
  }

  getColumns () {
    return [{
      title: '日期',
      dataIndex: 'index'
    }, {
      title: '新增合同',
      dataIndex: 'title'
    }, {
      title: '放款合同数',
      dataIndex: 'author'
    }, {
      title: '放款金额',
      dataIndex: 'lastReplyTime'
    }, {
      title: '欠缴合同数',
      dataIndex: 'handle'
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

  getChartDate () {
    const { list } = this.props
    return {
      xData: ['2016/11/01', '2016/11/02', '2016/11/03', '2016/11/04', '2016/11/05'],
      yData: [Math.random() * 100, Math.random() * 600, Math.random() * 450, Math.random() * 650, Math.random() * 120]
    }
  }

  render() {
    const { list } = this.props
    const { activeId } = this.state
    const tablinkArr = ['新增合同数', '已放款合同数', '欠款合同数']
    return (
      <section>
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
            <Col span="8" className="tablink" offset="2">
              <Row>
                {
                  tablinkArr.map((item, index) => {
                    return (
                      <Col span="8" key={index + 1}>
                        <a className={activeId === (index + 1) && 'active' || null}
                        onClick={this.toggleActive.bind(this, (index + 1))}>{item}</a>
                      </Col>
                    )
                  })
                }
              </Row>
            </Col>
            <Col span="8" offset="3" className="range-picker">
              <RangePicker
                size="large"
                ranges={
                  { '今天': [moment(), moment()],
                    '昨天': [moment(), moment().subtract(1, 'days')],
                    '7天': [moment(), moment().subtract(7, 'days')],
                    '14天': [moment(), moment().subtract(14, 'days')],
                    '30天': [moment(), moment().subtract(30, 'days')]
                  }}
                disabledDate={this.disabledDate}
                defaultValue={[moment(), moment().subtract(7, 'days')]}
                format="YYYY-MM-DD"
                onChange={this.handleRangePickerChange} />
            </Col>
          </Row>
          <Row>
            <Chart
              title={tablinkArr[activeId - 1]}
              xData={this.getChartDate().xData}
              yData={this.getChartDate().yData} />
          </Row>
        </section>
        <section className="tabel">
          <Row className="title">
            <p>详细信息</p>
          </Row>
          <div className="tabel-box">
            <Table
              columns={this.getColumns()}
              loading={list.get('doing')}
              dataSource={this.parseData(list.getIn(['data', 'recent_replies']) && list.getIn(['data', 'recent_replies']).toJS() || [])}
              pagination={false} />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.test.testFetch
})
const mapDispatchToProps = (dispatch) => ({
  sendAsyncAction: () => dispatch(testAction.testFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
