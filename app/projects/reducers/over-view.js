import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { overView as overViewAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const overViewList = (state = Map({
  doing: false,
  resultData: List(),
  totalNum: 0
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
          resultData: response.resultData && response.resultData.users,
          totalNum: response.resultData && response.resultData.totalNum,
        })
      }
      return state

    default:
      return state
  }
}

const withdrawsList = (state = Map({
  doing: false,
  resultData: List(),
  totalNum: 0
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === overViewAction.QUERY_WITH_DRAWS_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === overViewAction.QUERY_WITH_DRAWS_LIST) {
        return state.merge({}, {
          doing: false,
          resultData: response.resultData && response.resultData.withdraws,
          totalNum: response.resultData && response.resultData.totalNum,
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  overViewList,
  withdrawsList
})

export default rootReducer
