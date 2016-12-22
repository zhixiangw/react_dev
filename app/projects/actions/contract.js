import { FETCH_API } from '../middlewares/fetch'

export const QUERY_CONTRACT_LIST_4_KEY_1 = 'QUERY_CONTRACT_LIST_4_KEY_1'
export function queryContractList4key1 (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_LIST_4_KEY_1,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition
      }
    })
  }
}

export const QUERY_CONTRACT_LIST_4_KEY_2 = 'QUERY_CONTRACT_LIST_4_KEY_2'
export function queryContractList4key2 (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_LIST_4_KEY_2,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition
      }
    })
  }
}

export const QUERY_CONTRACT_LIST_4_KEY_3 = 'QUERY_CONTRACT_LIST_4_KEY_3'
export function queryContractList4key3 (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_LIST_4_KEY_3,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition
      }
    })
  }
}

export const SEND_NOTIFICATION = 'QUERY_CONTRACT_LIST_4_KEY_3'
export function sendNotification (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_LIST_4_KEY_3,
        url: '//jsonplaceholder.typicode.com/posts/',
        request: condition,
        msg: '操作成功'
      }
    })
  }
}

export const DELETE_CONTRACT = 'DELETE_CONTRACT'
export function deleteContract () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: DELETE_CONTRACT,
        url: 'https://cnodejs.org/api/v1/user/alsotang',
        msg: '操作成功'
      }
    })
  }
}
