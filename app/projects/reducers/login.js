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
  id: ls && ls.getItem('id'),
  account: ls && ls.getItem('account'),
  type: ls && ls.getItem('type'),
  name: ls && ls.getItem('name'),
  password: ls && ls.getItem('password'),
  hasLogin: ls && ls.getItem('hasLogin')
}), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        ls.setItem('id', response.id)
        ls.setItem('account', response.account)
        ls.setItem('type', response.type)
        ls.setItem('name', response.name)
        ls.setItem('password', response.password)
        ls.setItem('hasLogin', true)
        return response && Immutable.fromJS({
          id: response.id,
          account: response.account,
          type: response.type,
          name: response.name,
          password: response.password,
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
