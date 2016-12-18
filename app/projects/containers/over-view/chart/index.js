import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class Chart extends Component {
  constructor (props) {
    super(props)
    this.getOption = this.getOption.bind(this)
  }
  getOption () {
    const { xData, yData } = this.props
    return {
      grid: {
        show: true,
        borderWidth: 0,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 2
      },
      tooltip : {
        trigger: 'axis'
      },
      xAxis : [
        {
          data : xData
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          type:'line',
          name: '数量',
          data:yData
        }
      ]
    }
  }

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{height: '350px', width: '100%'}}
        className='react_for_echarts' />
    )
  }
}

export default Chart