import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Table, Row, Col, DatePicker, message } from 'antd'
const RangePicker = DatePicker.RangePicker

import { overView as overViewAction } from '../../actions'
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
    const { queryOverView } = this.props
    const condition = {
      start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      end: moment().add(1, 'days').format('YYYY-MM-DD'),
    }
    queryOverView()
    this.search(condition)
  }

  toggleActive (activeId) {
    if (this.state.activeId === activeId) {
      return
    }
    this.setState({ activeId })
  }

  search (condition) {
    const { queryOverViewList } = this.props
    const hide = message.loading('', 0)
    queryOverViewList(condition).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
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
        start: dateStrings[0],
        end: moment(dateStrings[1]).add(1, 'days').format('YYYY-MM-DD')
      }
      this.search(condition)
    })
  }

  getColumns () {
    return [{
      title: '日期',
      dataIndex: 'date'
    }, {
      title: '新增合同',
      dataIndex: 'newContracts'
    }, {
      title: '放款合同数',
      dataIndex: 'onloanContracts'
    }, {
      title: '放款金额',
      dataIndex: 'loanAmounts'
    }, {
      title: '欠缴合同数',
      dataIndex: 'notPaidContracts'
    }]
  }

  parseData (list) {
    return list.map(item => ({
      date: item.date,
      newContracts: item.newContracts,
      onloanContracts: item.onloanContracts,
      loanAmounts: Number(item.loanAmounts).toFixed(2),
      notPaidContracts: item.notPaidContracts
    }))
  }

  getChartDate () {
    const { list } = this.props
    const { activeId } = this.state
    let xData = []
    let yData = []
    list.get('dataList').forEach(item => {
      xData.push(item.get('date'))
      if (+activeId === 1) {
        yData.push(item.get('newContracts'))
      } else if (+activeId === 2) {
        yData.push(item.get('onloanContracts'))
      } else if (+activeId === 3) {
        yData.push(item.get('notPaidContracts'))
      }
    })
    return {
      xData,
      yData
    }
  }

  render() {
    const { overViewData, list } = this.props
    const { activeId } = this.state
    const tablinkArr = ['新增合同数', '已放款合同数', '欠款合同数']
    return (
      <section>
        <Row gutter={32} className="index-over-view">
          <Col span="6">
            <div className="index-over-view-box">
              <p>{overViewData.get('contractNum')}</p>
              <p>合同总数</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>{overViewData.get('unpaidContractNum')}</p>
              <p>欠缴合同数量</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>{Number(overViewData.get('totalLoanAmount')).toFixed(2)}</p>
              <p>借款总金额</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box">
              <p>{overViewData.get('endContractNum')}</p>
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
                  { 今天: [moment(), moment()],
                    昨天: [moment().subtract(1, 'days'), moment()],
                    '7天': [moment().subtract(7, 'days'), moment()],
                    '14天': [moment().subtract(14, 'days'), moment()],
                    '30天': [moment().subtract(30, 'days'), moment()]
                  }}
                disabledDate={this.disabledDate}
                defaultValue={[moment().subtract(7, 'days'), moment()]}
                format="YYYY-MM-DD"
                onChange={this.handleRangePickerChange} />
            </Col>
          </Row>
          <Row>
            <Chart
              title={tablinkArr[activeId - 1]}
              xData={this.getChartDate(list.get('dataList').toJS()).xData}
              yData={this.getChartDate(list.get('dataList').toJS()).yData} />
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
              dataSource={this.parseData(list.get('dataList').toJS() || [])}
              pagination={false} />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  overViewData: state.overView.overViewData,
  overViewTrend: state.overView.overViewTrend,
  list: state.overView.overViewList
})
const mapDispatchToProps = (dispatch) => ({
  queryOverView: () => dispatch(overViewAction.queryOverView()),
  queryOverViewList: (condition) => dispatch(overViewAction.queryOverViewList(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
