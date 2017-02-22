import { FETCH_API } from '../middlewares/fetch'

export const QUERY_SD_LIST = 'QUERY_SD_LIST'
export function querySdList (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_SD_LIST,
        url: `${__API_BASE__}sd_manage/list`,
        request: condition
      }
    })
  }
}
