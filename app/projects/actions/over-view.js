import { FETCH_API } from '../middlewares/fetch'

export const QUERY_OVER_VIEW = 'QUERY_OVER_VIEW'
export function queryOverView () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW,
        url: `${__API_BASE__}home/statistics`
      }
    })
  }
}

export const QUERY_OVER_VIEW_TREND = 'QUERY_OVER_VIEW_TREND'
export function queryOverViewTrend (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW_TREND,
        url: `${__API_BASE__}home/trend`,
        request: condition
      }
    })
  }
}

export const QUERY_OVER_VIEW_LIST = 'QUERY_OVER_VIEW_LIST'
export function queryOverViewList () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW_LIST,
        url: `${__API_BASE__}home/homeDetail`
      }
    })
  }
}
