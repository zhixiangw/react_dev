import { combineReducers } from 'redux'
import Immutable, { Map } from 'immutable'
import { login as loginAction } from '../actions'
import { API_SUCCESS } from '../middlewares/fetch'

const ls = (typeof window.localStorage !== 'undefined' && window.localStorage) ||
  {
    _data: {},
    setItem (id, val) {
      return this._data[id] = String(val)
    },
    getItem (id) {
      return this._data.hasOwnProperty(id) ? this._data[id] : undefined
    },
    removeItem (id) {
      return delete this._data[id]
    },
    clear () {
      return this._data = {}
    }
  }

const loginInfo = (state = Map({
  account: ls && ls.getItem('account'),
  type: ls && ls.getItem('type'),
  hasLogin: ls && ls.getItem('hasLogin')
}), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        ls.setItem('account', response.account)
        ls.setItem('type', response.type)
        ls.setItem('hasLogin', true)
        return response && Immutable.fromJS({
          account: response.account,
          type: response.type,
          hasLogin: true
        })
      }

      if (constname === loginAction.LOGOUT) {
        ls.removeItem('hasLogin')
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
