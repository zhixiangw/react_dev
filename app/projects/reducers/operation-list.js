import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { operation as operationAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const operationList = (state = Map({
  doing: false,
  resultData: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === operationAction.QUERY_USER_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === operationAction.QUERY_USER_LIST) {
        return state.merge({}, {
          doing: false,
          resultData: response.resultData
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  operationList
})

export default rootReducer
