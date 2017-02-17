import 'isomorphic-fetch'

function packFetch(url, condition, method) {
  // Fetch 请求默认是不带 cookie 的,如果你想在fetch请求里附带cookies之类的凭证信息,需要设置 fetch(url, {credentials: 'include'})
  // 此处需要注意，携带cookie的话，是不允许跨域请求的，所以本地调试的跨域接口的时候，需要注释掉
  let option = {
    // credentials: 'include'
    method: method || 'get'
  }
  if (condition) {
    if (condition.formData) { // 文件上传必须字段
      option = {
        method: method || 'post',
        // credentials: 'include',
        headers: {
          Accept: 'application/json'
        },
        body: condition.formData.data
      }
    } else {
      option = {
        method: method || 'post',
        // credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(condition)
      }
    }
  }

  return fetch(url, option)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!json.pass && json.code === 'FAILED') {
        return Promise.reject({ json, response })
      }
      if (json instanceof Array) {
        return [].concat(json)
      }
      return Object.assign({},
          json
      )
    })
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

  let { url, request, msg, constname, method } = fethAPI

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

  return packFetch(url, request, method).then(
    response => {
      next(actionWith({
        type: API_SUCCESS,
        constname,
        request,
        response,
        msg
      }))
      return Promise.resolve(response)
    },
    result => {
      next(actionWith({
        type: API_FAILURE,
        constname,
        msg: '请求失败',
        status: result.response ? result.response.status : undefined
      }))
      return Promise.reject(result)
    }
  )
}
