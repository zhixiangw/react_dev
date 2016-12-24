import { FETCH_API } from '../middlewares/fetch'

export const QUERY_USER_LIST_4_KEY_1 = 'QUERY_USER_LIST_4_KEY_1'
export function queryUserList4key1 (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_USER_LIST_4_KEY_1,
        url: `https://cnodejs.org/api/v1/user/alsotang?${id}`,
      }
    })
  }
}

export const QUERY_USER_LIST_4_KEY_2 = 'QUERY_USER_LIST_4_KEY_2'
export function queryUserList4key2 (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_USER_LIST_4_KEY_2,
        url: `https://cnodejs.org/api/v1/user/alsotang?${id}`,
      }
    })
  }
}

export const CREATE_USER = 'CREATE_USER'
export function createUser (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: CREATE_USER,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition,
        msg: '操作成功'
      }
    })
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: RESET_PASSWORD,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition,
        msg: '操作成功'
      }
    })
  }
}
