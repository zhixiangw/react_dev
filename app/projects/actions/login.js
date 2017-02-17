import { FETCH_API } from '../middlewares/fetch'

export const LOGIN = 'LOGIN'
export function login (condition) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: LOGIN,
        url: `${__API_BASE__}v1/admin/login`,
        request: condition
      }
    })
  }
}
