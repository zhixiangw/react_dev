import { FETCH_API } from '../middlewares/fetch'

export const LOGIN = 'LOGIN'
export function login (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGIN,
        url: '//jsonplaceholder.typicode.com/posts/',
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
