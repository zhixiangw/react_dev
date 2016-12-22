import { combineReducers } from 'redux'
import Immutable, { Map, List } from 'immutable'
import { overView as overViewAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const overViewData = (state = Map(), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === overViewAction.QUERY_OVER_VIEW) {
        return response && Immutable.fromJS({
          contractNum: Math.ceil(Math.random() * 100),
          unpaidContractNum: Math.ceil(Math.random() * 10),
          totalLoanAmount: Math.ceil(Math.random() * 10000),
          endContractNum: Math.ceil(Math.random() * 100)
        })
      }
      return state

    default:
      return state
  }
}

const overViewList = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response }) => {
  const dataList = [{
    date: '2016-12-01',
    newContract: Math.ceil(Math.random() * 100),
    loanContract: Math.ceil(Math.random() * 100),
    loanAmount: Math.ceil(Math.random() * 10000),
    unpaidContract: Math.ceil(Math.random() * 100),
  }, {
    date: '2016-12-02',
    newContract: Math.ceil(Math.random() * 100),
    loanContract: Math.ceil(Math.random() * 100),
    loanAmount: Math.ceil(Math.random() * 10000),
    unpaidContract: Math.ceil(Math.random() * 100),
  }, {
    date: '2016-12-03',
    newContract: Math.ceil(Math.random() * 100),
    loanContract: Math.ceil(Math.random() * 100),
    loanAmount: Math.ceil(Math.random() * 10000),
    unpaidContract: Math.ceil(Math.random() * 100),
  }, {
    date: '2016-12-04',
    newContract: Math.ceil(Math.random() * 100),
    loanContract: Math.ceil(Math.random() * 100),
    loanAmount: Math.ceil(Math.random() * 10000),
    unpaidContract: Math.ceil(Math.random() * 100),
  }, {
    date: '2016-12-05',
    newContract: Math.ceil(Math.random() * 100),
    loanContract: Math.ceil(Math.random() * 100),
    loanAmount: Math.ceil(Math.random() * 10000),
    unpaidContract: Math.ceil(Math.random() * 100),
  }]
  switch (type) {
    case API_REQUEST:
      if (constname === overViewAction.QUERY_OVER_VIEW_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === overViewAction.QUERY_OVER_VIEW_LIST) {
        return state.merge({}, {
          doing: false,
          dataList
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  overViewData,
  overViewList
})

export default rootReducer
