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

const rootReducer = combineReducers({
  systemMsg
})

export default rootReducer
