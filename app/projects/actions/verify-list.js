import { FETCH_API } from '../middlewares/fetch'

export const QUERY_VERIFY_LIST = 'QUERY_VERIFY_LIST'
export function queryVerifyList (pageIndex) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_VERIFY_LIST,
        url: `${__API_BASE__}v1/wechat/list?pageNo=${pageIndex}&pageSize=10`
      }
    })
  }
}

export const CHECK_ITEM = 'CHECK_ITEM'
export function checkItem (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: CHECK_ITEM,
        url: `${__API_BASE__}v1/wechat/check`,
        request: condition,
        method: 'put'
      }
    })
  }
}
