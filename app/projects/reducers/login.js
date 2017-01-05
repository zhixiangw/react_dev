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
  username: ls && ls.getItem('username'),
  password: ls && ls.getItem('password'),
  type: ls && ls.getItem('type'),
  hasLogin: ls && ls.getItem('hasLogin'),
  name: ls && ls.getItem('name'),
  contact: ls && ls.getItem('contact'),
  token: ls && ls.getItem('token')
}), { type, constname, request, response }) => {
  let loginType = '' // 此处自定义登录角色 admin = 管理员， salesman = 业务员， verify = 审核员
  switch (response && +response.role) {
    case 1:
      loginType = 'salesman'
      break;
    case 2:
      loginType = 'verify'
      break;
    case 9:
      loginType = 'admin'
      break;
    default:
      loginType = 'admin'
      break;
  }
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        ls.setItem('id', response.id)
        ls.setItem('username', request.username)
        ls.setItem('password', request.password)
        ls.setItem('type', loginType)
        ls.setItem('hasLogin', true)
        ls.setItem('name', response.name)
        ls.setItem('contact', response.contact)
        ls.setItem('token', response.token)
        return response && Immutable.fromJS({
          id: response.id,
          username: request.username,
          password: request.password,
          type: loginType,
          name: response.name,
          contact: response.contact,
          hasLogin: true,
          token: response.token
        })
      }

      if (constname === loginAction.LOGOUT) {
        ls.removeItem('hasLogin')
        ls.removeItem('id')
        ls.removeItem('username')
        ls.removeItem('password')
        ls.removeItem('type')
        ls.removeItem('contact')
        ls.removeItem('token')
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
