import { combineReducers } from 'redux'
import Immutable, { Map, List } from 'immutable'
import { user as userAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const userList = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === userAction.QUERY_USER_LIST) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === userAction.QUERY_USER_LIST) {
        return state.merge({}, {
          doing: false,
          dataList: response && Immutable.fromJS(response) || List()
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userList
})

export default rootReducer
