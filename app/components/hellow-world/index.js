import React, { Component } from 'react'

import { Input } from 'antd'

import './index.less'

class HelloWorld extends Component {
  constructor () {
    super()
    this.state = {
      value: 'Hello World'
    }
  }

  handleChange (e) {
    this.setState({
      value: e && e.target && e.target.value
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <Input onChange={this.handleChange.bind(this)} value={this.state.value} />
      </div>
    )
  }
}

export default HelloWorld
