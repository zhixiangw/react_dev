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
      startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }
    this.search(condition)
    queryOverView()
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
    if (!dates.length) return
    this.setState({
      startDate: dateStrings[0],
      endDate: dateStrings[1]
    }, () => {
      const condition = {
        startDate: dateStrings[0],
        endDate: dateStrings[1],
      }
      this.search(condition)
    })
  }

  getColumns () {
    return [{
      title: '日期',
      dataIndex: 'createTime'
    }, {
      title: '新增单身狗',
      dataIndex: 'newAdded'
    }, {
      title: '审核通过单身狗',
      dataIndex: 'verified'
    }, {
      title: '自我评估总价格',
      dataIndex: 'totalSelfPrice'
    }, {
      title: '会员单身狗',
      dataIndex: 'members'
    }]
  }

  parseData (list) {
    return list.map(item => ({
      createTime: moment(item.create_time).format('YYYY-MM-DD'),
      newAdded: item.newAdded,
      verified: item.verified,
      totalSelfPrice: Number(item.totalSelfPrice).toFixed(2),
      members: item.members
    }))
  }

  getChartDate (dataList) {
    const { activeId } = this.state
    let xData = []
    let yData = []
    dataList.forEach(item => {
      xData.push(moment(item.create_time).format('YYYY-MM-DD'))
      if (+activeId === 1) {
        yData.push(item.newAdded)
      } else if (+activeId === 2) {
        yData.push(item.verified)
      } else {
        yData.push(item.members)
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
    const tablinkArr = ['新增单身狗', '审核通过单身狗', '会员单身狗']
    return (
      <section>
        <Row gutter={32} className="index-over-view">
          <Col span="6">
            <div className="index-over-view-box success">
              <p>{overViewData.get('count')}<small> 个</small></p>
              <p>单身狗总数量</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box warning">
              <p>{overViewData.get('potential')}<small> 个</small></p>
              <p>潜在单身狗数量</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box primary">
              <p>{Number(overViewData.get('price')).toFixed(2)}<small> 元</small></p>
              <p>单身狗自我评估总价格</p>
            </div>
          </Col>
          <Col span="6">
            <div className="index-over-view-box error">
              <p>{overViewData.get('member')}<small> 个</small></p>
              <p>单身狗Club会员数</p>
            </div>
          </Col>
        </Row>
        <section className="chart">
          <Row>
            <Col span="3" className="title">
              <p>趋势图</p>
            </Col>
            <Col span="9" className="tablink" offset="2">
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
            <Col span="8" offset="2" className="range-picker">
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
  list: state.overView.overViewList
})
const mapDispatchToProps = (dispatch) => ({
  queryOverView: () => dispatch(overViewAction.queryOverView()),
  queryOverViewList: (condition) => dispatch(overViewAction.queryOverViewList(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverView)
