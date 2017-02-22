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

export const VERIFY_SINGLE_DOG = 'VERIFY_SINGLE_DOG'
export function verifySingleDog (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: VERIFY_SINGLE_DOG,
        url: `${__API_BASE__}sd_manage/verify`,
        request: {
          id
        }
      }
    })
  }
}

export const QUERY_SD_DETAIL = 'QUERY_SD_DETAIL'
export function querySdDetail (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_SD_DETAIL,
        url: `${__API_BASE__}sd_manage/detail/${id}`
      }
    })
  }
}

export const SAVE_SD_INFO = 'SAVE_SD_INFO'
export function saveSdInfo (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SAVE_SD_INFO,
        url: `${__API_BASE__}sd_manage/detail/save`,
        request: condition,
        msg: '操作成功'
      }
    })
  }
}
