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
