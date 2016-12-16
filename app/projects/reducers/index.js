import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import system from './system'
import test from './test'

export default combineReducers({
  routing,
  system,
  test
})
