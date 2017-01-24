import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import system from './system'
import overView from './over-view'

export default combineReducers({
  routing,
  system,
  overView
})
