import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { verify as verifyAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const verifyList = (state = Map({
  doing: false,
  resultData: List(),
  totalNum: 0
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === verifyAction.QUERY_VERIFY_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === verifyAction.QUERY_VERIFY_LIST) {
        return state.merge({}, {
          doing: false,
          resultData: response.resultData && response.resultData.wechats,
          totalNum: response.resultData && response.resultData.totalNum,
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  verifyList
})

export default rootReducer
