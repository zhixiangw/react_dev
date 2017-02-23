import { FETCH_API } from '../middlewares/fetch'

export const LOGIN = 'LOGIN'
export function login (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGIN,
        url: `${__API_BASE__}login`,
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
        url: `${__API_BASE__}logout`
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
        url: `${__API_BASE__}user_manage/edit_password`,
        request: condition,
        msg: '修改成功'
      }
    })
  }
}
