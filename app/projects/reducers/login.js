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
  memberId: ls && ls.getItem('memberId'),
  account: ls && ls.getItem('account'),
  password: ls && ls.getItem('password'),
  type: ls && ls.getItem('type'),
  hasLogin: ls && ls.getItem('hasLogin')
}), { type, constname, request, response }) => {
  const loginType = 'admin' // 此处自定义登录角色 admin = 管理员， salesman = 业务员， verify = 审核员
  switch (type) {
    case API_SUCCESS:
      if (constname === loginAction.LOGIN) {
        ls.setItem('memberId', 1)
        ls.setItem('account', request.account)
        ls.setItem('password', request.password)
        ls.setItem('type', loginType)
        ls.setItem('hasLogin', true)
        return response && Immutable.fromJS({
          memberId: 1,
          account: request.account,
          password: request.password,
          type: loginType,
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
