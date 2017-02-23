import { FETCH_API } from '../middlewares/fetch'

export const QUERY_USER_LIST = 'QUERY_USER_LIST'
export function queryUserList (key) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_USER_LIST,
        url: `${__API_BASE__}user_manage/list/${key}`,
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
        url: `${__API_BASE__}user_manage/create`,
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
        url: `${__API_BASE__}user_manage/edit_password`,
        request: condition,
        msg: '操作成功'
      }
    })
  }
}
