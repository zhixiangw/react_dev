import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import system from './system'

export default combineReducers({
  routing,
  system
})
