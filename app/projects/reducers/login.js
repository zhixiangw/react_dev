import { combineReducers } from 'redux'
import { Map } from 'immutable'
import { login as loginAction } from '../actions'
import { API_SUCCESS } from '../middlewares/fetch'

const loginInfo = (state = Map(), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        window.localStorage.setItem('loginInfo', JSON.stringify(response.resultData.result))
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
