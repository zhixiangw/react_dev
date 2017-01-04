import { combineReducers } from 'redux'
import Immutable, { Map, List } from 'immutable'
import { overView as overViewAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const overViewData = (state = Map(), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === overViewAction.QUERY_OVER_VIEW) {
        return response && Immutable.fromJS({
          contractNum: response.contractCounts,
          unpaidContractNum: response.notPaidCounts,
          totalLoanAmount: response.loanAmounts,
          endContractNum: response.contractCounts
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
          dataList: response
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
