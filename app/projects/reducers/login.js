import { combineReducers } from 'redux'
import Immutable, { Map } from 'immutable'
import { login as loginAction } from '../actions'
import { API_SUCCESS } from '../middlewares/fetch'

const loginInfo = (state = Map({ hasLogin: false }), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        return response && Immutable.fromJS({
          memberId: 1,
          type: 'admin',
          hasLogin: true
        })
      }

      if (constname === loginAction.LOGOUT) {
        return response && Immutable.fromJS({
          hasLogin: false
        })
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
