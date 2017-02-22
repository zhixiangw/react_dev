import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { Tabs, Table, Row, Col, Select, Input, Button, Popconfirm } from 'antd'
const TabPane = Tabs.TabPane
const Search = Input.Search
const Option = Select.Option

import { sd as sdAction } from '../../../actions'

import PreviewImage from '../../../../components/preview-image'
import './index.less'

class SdList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTabKey: '1',
      status: 1,
      currentName: '',
      selectType: 'all',
      name: null,
      isImgModalShow: false,

    }

    this.tabChange = this.tabChange.bind(this)
    this.getKey1Columns = this.getKey1Columns.bind(this)
    this.getKey2Columns = this.getKey2Columns.bind(this)
    this.parseKey1Data = this.parseKey1Data.bind(this)
    this.parseKey2Data = this.parseKey2Data.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.search = this.search.bind(this)
    this.previewImage = this.previewImage.bind(this)
  }

  componentWillMount() {
    const condition = {
      status: 0,
      name: null
    }
    this.search(condition)
  }

  tabChange(key) {
    const { name, activeTabKey } = this.state
    if (+key === +activeTabKey) {
      return
    }
    let condition = {
      status: +key - 1,
      name
    }
    this.setState({ activeTabKey: key }, () => {
      this.search(condition)
    })
  }

  getKey1Columns () {
    return [{
      title: '序号',
      dataIndex: 'index'
    }, {
      title: '单身狗名称',
      dataIndex: 'name'
    }, {
      title: '单身狗性别',
      dataIndex: 'sex'
    }, {
      title: '单身狗狗龄',
      dataIndex: 'age'
    }, {
      title: '单身狗自我估价(元)',
      dataIndex: 'selfPrice'
    }, {
      title: '提交日期',
      dataIndex: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id) => {
        const option = {
          pathname: `${__STATIC_BASE__}/sdManage/detail`,
          query: {
            id,
            handleType: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            <Popconfirm
              title="您确定要审核通过此条单身狗嘛？"
              onConfirm={this.verifySD.bind(this, id)}>
              <a href="#">审核</a>
            </Popconfirm>
          </div>
        )
      }
    }]
  }

  getKey2Columns () {
    return [{
      title: '单身狗名称',
      dataIndex: 'name'
    }, {
      title: '单身狗性别',
      dataIndex: 'sex'
    }, {
      title: '单身狗狗龄',
      dataIndex: 'age'
    }, {
      title: '单身狗手机',
      dataIndex: 'mobile'
    }, {
      title: '单身狗个性签名',
      dataIndex: 'personalSign'
    }, {
      title: '单身狗自我估价(元)',
      dataIndex: 'selfPrice'
    }, {
      title: '提交日期',
      dataIndex: 'createTime'
    }, {
      title: '是否单身狗会员',
      dataIndex: 'isMember'
    }, {
      title: '是否潜在单身狗',
      dataIndex: 'isPotential'
    }, {
      title: '操作',
      dataIndex: 'handle',
      render: (id, cord) => {
        const option = {
          pathname: `${__STATIC_BASE__}/sdManage/detail`,
          query: {
            id,
            handleType: 'edit'
          }
        }
        return (
          <div>
            <Link to={option}>编辑</Link>
            &nbsp;&nbsp;
            {
              cord.image ?
              <a href="#" onClick={this.previewImage.bind(this, cord.image)}>查看头像</a> :
              null
            }

          </div>
        )
      }
    }]
  }

  parseKey1Data (list) {
    return list.map((item, index) => ({
      index: index + 1,
      name: item.name,
      sex: +item.sex === 1 ? '男' : '女',
      age: item.age,
      selfPrice: item.self_price,
      createTime: moment(item.create_time).format('YYYY-MM-DD'),
      handle: item.id
    }))
  }

  parseKey2Data (list) {
    return list.map((item, index) => ({
      index: index + 1,
      name: item.name,
      sex: +item.sex === 1 ? '男' : '女',
      age: item.age,
      mobile: item.mobile,
      personalSign: item.personal_sign,
      selfPrice: item.self_price,
      createTime: moment(item.create_time).format('YYYY-MM-DD'),
      isMember: item.is_member ? '是' : '否',
      isPotential: item.is_potential ? '是' : '否',
      image: item.image,
      handle: item.id
    }))
  }

  verifySD (id) {
    const { verifySingleDog } = this.props
    verifySingleDog(id).then(() => {
      this.search({ status: 0 })
    })
  }

  previewImage(previewUrl, imageIndex, imageArr) {
    this.setState({ isImgModalShow: !this.state.isImgModalShow, previewUrl, imageIndex, imageArr })
  }

  handleChange (field, e) {
    this.setState({ [field]: e && e.target ? e.target.value : e })
  }

  handleSearch (value) {
    this.setState({ name: value })
    const { activeTabKey, selectType } = this.state
    let condition = {
      status: +activeTabKey - 1,
      isPotential: selectType === 'all' ? null : +selectType,
      name: value
    }
    this.search(condition)
  }

  search (condition) {
    const { querySdList } = this.props
    querySdList(condition)
  }

  operations () {
    const { selectType } = this.state
    return (
      <Row style={{ width: '400px' }}>
        <Col span="8">
        {
          <Select value={selectType} onChange={this.handleChange.bind(this, 'selectType')} style={{ width: '100%' }} >
            <Option value="all">全部</Option>
            <Option value="0">当下单身狗</Option>
            <Option value="1">潜在单身狗</Option>
          </Select>
        }
        </Col>
        <Col span="16">
          <Search placeholder="请输入单身狗名称" onSearch={this.handleSearch} style={{ width: '100%' }} />
        </Col>
      </Row>
    )
  }

  createSDButton () {
    const { loginInfo } = this.props
    const type = loginInfo.get('type')
    if (type === 'admin') {
      const option = {
        pathname: `${__STATIC_BASE__}/sdManage/detail`,
        query: {
          handleType: 'create'
        }
      }
      return <Link to={option}><Button type="primary">创建单身狗</Button></Link>
    }
    return null
  }

  render() {
    const { activeTabKey, isImgModalShow, previewUrl, imageArr, imageIndex } = this.state
    const { list } = this.props
    return (
      <div className="sd-list">
        <Tabs
          defaultActiveKey={ activeTabKey }
          onChange={this.tabChange}
          tabBarExtraContent={activeTabKey !== '1' && this.operations() || this.createSDButton()}>
          <TabPane tab="待审核" key="1">
            <div className="tabel-box">
              <Table
                columns={this.getKey1Columns()}
                loading={list.get('doing')}
                dataSource={this.parseKey1Data(list.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
          <TabPane tab="审核通过" key="2">
            <div className="tabel-box">
              <Table
                columns={this.getKey2Columns()}
                loading={list.get('doing')}
                dataSource={this.parseKey2Data(list.get('dataList').toJS() || [])}
                pagination={false} />
            </div>
          </TabPane>
        </Tabs>

        <PreviewImage
          isShow={isImgModalShow}
          onCancel={() => { this.setState({ isImgModalShow: false }) } }
          imageUrl={previewUrl}
          imageArr={imageArr}
          imageIndex={imageIndex} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.sd.sdList,
  loginInfo: state.login.loginInfo
})
const mapDispatchToProps = (dispatch) => ({
  querySdList: (condition) => dispatch(sdAction.querySdList(condition)),
  verifySingleDog: (id) => dispatch(sdAction.verifySingleDog(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SdList)
