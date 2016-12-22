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
