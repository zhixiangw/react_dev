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

const contractDetail = (state = Map({
  basicInfo: Map(),
  carsInfo: Map(),
  executiveInfo: Map()
}), { type, constname, response }) => {
  const dataObj = {
    basicInfo: {
      contractCode: '20161223',
      contractAttachment: [{
        url: 'http://10.0.60.44:4100/api/file/Dv9FqRllP76E47t9uhA2vPQCmjvw87Pv6uz+GatTT1lvSmuKIol0+QuGco/Fzo4p3zWCInFOckDyHJUWzYtUGQ==.pdf',
        name: 'xxx.pdf',
        uid: -1,
      }],
      loanDate: '2016-12-23',
      customerName: '客户一',
      customerMobile: '18866668888',
      businessLicense: 'bs2016122365654255xxx',
      businessLicensePic: [{
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: 'xxx.png',
        uid: -1
      }],
      loanAmount: '10000',
      loanTerm: '11',
      eachChargeTime: '2',
      noainClerk: '诺亚信业务员1',
      noainClerkMobile: '18866667777',
      salesClerk: '保险业务员1',
      salesClerkMobile: '18866669999'
    },
    carsInfo: {
      policyNumber: 'av20161223',
      policyAttachment: [{
        url: 'http://10.0.60.44:4100/api/file/Dv9FqRllP76E47t9uhA2vPQCmjvw87Pv6uz+GatTT1lvSmuKIol0+QuGco/Fzo4p3zWCInFOckDyHJUWzYtUGQ==.pdf',
        name: 'xxx.pdf',
        uid: -1,
      }],
      commercialInsurancePremium: '5000',
      otherAttachment: [{
        url: 'http://10.0.60.44:4100/api/file/Dv9FqRllP76E47t9uhA2vPQCmjvw87Pv6uz+GatTT1lvSmuKIol0+QuGco/Fzo4p3zWCInFOckDyHJUWzYtUGQ==.pdf',
        name: 'xxx.pdf',
        uid: -1,
      }],
      carNumber: '沪A·888888',
      carBrand: '法拉利',
      carModel: '银色限量版',
      carIdNumber: 'x11',
      drivingLicense: '513226196901070415',
      drivingLicenseAttachment: [{
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: 'xxx.png',
        uid: -1
      }]
    },
    executiveInfo: {
      feeStatus: '1',
      initialPremium: '1',
      contractStatus: '3',
      contractEndReason: '1',
      repaymentSchedule: '78',
      surplusAmount: '6000',
      repaymentRecord: [{
        title: '第三期还款',
        content: [{
          time: '2016-12-25',
          desc: '警告一次'
        }, {
          time: '2016-12-25',
          desc: '已通知还款'
        }]
      }, {
        title: '第二期还款',
        content: [{
          time: '2016-12-22',
          desc: '已还款1000.00'
        }, {
          time: '2016-12-22',
          desc: '警告一次'
        }, {
          time: '2016-12-21',
          desc: '已通知还款'
        }]
      }, {
        title: '第一期还款',
        content: [{
          time: '2016-12-12',
          desc: '已还款2000.00'
        }, {
          time: '2016-12-11',
          desc: '已通知还款'
        }]
      }, {
        title: '放款',
        content: [{
          time: '2016-12-02',
          desc: '已放款6000.00'
        }, {
          time: '2016-12-01',
          desc: '已通知放款'
        }]
      }]
    }
  }
  switch (type) {
    case API_SUCCESS:
      if (constname === contractAction.QUERY_CONTRACT_DETAIL) {
        return state.merge({}, dataObj)
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  contractList4key1,
  contractList4key2,
  contractList4key3,
  contractDetail
})

export default rootReducer
