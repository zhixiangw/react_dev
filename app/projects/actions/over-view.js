import { FETCH_API } from '../middlewares/fetch'

export const QUERY_OVER_VIEW_LIST = 'QUERY_OVER_VIEW_LIST'
export function queryOverViewList (pageIndex) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW_LIST,
        url: `${__API_BASE__}v1/user/list?pageNo=${pageIndex}&pageSize=10`
      }
    })
  }
}

export const QUERY_WITH_DRAWS_LIST = 'QUERY_WITH_DRAWS_LIST'
export function queryWithdrawsList (pageIndex) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_WITH_DRAWS_LIST,
        url: `${__API_BASE__}v1/withdraw/list?pageNo=${pageIndex}&pageSize=10`
      }
    })
  }
}

export const FINISH_WITH_DRAW = 'FINISH_WITH_DRAW'
export function finishWithdraw (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: FINISH_WITH_DRAW,
        url: `${__API_BASE__}v1/withdraw/finished`,
        request: condition,
        method: 'put'
      }
    })
  }
}
