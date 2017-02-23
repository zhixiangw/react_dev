import 'isomorphic-fetch'

function packFetch(url, condition) {
  // Fetch 请求默认是不带 cookie 的,如果你想在fetch请求里附带cookies之类的凭证信息,需要设置 fetch(url, {credentials: 'include'})
  let option = {
    // credentials: 'include',
  }
  if (condition) {
    if (condition.formData) { // 文件上传必须字段
      option = {
        method: 'post',
        // credentials: 'include',
        headers: {
          Accept: 'application/json'
        },
        body: condition.formData.data
      }
    } else {
      option = {
        method: 'post',
        // credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(condition)
      }
    }
  }

  return fetch(url, option).then(response => response.json())
}

export const FETCH_API = Symbol('Fetch_API')
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_FAILURE = 'API_FAILURE'

export default () => next => action => {
  const fethAPI = action[FETCH_API]
  if (typeof fethAPI === 'undefined') {
    return next(action)
  }

  let { url, request, msg, constname } = fethAPI

  function actionWith (result) {
    const finalAction = Object.assign({}, action, result)
    delete finalAction[FETCH_API]
    return finalAction
  }

  next(actionWith({
    type: API_REQUEST,
    constname,
    request
  }))

  return packFetch(url, request).then(
    response => {
      next(actionWith({
        type: API_SUCCESS,
        constname,
        request,
        response,
        msg
      }))
      if (response.status === 0) {
        return Promise.reject(response)
      }
      return Promise.resolve(response)
    },
    result => {
      next(actionWith({
        type: API_FAILURE,
        constname,
        msg: result.json && result.json.msg ? result.json.msg : '网络不佳,请稍后再试',
        status: result.response ? result.response.status : undefined
      }))
      return Promise.reject(result)
    }
  )
}
