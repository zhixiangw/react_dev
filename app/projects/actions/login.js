import { FETCH_API } from '../middlewares/fetch'

export const LOGIN = 'LOGIN'
export function login (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGIN,
        url: `${__API_BASE__}login.json`,
        request: condition,
        msg: '登录成功'
      }
    })
  }
}

export const LOGOUT = 'LOGOUT'
export function logout () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGOUT,
        url: `${__API_BASE__}logout.json?JSESSIONID=${window.localStorage.getItem('jsessionid')}`
      }
    })
  }
}

export const MODIFY_PASSWORD = 'MODIFY_PASSWORD'
export function modifyPassword (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: MODIFY_PASSWORD,
        url: `${__API_BASE__}modifyPassword`,
        request: condition,
        msg: '修改成功'
      }
    })
  }
}
