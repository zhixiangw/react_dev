import { FETCH_API } from '../middlewares/fetch'

export const LOGIN = 'LOGIN'
export function login (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGIN,
        url: 'http://120.25.68.86:8080/car-loan/login.json',
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
        url: 'https://cnodejs.org/api/v1/user/alsotang'
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
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition,
        msg: '修改成功'
      }
    })
  }
}
