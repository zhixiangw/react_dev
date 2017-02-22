import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, message } from 'antd'
const TabPane = Tabs.TabPane

import { sd as sdAction } from '../../../actions'

import './index.less'
import BasicInfo from './basic-info'

class SdDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: '1'
    }

    this.tabChange = this.tabChange.bind(this)
    this.saveSdInfo = this.saveSdInfo.bind(this)
  }

  componentWillMount() {
    const { location: { query: { handleType, id } }, querySdDetail } = this.props
    if (id && handleType === 'edit') {
      const hide = message.loading('', 0)
      querySdDetail(id).then(() => {
        setTimeout(hide, 0)
      }, () => {
        setTimeout(hide, 0)
      })
    }
  }

  tabChange (key) {
    if (+key === +this.state.activeTabKey) {
      return
    }
    this.setState({ activeTabKey: key })
  }

  saveSdInfo (values) {
    const { location: { query: { id } }, saveSdInfoFunc } = this.props
    const hide = message.loading('', 0)
    saveSdInfoFunc({ id, info: values }).then(() => {
      setTimeout(hide, 0)
    }, () => {
      setTimeout(hide, 0)
    })
  }

  render() {
    const { activeTabKey } = this.state
    const { sdDetail, location: { query: { handleType } } } = this.props
    return (
      <div className="customer-manage">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange} >
          <TabPane tab="基础信息" key="1">
            <BasicInfo
              info={handleType !== 'create' && sdDetail && sdDetail.toJS() || {}}
              handleType={handleType}
              onSubmit={this.saveSdInfo} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sdDetail: state.sd.sdDetail,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  querySdDetail: (id) => dispatch(sdAction.querySdDetail(id)),
  saveSdInfoFunc: (condition) => dispatch(sdAction.saveSdInfo(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(SdDetail)
