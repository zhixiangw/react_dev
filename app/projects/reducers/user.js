import { combineReducers } from 'redux'
import { Map, List } from 'immutable'
import { user as userAction } from '../actions'
import { API_REQUEST, API_SUCCESS } from '../middlewares/fetch'

const userList4key1 = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response, request }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_1) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_1) {
        return state.merge({}, {
          doing: false,
          dataList: response.content
        })
      }
      return state

    default:
      return state
  }
}

const userList4key2 = (state = Map({
  doing: false,
  dataList: List()
}), { type, constname, response, request }) => {
  switch (type) {
    case API_REQUEST:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_2) {
        return state.merge({
          doing: true
        })
      }
      return state

    case API_SUCCESS:
      if (constname === userAction.QUERY_USER_LIST_4_KEY_2) {
        return state.merge({}, {
          doing: false,
          dataList: response.content
        })
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userList4key1,
  userList4key2
})

export default rootReducer
