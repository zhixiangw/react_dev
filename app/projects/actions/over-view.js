import { FETCH_API } from '../middlewares/fetch'

export const QUERY_OVER_VIEW = 'QUERY_OVER_VIEW'
export function queryOverView () {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW,
        url: `${__API_BASE__}home/statistics?JSESSIONID=${window.localStorage.getItem('jsessionid')}`
      }
    })
  }
}

export const QUERY_OVER_VIEW_LIST = 'QUERY_OVER_VIEW_LIST'
export function queryOverViewList (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_OVER_VIEW_LIST,
        url: `${__API_BASE__}home/homeDetail`,
        request: condition
      }
    })
  }
}
