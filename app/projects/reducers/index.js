import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import system from './system'
import login from './login'
import overView from './over-view'
import contract from './contract'
import user from './user'

export default combineReducers({
  routing,
  system,
  login,
  overView,
  contract,
  user
})
