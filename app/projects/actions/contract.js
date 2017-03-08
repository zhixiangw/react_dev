import { FETCH_API } from '../middlewares/fetch'

export const QUERY_CONTRACT_LIST_4_KEY_1 = 'QUERY_CONTRACT_LIST_4_KEY_1'
export function queryContractList4key1 (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_LIST_4_KEY_1,
        url: `${__API_BASE__}contract/list`,
        request: {
          'contractStatus.contractStatus': condition.type
        }
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
        url: `${__API_BASE__}contract/list`,
        request: {
          'contractStatus.contractStatus': condition.type,
          'contractStatus.repaymentStatus': condition.status,
          key: condition.title
        }
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
        url: `${__API_BASE__}contract/list`,
        request: {
          'contractStatus.contractStatus': condition.type,
          'contractStatus.endReason': condition.status,
          key: condition.title
        }
      }
    })
  }
}

export const SEND_NOTIFICATION = 'SEND_NOTIFICATION'
export function sendNotification (condition) {
  let url
  if (+condition.type === 1) {// 放款
    url = `${__API_BASE__}contract/loan?contractId=${condition.contractId}&token=${window.localStorage.getItem('token')}`
  } else if (+condition.type === 2) {// 还款
    url = `${__API_BASE__}contract/repayment?contractId=${condition.contractId}&token=${window.localStorage.getItem('token')}`
  } else if (+condition.type === 3) {// 扣款
    url = `${__API_BASE__}contract/notify?contractId=${condition.contractId}&token=${window.localStorage.getItem('token')}`
  }
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SEND_NOTIFICATION,
        url,
        msg: '操作成功'
      }
    })
  }
}

export const DELETE_CONTRACT = 'DELETE_CONTRACT'
export function deleteContract (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: DELETE_CONTRACT,
        url: `${__API_BASE__}contract/delete?id=${id}&token=${window.localStorage.getItem('token')}`,
        msg: '操作成功'
      }
    })
  }
}

export const QUERY_CONTRACT_DETAIL = 'QUERY_CONTRACT_DETAIL'
export function queryContractDetail (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_CONTRACT_DETAIL,
        url: `${__API_BASE__}contract/info?id=${id}&token=${window.localStorage.getItem('token')}`,
      }
    })
  }
}

export const SAVE_BASICE_INFO = 'SAVE_BASICE_INFO'
export function saveBasicInfo (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SAVE_BASICE_INFO,
        url: `${__API_BASE__}contract/save`,
        request: condition,
        msg: '操作成功'
      }
    })
  }
}

export const SAVE_CARS_INFO = 'SAVE_CARS_INFO'
export function saveCarsInfo (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SAVE_CARS_INFO,
        url: `${__API_BASE__}car/save?token=${window.localStorage.getItem('token')}`,
        request: condition,
        msg: '操作成功',
        contentType: 'json'
      }
    })
  }
}

export const SAVE_EXECUTIVE_INFO = 'SAVE_EXECUTIVE_INFO'
export function saveExecutiveInfo (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: SAVE_EXECUTIVE_INFO,
        url: `${__API_BASE__}constatus/save`,
        request: condition,
        msg: '操作成功'
      }
    })
  }
}
