import { FETCH_API } from '../middlewares/fetch'

export const QUERY_USER_LIST_4_KEY_1 = 'QUERY_USER_LIST_4_KEY_1'
export function queryUserList4key1 (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_USER_LIST_4_KEY_1,
        url: `${__API_BASE__}/user/list?role=${id}&JSESSIONID=${window.localStorage.getItem('jsessionid')}`,
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
        url: `${__API_BASE__}/user/list?role=${id}&JSESSIONID=${window.localStorage.getItem('jsessionid')}`,
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
        url: `${__API_BASE__}user/save`,
        request: condition,
        msg: '操作成功'
      }
    })
  }
}

export const RESET_PASSWORD = 'RESET_PASSWORD'
export function resetPassword (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: RESET_PASSWORD,
        url: `${__API_BASE__}user/resetPassword?id=${id}&JSESSIONID=${window.localStorage.getItem('jsessionid')}`,
        msg: '操作成功'
      }
    })
  }
}
