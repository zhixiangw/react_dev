import { FETCH_API } from '../middlewares/fetch'

export const SHOW_ERROR = 'SHOW_ERROR'
export function error (msg) {
  return {
    type: SHOW_ERROR,
    msg
  }
}

export const SHOW_WARNING = 'SHOW_WARNING'
export function warning (msg) {
  return {
    type: SHOW_WARNING,
    msg
  }
}

export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export function success (msg) {
  return {
    type: SHOW_SUCCESS,
    msg
  }
}

export const MSG_CLEAN = 'MSG_CLEAN'
export function clean () {
  return {
    type: 'MSG_CLEAN'
  }
}

export const QUERY_SYSTEM_SETTING = 'QUERY_SYSTEM_SETTING'
export function querySystemSetting () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_SYSTEM_SETTING,
        url: 'https://cnodejs.org/api/v1/user/alsotang'
      }
    })
  }
}

export const SUBMIT_SYSTEM_SETTING = 'SUBMIT_SYSTEM_SETTING'
export function submitSystemSetting (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SUBMIT_SYSTEM_SETTING,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition,
        msg: '操作成功'
      }
    })
  }
}
