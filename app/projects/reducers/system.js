import { combineReducers } from 'redux'
import { Map } from 'immutable'
import { system as systemAction } from '../actions'
import { API_SUCCESS, API_FAILURE } from '../middlewares/fetch'

const systemMsg = (state = Map(), { type, msg }) => {
  switch (type) {
    case systemAction.SHOW_ERROR:
      return state.merge({
        msg,
        type: systemAction.SHOW_ERROR
      })

    case systemAction.SHOW_WARNING:
      return state.merge({
        msg,
        type: systemAction.SHOW_WARNING
      })

    case systemAction.SHOW_SUCCESS:
      return state.merge({
        msg,
        type: systemAction.SHOW_SUCCESS
      })

    case API_FAILURE:
      return state.merge({
        msg,
        type: systemAction.SHOW_ERROR
      })

    case API_SUCCESS:
      return state.merge({
        msg,
        type: systemAction.SHOW_SUCCESS
      })

    case systemAction.MSG_CLEAN:
      return state.merge({
        msg: '',
        type: ''
      })
    default:
      return state
  }
}

const systemSettingInfo = (state = Map(), { type, constname, response }) => {
  const dataObj = {
    eachChargeTime: '2',
    expWarning: '2',
    contractTemplate: [{
      url: 'http://10.0.60.44:4100/api/file/Dv9FqRllP76E47t9uhA2vPQCmjvw87Pv6uz+GatTT1lvSmuKIol0+QuGco/Fzo4p3zWCInFOckDyHJUWzYtUGQ==.pdf',
      name: 'xxx.doc',
      uid: -1,
    }]
  }
  switch (type) {
    case API_SUCCESS:
      if (constname === systemAction.QUERY_SYSTEM_SETTING) {
        return state.merge({}, dataObj)
      }
      return state

    default:
      return state
  }
}

const rootReducer = combineReducers({
  systemMsg,
  systemSettingInfo
})

export default rootReducer
