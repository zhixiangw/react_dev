import React, { Component } from 'react'
// import './index.scss'
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

  componentDidMount() {
    this.setState({ a: 1 })
    console.info(this.state.a)
  }

  render() {
    console.info(this.state.a)
    return (
      <div>
        <p>{this.state.value}</p>
        <input onChange={this.handleChange.bind(this)} value={this.state.value} />
      </div>
    )
  }
}

export default HelloWorld
