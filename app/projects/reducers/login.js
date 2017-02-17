import { combineReducers } from 'redux'
import { Map } from 'immutable'
import { login as loginAction } from '../actions'
import { API_SUCCESS } from '../middlewares/fetch'

const loginInfo = (state = Map(), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        return state.merge({}, response.resultData.result)
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  loginInfo
})

export default rootReducer
