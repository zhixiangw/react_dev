import 'isomorphic-fetch'
// 将json对象转换为表单提交的请求字符串提交
function parseToQueryStr(queryObj) {
  let queryString = ''
  Object.getOwnPropertyNames(queryObj).forEach(key => {
    if (queryObj[key] || +queryObj[key] === 0) {
      queryString = `${queryString}${key}=${queryObj[key]}&`
    }
  })
  return queryString.substr(0, queryString.length - 1)
}

function packFetch(url, condition) {
  // Fetch 请求默认是不带 cookie 的,如果你想在fetch请求里附带cookies之类的凭证信息,需要设置 fetch(url, {credentials: 'include'})
  // 此处需要注意，携带cookie的话，是不允许跨域请求的，所以本地调试的跨域接口的时候，需要注释掉
  let option = {
    // credentials: 'include'
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
      if (window.localStorage.getItem('token')) {
        condition.token = window.localStorage.getItem('token')
      }
      option = {
        method: 'post',
        // credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeURI(parseToQueryStr(condition))
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
      return Promise.resolve(response)
    },
    result => {
      let Msg = ''
      if (result.json && (typeof result.json.obj) === 'string' && result.json.msg === '执行失败') {
        Msg = '登录失效，请重新登录'
      } else {
        Msg = result.json.msg || '网络不佳,请稍后再试'
      }
      next(actionWith({
        type: API_FAILURE,
        constname,
        msg: Msg,
        status: result.response ? result.response.status : undefined
      }))
      return Promise.reject(result)
    }
  )
}
