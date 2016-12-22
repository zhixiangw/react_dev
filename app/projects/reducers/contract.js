import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { contract as contractAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const contractList4key1 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response, request }) => {
  const dataList = [{
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    poundageStatus: '已缴费',
    initialPremium: '已缴费',
    isNeedConfirm: true
  }, {
    id: '1003570',
    contractCode: '20161202',
    customerName: '客户二',
    poundageStatus: '未缴费',
    initialPremium: '未缴费',
    isNeedConfirm: false
  }, {
    id: '1003571',
    contractCode: '20161203',
    customerName: '客户三',
    poundageStatus: '未缴费',
    initialPremium: '已缴费',
    isNeedConfirm: true
  }, {
    id: '1003572',
    contractCode: '20161204',
    customerName: '客户四',
    poundageStatus: '未缴费',
    initialPremium: '已缴费',
    isNeedConfirm: true
  }, {
    id: '1003573',
    contractCode: '20161205',
    customerName: '客户五',
    poundageStatus: '已缴费',
    initialPremium: '未缴费',
    isNeedConfirm: false
  }]
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_1) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_1) {
        return state.merge({}, {
          doing: false,
          totalCount: dataList.length,
          totalPageCount: Math.ceil(dataList.length / (request.pageSize || 10)),
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const contractList4key2 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response, request }) => {
  const dataList = [{
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    status: '正常',
    surplusLoanAmount: '5000',
    totalLoanAmount: '15000',
    eachChargeTime: '15',
    currentRepaymentStatus: '当期已还',
    isNeedConfirm: false
  }, {
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    status: '正常',
    surplusLoanAmount: '5000',
    totalLoanAmount: '15000',
    eachChargeTime: '15',
    currentRepaymentStatus: '当期已还',
    isNeedConfirm: true
  }, {
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    status: '正常',
    surplusLoanAmount: '5000',
    totalLoanAmount: '15000',
    eachChargeTime: '15',
    currentRepaymentStatus: '当期已还',
    isNeedConfirm: false
  }, {
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    status: '正常',
    surplusLoanAmount: '5000',
    totalLoanAmount: '15000',
    eachChargeTime: '15',
    currentRepaymentStatus: '当期已还',
    isNeedConfirm: true
  }, {
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    status: '正常',
    surplusLoanAmount: '5000',
    totalLoanAmount: '15000',
    eachChargeTime: '15',
    currentRepaymentStatus: '当期已还',
    isNeedConfirm: true
  }]
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_2) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_2) {
        return state.merge({}, {
          doing: false,
          totalCount: dataList.length,
          totalPageCount: Math.ceil(dataList.length / (request.pageSize || 10)),
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const contractList4key3 = (state = Map({
  doing: false,
  totalCount: 0,
  totalPageCount: 0,
  dataList: List()
}), { type, constname, response, request }) => {
  const dataList = [{
    id: '1003569',
    contractCode: '20161201',
    customerName: '客户一',
    endReason: '正常',
    isNeedConfirm: true
  }, {
    id: '1003570',
    contractCode: '20161202',
    customerName: '客户二',
    endReason: '正常',
    isNeedConfirm: false
  }, {
    id: '1003571',
    contractCode: '20161203',
    customerName: '客户三',
    endReason: '正常',
    isNeedConfirm: true
  }, {
    id: '1003572',
    contractCode: '20161204',
    customerName: '客户四',
    endReason: '正常',
    isNeedConfirm: true
  }, {
    id: '1003573',
    contractCode: '20161205',
    customerName: '客户五',
    endReason: '正常',
    isNeedConfirm: false
  }]
  switch (type) {
    case API_REQUEST:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_3) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_LIST_4_KEY_3) {
        return state.merge({}, {
          doing: false,
          totalCount: dataList.length,
          totalPageCount: Math.ceil(dataList.length / (request.pageSize || 10)),
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  contractList4key1,
  contractList4key2,
  contractList4key3
})

export default rootReducer
