import { combineReducers } from 'redux'
import { Map } from 'immutable'

const systemMsg = (state = Map(), { type, msg }) => {
  switch (type) {
    case 'show_error':
      return state.merge({
        msg
      })
    case 'msg_clean':
      return state.merge({
        msg: ''
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  systemMsg
})

export default rootReducer
