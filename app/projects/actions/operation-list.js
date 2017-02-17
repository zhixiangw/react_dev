import { FETCH_API } from '../middlewares/fetch'

export const QUERY_USER_LIST = 'QUERY_USER_LIST'
export function queryUserList (pageIndex) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: QUERY_USER_LIST,
        url: `${__API_BASE__}v1/admin/list`,
      }
    })
  }
}

export const CREATE_USER = 'CREATE_USER'
export function createUser (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: CREATE_USER,
        url: `${__API_BASE__}v1/admin/edit`,
        request: condition
      }
    })
  }
}

export const EDIT_USER = 'EDIT_USER'
export function editUser (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: EDIT_USER,
        url: `${__API_BASE__}v1/admin/edit`,
        request: condition
      }
    })
  }
}

export const DELETE_USER = 'DELETE_USER'
export function deleteUser (id) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: DELETE_USER,
        url: `${__API_BASE__}v1/admin/delete?adminId=${id}`,
        method: 'delete'
      }
    })
  }
}
