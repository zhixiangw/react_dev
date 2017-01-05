import { combineReducers } from 'redux'
import Immutable, { Map, List } from 'immutable'
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

const systemSettingInfo = (state = List(), { type, constname, response }) => {
  switch (type) {
    case API_SUCCESS:
      if (constname === systemAction.QUERY_SYSTEM_SETTING) {
        return Immutable.fromJS(response)
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
