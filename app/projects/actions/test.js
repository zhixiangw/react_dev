import { FETCH_API } from '../middlewares/fetch'

export const TEST_FETCH = 'TEST_FETCH'
export function testFetch ({ username }) {
  return (dispatch) => {
    return dispatch({
      [FETCH_API]: {
        constname: TEST_FETCH,
        url: `https://cnodejs.org/api/v1/user/${username}`,
        waiting: true,
        msg: '测试请求成功'
      }
    })
  }
}
